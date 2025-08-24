import Container from '@/components/layouts/Container';
import GradientHeading from '@/components/text/GradientHeading';

export default function HomePage() {
  return (
    <>
      <main>
        <section className="flex flex-col items-center justify-center h-screen">
          <Container>
            <GradientHeading level="h1" text="Hello, I'm Kuhrt" />
          </Container>
        </section>
      </main>
    </>
  );
}
