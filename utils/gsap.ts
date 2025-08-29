import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Register all GSAP plugins once
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

// Export the registered plugins
export { gsap, ScrollSmoother, ScrollTrigger, SplitText };
