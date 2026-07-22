"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Group, Material, Mesh, MeshPhysicalMaterial, WebGLRenderer } from "three";

type Piece = {
  group: Group;
  materials: MeshPhysicalMaterial[];
  rest: readonly [number, number, number];
  entrance: readonly [number, number, number];
  separation: readonly [number, number, number];
  delay: number;
};

const PIECE_MOTION: Record<string, Omit<Piece, "group" | "materials">> = {
  "i-dot": { rest: [0, 0, 0], entrance: [-16, 12, -86], separation: [-4, 3, 7], delay: 0.03 },
  "i-stem": { rest: [0, 0, 0], entrance: [-10, -8, 52], separation: [-2.5, -1.5, 2], delay: 0.12 },
  arrow: { rest: [0, 0, 0], entrance: [12, -4, 96], separation: [2.5, -1, 9], delay: 0.18 },
  d: { rest: [0, 0, 0], entrance: [18, 5, -58], separation: [4, 1, -2], delay: 0.08 },
};

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

export function HeroLogo3D() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (typeof IntersectionObserver === "undefined") {
      const timeout = globalThis.setTimeout(() => setShouldLoad(true), 0);
      return () => globalThis.clearTimeout(timeout);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px" },
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const probe = document.createElement("canvas");
    if (!probe.getContext("webgl2") && !probe.getContext("webgl")) return;

    let disposed = false;
    let cleanup = () => {};

    void (async () => {
      try {
        const [THREE, { SVGLoader }] = await Promise.all([
          import("three"),
          import("three/examples/jsm/loaders/SVGLoader.js"),
        ]);
        if (disposed) return;

        const mobile = window.matchMedia("(max-width: 820px), (pointer: coarse)").matches;
        const renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: !mobile,
          powerPreference: "high-performance",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.25 : 1.75));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.02;
        renderer.shadowMap.enabled = !mobile;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 2400);
        const assembly = new THREE.Group();
        assembly.scale.y = -1;
        scene.add(assembly);

        const texture = await new THREE.TextureLoader().loadAsync("/brand/indevor-symbol.png");
        if (disposed) {
          texture.dispose();
          renderer.dispose();
          return;
        }
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());

        const svgText = await fetch("/brand/indevor-symbol.svg").then((response) => {
          if (!response.ok) throw new Error(`No se pudo cargar el símbolo (${response.status})`);
          return response.text();
        });
        if (disposed) return;

        const svg = new SVGLoader().parse(svgText);
        const pieces: Piece[] = [];
        const width = 496;
        const height = 348;
        const depth = mobile ? 15 : 20;

        for (const path of svg.paths) {
          const node = path.userData?.node as Element | undefined;
          const id = node?.getAttribute("id") ?? "d";
          const motion = PIECE_MOTION[id] ?? PIECE_MOTION.d;
          const colored = node?.getAttribute("data-material") === "color";
          const pieceGroup = new THREE.Group();
          const materials: MeshPhysicalMaterial[] = [];

          for (const shape of SVGLoader.createShapes(path)) {
            const geometry = new THREE.ExtrudeGeometry(shape, {
              depth,
              curveSegments: mobile ? 12 : 20,
              steps: 1,
              bevelEnabled: true,
              bevelSegments: mobile ? 1 : 3,
              bevelSize: mobile ? 0.65 : 1.05,
              bevelThickness: mobile ? 0.8 : 1.25,
            });
            geometry.translate(-width / 2, -height / 2, -depth / 2);

            const positions = geometry.getAttribute("position");
            const uvs = geometry.getAttribute("uv");
            for (let index = 0; index < positions.count; index += 1) {
              const x = positions.getX(index) + width / 2;
              const y = positions.getY(index) + height / 2;
              uvs.setXY(index, x / width, 1 - y / height);
            }
            uvs.needsUpdate = true;
            geometry.computeVertexNormals();

            const faceMaterial = new THREE.MeshPhysicalMaterial({
              map: texture,
              color: 0xffffff,
              metalness: colored ? 0.16 : 0.24,
              roughness: colored ? 0.38 : 0.34,
              clearcoat: colored ? 0.18 : 0.12,
              clearcoatRoughness: 0.28,
              emissive: colored ? new THREE.Color(0x251c3c) : new THREE.Color(0x000000),
              emissiveIntensity: colored ? 0.08 : 0,
              transparent: true,
              opacity: 0,
            });
            const sideMaterial = new THREE.MeshPhysicalMaterial({
              color: colored ? 0x18246f : 0x777987,
              metalness: colored ? 0.42 : 0.56,
              roughness: 0.34,
              clearcoat: 0.12,
              transparent: true,
              opacity: 0,
            });
            materials.push(faceMaterial, sideMaterial);

            const mesh = new THREE.Mesh(geometry, [faceMaterial, sideMaterial]);
            mesh.castShadow = !mobile;
            mesh.receiveShadow = !mobile;
            pieceGroup.add(mesh);
          }

          pieceGroup.position.set(...motion.entrance);
          assembly.add(pieceGroup);
          pieces.push({ group: pieceGroup, materials, ...motion });
        }

        scene.add(new THREE.HemisphereLight(0xdfe5ff, 0x080711, mobile ? 0.82 : 0.62));
        const key = new THREE.DirectionalLight(0xffffff, mobile ? 2.25 : 2.8);
        key.position.set(180, -210, 420);
        key.castShadow = !mobile;
        key.shadow.mapSize.set(1024, 1024);
        key.shadow.radius = 5;
        scene.add(key);

        const blue = new THREE.PointLight(0x625182, mobile ? 10 : 13, 900, 2);
        blue.position.set(-310, 35, 240);
        scene.add(blue);
        if (!mobile) {
          const violet = new THREE.PointLight(0x8066a8, 11, 900, 2);
          violet.position.set(310, 125, 210);
          scene.add(violet);
          const rim = new THREE.DirectionalLight(0xb9c6ff, 1.4);
          rim.position.set(-120, 230, -260);
          scene.add(rim);
        }

        const shadowPlane = new THREE.Mesh(
          new THREE.PlaneGeometry(590, 420),
          new THREE.ShadowMaterial({ color: 0x05050a, opacity: mobile ? 0 : 0.28 }),
        );
        shadowPlane.position.z = -36;
        shadowPlane.receiveShadow = !mobile;
        scene.add(shadowPlane);

        const hero = stage.closest<HTMLElement>(".hero") ?? stage;
        const pointerTarget = new THREE.Vector2();
        const pointerCurrent = new THREE.Vector2();
        let pointerPresent = false;
        let frame = 0;
        let visible = true;
        let pageVisible = !document.hidden;
        let firstFrame = true;
        const startedAt = performance.now();

        const resize = () => {
          const rect = stage.getBoundingClientRect();
          const renderWidth = Math.max(1, Math.round(rect.width));
          const renderHeight = Math.max(1, Math.round(rect.height));
          renderer.setSize(renderWidth, renderHeight, false);
          camera.aspect = renderWidth / renderHeight;
          const halfFov = THREE.MathUtils.degToRad(camera.fov / 2);
          const verticalDistance = height / (2 * Math.tan(halfFov));
          const horizontalDistance = width / (2 * Math.tan(halfFov) * camera.aspect);
          camera.position.set(0, 0, Math.max(verticalDistance, horizontalDistance) * (mobile ? 1.18 : 1.14));
          camera.updateProjectionMatrix();
        };

        const onPointerMove = (event: PointerEvent) => {
          if (mobile || event.pointerType === "touch") return;
          const rect = hero.getBoundingClientRect();
          pointerTarget.set(
            THREE.MathUtils.clamp(((event.clientX - rect.left) / rect.width - 0.5) * 2, -1, 1),
            THREE.MathUtils.clamp(((event.clientY - rect.top) / rect.height - 0.5) * 2, -1, 1),
          );
          pointerPresent = true;
        };
        const onPointerLeave = () => {
          pointerTarget.set(0, 0);
          pointerPresent = false;
        };
        const onVisibilityChange = () => {
          pageVisible = !document.hidden;
          if (pageVisible && visible && !frame) frame = requestAnimationFrame(renderFrame);
        };

        const renderFrame = (now: number) => {
          frame = 0;
          if (disposed || !visible || !pageVisible) return;
          const elapsed = (now - startedAt) / 1000;
          const entrance = easeOutCubic(clamp01(elapsed / 1.65));

          if (mobile) {
            pointerTarget.set(Math.sin(elapsed * 0.32) * 0.16, Math.cos(elapsed * 0.27) * 0.1);
          }
          pointerCurrent.lerp(pointerTarget, mobile ? 0.025 : 0.065);
          const interaction = mobile ? 0.36 : Math.min(1, pointerCurrent.length() * (pointerPresent ? 1.15 : 0.5));

          assembly.rotation.x = -0.045 - pointerCurrent.y * (mobile ? 0.055 : 0.105) + Math.sin(elapsed * 0.42) * 0.008;
          assembly.rotation.y = -0.13 + pointerCurrent.x * (mobile ? 0.065 : 0.145) + Math.sin(elapsed * 0.31) * 0.01;
          assembly.position.y = Math.sin(elapsed * 0.55) * (mobile ? 1.2 : 1.8);

          for (const piece of pieces) {
            const pieceEntrance = easeOutCubic(clamp01((entrance - piece.delay) / (1 - piece.delay)));
            const targetX = piece.rest[0] + piece.entrance[0] * (1 - pieceEntrance) + piece.separation[0] * interaction;
            const targetY = piece.rest[1] + piece.entrance[1] * (1 - pieceEntrance) + piece.separation[1] * interaction;
            const targetZ = piece.rest[2] + piece.entrance[2] * (1 - pieceEntrance) + piece.separation[2] * interaction;
            piece.group.position.x = THREE.MathUtils.lerp(piece.group.position.x, targetX, 0.11);
            piece.group.position.y = THREE.MathUtils.lerp(piece.group.position.y, targetY, 0.11);
            piece.group.position.z = THREE.MathUtils.lerp(piece.group.position.z, targetZ, 0.11);
            const opacity = clamp01((pieceEntrance - 0.02) / 0.42);
            piece.materials.forEach((material) => {
              material.opacity = opacity;
            });
          }

          renderer.render(scene, camera);
          if (firstFrame) {
            firstFrame = false;
            setReady(true);
          }
          frame = requestAnimationFrame(renderFrame);
        };

        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(stage);
        const visibilityObserver = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          if (visible && pageVisible && !frame) frame = requestAnimationFrame(renderFrame);
        });
        visibilityObserver.observe(stage);
        hero.addEventListener("pointermove", onPointerMove, { passive: true });
        hero.addEventListener("pointerleave", onPointerLeave);
        document.addEventListener("visibilitychange", onVisibilityChange);
        resize();
        frame = requestAnimationFrame(renderFrame);

        cleanup = () => {
          cancelAnimationFrame(frame);
          resizeObserver.disconnect();
          visibilityObserver.disconnect();
          hero.removeEventListener("pointermove", onPointerMove);
          hero.removeEventListener("pointerleave", onPointerLeave);
          document.removeEventListener("visibilitychange", onVisibilityChange);
          scene.traverse((object) => {
            const mesh = object as Mesh;
            mesh.geometry?.dispose?.();
            const meshMaterials = Array.isArray(mesh.material) ? mesh.material : mesh.material ? [mesh.material] : [];
            meshMaterials.forEach((material: Material) => material.dispose());
          });
          texture.dispose();
          renderer.dispose();
          (renderer as WebGLRenderer).forceContextLoss();
        };
      } catch (error) {
        console.error("No se pudo iniciar el símbolo 3D de INDEVOR.", error);
      }
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [shouldLoad]);

  return (
    <div ref={stageRef} className="hero-logo" data-ready={ready ? "true" : "false"} aria-hidden="true">
      <div className="hero-logo__halo" />
      <Image
        className="hero-logo__fallback"
        src="/brand/indevor-symbol.png"
        alt=""
        width={496}
        height={348}
        priority
        unoptimized
        draggable={false}
      />
      <canvas ref={canvasRef} className="hero-logo__canvas" />
    </div>
  );
}
