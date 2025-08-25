import Container from '@/components/layouts/Container';
import CodeSymbolParticles from '@/components/particles/code/CodeSymbolParticles';
import GradientHeading from '@/components/text/GradientHeading';
import Typewriter from '@/components/text/Typewriter';

export default function HomePage() {
  return (
    <>
      <main>
        <section className="relative flex flex-col items-center justify-center h-screen after:content-[''] after:absolute after:top-1/2 after:left-0 after:right-0 after:bottom-0 after:bg-gradient-to-b after:from-transparent after:to-background after:z-20">
          <CodeSymbolParticles />
          <Container className="text-center">
            <GradientHeading level="h1" text="Hello, I'm Kuhrt" />
            <Typewriter className="text-2xl text-primary font-mono">
              I build modern web applications.
            </Typewriter>
          </Container>
        </section>
      </main>
    </>
  );
}
