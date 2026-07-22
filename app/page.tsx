import { About } from "@/src/components/About";
import { Capabilities } from "@/src/components/Capabilities";
import { Contact } from "@/src/components/Contact";
import { Hero } from "@/src/components/Hero";
import { Pricing } from "@/src/components/Pricing";
import { Reviews } from "@/src/components/Reviews";
import { SelectedProjects } from "@/src/components/SelectedProjects";
import { Team } from "@/src/components/Team";

export default function Home() {
  return (
    <main id="contenido">
      <Hero />
      <About />
      <Team />
      <SelectedProjects />
      <Reviews />
      <Capabilities />
      <Pricing />
      <Contact />
    </main>
  );
}
