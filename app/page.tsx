import Container from '@/components/layouts/Container';
import CodeSymbolParticles from '@/components/particles/code/CodeSymbolParticles';
import GradientHeading from '@/components/text/GradientHeading';

export default function HomePage() {
  return (
    <>
      <main>
        <section className="relative flex flex-col items-center justify-center h-screen">
          <CodeSymbolParticles />
          <Container className="text-center">
            <GradientHeading level="h1" text="Hello, I'm Kuhrt" />
          </Container>
        </section>
      </main>
    </>
  );
}
