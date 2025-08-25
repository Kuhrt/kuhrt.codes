import Container from '@/components/layouts/Container';
import CodeSymbolParticles from '@/components/particles/code/CodeSymbolParticles';
import PhilosophyCard from '@/components/philosophy/PhilosopyCard';
import GradientHeading from '@/components/text/GradientHeading';
import Typewriter from '@/components/text/Typewriter';
import { philosophies } from '@/constants/philosophy';

export default function HomePage() {
  return (
    <>
      <main>
        <section
          id="intro"
          className="relative flex flex-col items-center justify-center h-screen z-10 after:content-[''] after:absolute after:top-2/3 after:left-0 after:right-0 after:bottom-0 after:bg-gradient-to-b after:from-transparent after:to-background after:z-20"
        >
          <CodeSymbolParticles />
          <div className="relative text-center z-30">
            <GradientHeading level="h1" text="Hello, I'm Kuhrt" />
            <Typewriter className="text-2xl text-primary font-mono">
              I build modern web applications.
            </Typewriter>
          </div>
        </section>

        <section id="cards" className="py-16 xl:py-32 relative isolate z-20">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
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
            className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:bottom-0"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
              }}
              className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-primary to-secondary opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
            ></div>
          </div>
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 xl:gap-16">
              <h2 className="text-5xl lg:text-7xl font-black md:col-span-2">
                My Philosophy
              </h2>
              {philosophies.map((philosophy) => (
                <PhilosophyCard
                  key={philosophy.title}
                  philosophy={philosophy}
                />
              ))}
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
