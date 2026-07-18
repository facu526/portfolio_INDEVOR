import { About } from "@/src/components/About";
import { Capabilities } from "@/src/components/Capabilities";
import { Contact } from "@/src/components/Contact";
import { Hero } from "@/src/components/Hero";
import { SelectedProjects } from "@/src/components/SelectedProjects";
import { Team } from "@/src/components/Team";

export default function Home() {
  return (
    <main id="contenido">
      <Hero />
      <SelectedProjects />
      <About />
      <Capabilities />
      <Team />
      <Contact />
    </main>
  );
}
