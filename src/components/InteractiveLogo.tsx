"use client";

import Image from "next/image";
import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";

const pieces = [
  { name: "top", src: "/brand/mark-top.png" },
  { name: "left", src: "/brand/mark-left.png" },
  { name: "right", src: "/brand/mark-right.png" },
] as const;

const restValues: Record<string, string> = {
  "--mark-rx": "0deg", "--mark-ry": "0deg",
  "--p1-x": "0px", "--p1-y": "0px", "--p1-z": "0px", "--p1-r": "0deg",
  "--p2-x": "0px", "--p2-y": "0px", "--p2-z": "0px", "--p2-r": "0deg",
  "--p3-x": "0px", "--p3-y": "0px", "--p3-z": "0px", "--p3-r": "0deg",
};

export function InteractiveLogo() {
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);
  const finePointerRef = useRef(false);

  const applyValues = (values: Record<string, string>) => {
    const stage = stageRef.current;
    if (!stage) return;
    Object.entries(values).forEach(([property, value]) => stage.style.setProperty(property, value));
  };

  const resetStage = () => {
    const stage = stageRef.current;
    if (!stage) return;
    stage.dataset.active = "false";
    applyValues(restValues);
  };

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    const update = () => {
      reducedMotionRef.current = reduced.matches;
      finePointerRef.current = finePointer.matches;
      if (reduced.matches) {
        const stage = stageRef.current;
        if (stage) {
          stage.dataset.active = "false";
          Object.entries(restValues).forEach(([property, value]) => stage.style.setProperty(property, value));
        }
      }
    };
    update();
    reduced.addEventListener("change", update);
    finePointer.addEventListener("change", update);
    return () => {
      reduced.removeEventListener("change", update);
      finePointer.removeEventListener("change", update);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reducedMotionRef.current || !finePointerRef.current) return;
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
    const y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      stage.dataset.active = "true";
      applyValues({
        "--mark-rx": `${(-y * 5).toFixed(2)}deg`, "--mark-ry": `${(x * 7).toFixed(2)}deg`,
        "--p1-x": `${(-8 - x * 5).toFixed(1)}px`, "--p1-y": `${(-9 - y * 4).toFixed(1)}px`, "--p1-z": "34px", "--p1-r": `${(-1.5 + x * 0.8).toFixed(2)}deg`,
        "--p2-x": `${(-4 - x * 2).toFixed(1)}px`, "--p2-y": `${(4 + y * 2).toFixed(1)}px`, "--p2-z": "26px", "--p2-r": `${(-0.6 - y * 0.4).toFixed(2)}deg`,
        "--p3-x": `${(5 + x * 2).toFixed(1)}px`, "--p3-y": `${(1 - y * 2).toFixed(1)}px`, "--p3-z": "6px", "--p3-r": `${(0.45 + y * 0.3).toFixed(2)}deg`,
      });
    });
  };

  return (
    <div ref={stageRef} className="interactive-logo" data-active="false" aria-hidden="true" onPointerMove={handlePointerMove} onPointerLeave={resetStage}>
      <div className="interactive-logo__halo" />
      <div className="interactive-logo__orbit interactive-logo__orbit--one" />
      <div className="interactive-logo__orbit interactive-logo__orbit--two" />
      <div className="interactive-logo__assembly">
        {pieces.map((piece, index) => (
          <Image key={piece.name} className={`interactive-logo__piece interactive-logo__piece--${index + 1}`} src={piece.src} alt="" width={480} height={350} priority unoptimized draggable={false} />
        ))}
      </div>
      <span className="interactive-logo__caption">Mover para explorar</span>
    </div>
  );
}
