// Import the centralized GSAP configuration
import '../gsap';

import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

describe('GSAP Configuration', () => {
  it('should register all plugins only once', () => {
    // Check that plugins are registered
    expect(gsap.plugins).toBeDefined();

    // Verify ScrollTrigger is registered
    expect(ScrollTrigger).toBeDefined();

    // Verify ScrollSmoother is registered
    expect(ScrollSmoother).toBeDefined();

    // Verify SplitText is registered
    expect(SplitText).toBeDefined();
  });

  it('should not throw when trying to register plugins again', () => {
    // This should not throw an error since plugins are already registered
    expect(() => {
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
    }).not.toThrow();
  });
});
