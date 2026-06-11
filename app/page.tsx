// TODO: Re-enable once the case studies are filled in with real projects
// import CaseStudySection from '@/components/caseStudies/CaseStudySection';
import Container from '@/components/layouts/Container';
import CodeSymbolParticles from '@/components/particles/code/CodeSymbolParticles';
import MeshParticles from '@/components/particles/mesh/MeshParticles';
import PhilosophyCardGrid from '@/components/philosophy/PhilosophyCardGrid';
import GradientHeading from '@/components/text/GradientHeading';
import Typewriter from '@/components/text/Typewriter';
import MagneticButton from '@/components/ui/buttons/MagneticButton';
import { SECTION_IDS } from '@/constants/sections';
// import { caseStudies } from '@/content/caseStudies';
import { CONTACT_CTA_LINK } from '@/content/contact';
import { philosophies } from '@/content/philosophy';

export default function HomePage() {
  return (
    <main className="z-10 translate-0">
      <section
        id={SECTION_IDS.intro}
        className="relative flex flex-col items-center justify-center h-screen z-10 after:content-[''] after:absolute after:top-2/3 after:left-0 after:right-0 after:bottom-0 after:bg-gradient-to-b after:from-transparent after:to-background after:z-60"
      >
        <CodeSymbolParticles />
        <div className="relative text-center z-60 px-6">
          <GradientHeading level="h1" text="Hello, I'm Kuhrt" />

          <Typewriter className="text-2xl text-primary font-mono max-w-3xl mx-auto">
            I build software that holds up after launch.
          </Typewriter>

          <p className="mt-6 text-muted max-w-xl mx-auto">
            Thirteen years of architecture, UX, and production engineering.
            Greenfield build, legacy rescue, or AI-accelerated prototype — the
            last 80% is still engineering, and that&apos;s where I do my best
            work.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <MagneticButton href={CONTACT_CTA_LINK}>
              Let&apos;s talk →
            </MagneticButton>
            <p className="text-xs font-mono text-muted">
              Open to the right opportunities.
            </p>
          </div>
        </div>
      </section>

      <section
        id={SECTION_IDS.capabilities}
        className="relative flex flex-col items-center justify-center h-screen z-10 after:content-[''] lg:after:absolute lg:after:left-0 lg:after:right-0 lg:after:bottom-0 lg:after:h-72 lg:after:bg-gradient-to-b lg:after:from-transparent lg:after:to-background lg:after:z-100"
      >
        <h2 className="sr-only">Capabilities</h2>
        <MeshParticles />
      </section>

      {/* TODO: Re-enable once the case studies are filled in with real projects
      <section id={SECTION_IDS.caseStudies} className="relative z-10">
        <CaseStudySection caseStudies={caseStudies} />
      </section>
      */}

      <section
        id={SECTION_IDS.philosophy}
        className="py-16 xl:py-32 relative isolate z-20"
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 will-change-transform"
          data-lag="0.8"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-primary to-secondary opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          ></div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:bottom-0 will-change-transform"
          data-lag="1.2"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
            }}
            className="relative left-[calc(50%+3rem)] aspect-1200/800 w-144.5 -translate-x-1/2 bg-linear-to-tr from-primary to-secondary opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
          ></div>
        </div>
        <Container>
          <h2 className="text-5xl lg:text-7xl font-black mb-8 xl:mb-16">
            My Philosophy
          </h2>
          <PhilosophyCardGrid philosophies={philosophies} />
        </Container>
      </section>
    </main>
  );
}
