import ScrollTriggerProvider from './ScrollTriggerProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ScrollTriggerProvider>{children}</ScrollTriggerProvider>;
}
