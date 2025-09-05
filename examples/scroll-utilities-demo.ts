import { 
    scrollToTop, 
    scrollToElement, 
    scrollToPosition, 
    isInViewport, 
    getScrollPosition, 
    stopScroll,
    type ScrollOptions 
} from '../src/utils/scrollUtils';

/**
 * Scroll Utilities Demo
 * 
 * This demo showcases the enhanced scroll utilities with smooth scrolling,
 * customizable easing, duration control, and viewport detection.
 * 
 * Note: These functions work in a browser environment.
 * In Node.js, they will show the API usage without actual scrolling.
 */

console.log('📜 Scroll Utilities Demo\n');

/**
 * Example 1: Basic scroll to top
 */
console.log('=== 1. Basic Scroll to Top ===');
console.log('Current scroll position:', getScrollPosition());

// Basic scroll to top
console.log('scrollToTop() - instant scroll to top');
// scrollToTop();

// Smooth scroll to top with default settings
console.log('scrollToTop({ behavior: "smooth" }) - smooth scroll with default duration (500ms)');
// scrollToTop({ behavior: 'smooth' });

/**
 * Example 2: Custom duration and easing
 */
console.log('\n=== 2. Custom Duration and Easing ===');

const scrollOptions: ScrollOptions[] = [
    { duration: 1000, easing: 'easeInOut' },
    { duration: 200, easing: 'easeOut' },
    { duration: 800, easing: 'easeIn' },
    { behavior: 'auto' }
];

scrollOptions.forEach((options, index) => {
    console.log(`Option ${index + 1}:`, options);
    // scrollToTop(options);
});

/**
 * Example 3: Scroll to specific position
 */
console.log('\n=== 3. Scroll to Specific Position ===');

const positions = [100, 500, 1000, 2000];
positions.forEach(position => {
    console.log(`Scroll to position ${position}px with smooth animation`);
    // scrollToPosition(position, { duration: 600, easing: 'easeInOut' });
});

/**
 * Example 4: Scroll to element (simulated)
 */
console.log('\n=== 4. Scroll to Element ===');

// In a real browser environment, you would do:
// const element = document.getElementById('example-section');
// scrollToElement(element, { duration: 800, easing: 'easeInOut' }, 50);

console.log('scrollToElement(element, { duration: 800, easing: "easeInOut" }, 50)');
console.log('- Scrolls to element with 800ms duration');
console.log('- Uses easeInOut easing');
console.log('- Adds 50px offset from the top');

/**
 * Example 5: Viewport detection
 */
console.log('\n=== 5. Viewport Detection ===');

// In a real browser environment:
// const element = document.getElementById('example-element');
// const isVisible = isInViewport(element);
// const isPartiallyVisible = isInViewport(element, 0.5); // 50% threshold

console.log('isInViewport(element) - checks if element is fully visible');
console.log('isInViewport(element, 0.5) - checks if 50% of element is visible');
console.log('isInViewport(element, 0.1) - checks if 10% of element is visible');

/**
 * Example 6: Scroll control
 */
console.log('\n=== 6. Scroll Control ===');

console.log('getScrollPosition() - get current scroll position');
console.log('stopScroll() - stop any ongoing smooth scroll animation');

// Example usage:
// const currentPos = getScrollPosition();
// console.log('Current position:', currentPos);
// 
// // Start a long scroll animation
// scrollToPosition(2000, { duration: 3000, easing: 'easeInOut' });
// 
// // Stop it after 1 second
// setTimeout(() => {
//     stopScroll();
//     console.log('Stopped at position:', getScrollPosition());
// }, 1000);

/**
 * Example 7: Real-world usage patterns
 */
console.log('\n=== 7. Real-World Usage Patterns ===');

// Pattern 1: Navigation menu
console.log('Pattern 1: Navigation Menu');
console.log('```typescript');
console.log('function scrollToSection(sectionId: string) {');
console.log('    const element = document.getElementById(sectionId);');
console.log('    if (element) {');
console.log('        scrollToElement(element, { duration: 600, easing: "easeInOut" }, 80);');
console.log('    }');
console.log('}');
console.log('```');

// Pattern 2: Back to top button
console.log('\nPattern 2: Back to Top Button');
console.log('```typescript');
console.log('function handleBackToTop() {');
console.log('    scrollToTop({ duration: 800, easing: "easeOut" });');
console.log('}');
console.log('```');

// Pattern 3: Infinite scroll detection
console.log('\nPattern 3: Infinite Scroll Detection');
console.log('```typescript');
console.log('function checkForInfiniteScroll() {');
console.log('    const loadMoreTrigger = document.getElementById("load-more-trigger");');
console.log('    if (loadMoreTrigger && isInViewport(loadMoreTrigger, 0.1)) {');
console.log('        loadMoreContent();');
console.log('    }');
console.log('}');
console.log('```');

// Pattern 4: Smooth scroll with progress tracking
console.log('\nPattern 4: Progress Tracking');
console.log('```typescript');
console.log('function scrollWithProgress(targetPosition: number) {');
console.log('    const startPosition = getScrollPosition();');
console.log('    const distance = targetPosition - startPosition;');
console.log('    ');
console.log('    scrollToPosition(targetPosition, {');
console.log('        duration: 1000,');
console.log('        easing: "easeInOut"');
console.log('    });');
console.log('    ');
console.log('    // Track progress');
console.log('    const interval = setInterval(() => {');
console.log('        const current = getScrollPosition();');
console.log('        const progress = (current - startPosition) / distance;');
console.log('        updateProgressBar(progress);');
console.log('        ');
console.log('        if (Math.abs(current - targetPosition) < 5) {');
console.log('            clearInterval(interval);');
console.log('        }');
console.log('    }, 16); // ~60fps');
console.log('}');
console.log('```');

/**
 * Example 8: Easing functions comparison
 */
console.log('\n=== 8. Easing Functions Comparison ===');

const easingTypes: Array<ScrollOptions['easing']> = ['linear', 'easeIn', 'easeOut', 'easeInOut'];

easingTypes.forEach(easing => {
    console.log(`${easing}:`);
    console.log(`  - scrollToTop({ duration: 1000, easing: "${easing}" })`);
    // scrollToTop({ duration: 1000, easing });
});

/**
 * Example 9: Performance considerations
 */
console.log('\n=== 9. Performance Considerations ===');
console.log('✅ Use appropriate durations:');
console.log('   - Short animations (200-400ms) for quick navigation');
console.log('   - Medium animations (500-800ms) for smooth transitions');
console.log('   - Long animations (1000ms+) for dramatic effects');
console.log('');
console.log('✅ Choose the right easing:');
console.log('   - easeOut: Good for UI interactions (feels responsive)');
console.log('   - easeInOut: Good for page transitions (feels natural)');
console.log('   - easeIn: Good for dramatic entrances');
console.log('   - linear: Good for progress indicators');
console.log('');
console.log('✅ Use stopScroll() to cancel animations when needed');
console.log('✅ Check isInViewport() before triggering scroll animations');
console.log('✅ Use getScrollPosition() for scroll-based calculations');

/**
 * Example 10: Browser compatibility
 */
console.log('\n=== 10. Browser Compatibility ===');
console.log('✅ Modern browsers: Full support with smooth scrolling');
console.log('✅ Older browsers: Falls back to instant scrolling');
console.log('✅ Mobile devices: Respects user preferences for reduced motion');
console.log('✅ SSR/Node.js: Functions are safe to call (no-op)');

console.log('\n=== Scroll Utilities Demo Complete ===');
console.log('Key Features:');
console.log('✅ Smooth scrolling with customizable duration');
console.log('✅ Multiple easing functions (linear, easeIn, easeOut, easeInOut)');
console.log('✅ Scroll to top, position, or element');
console.log('✅ Viewport detection with configurable thresholds');
console.log('✅ Scroll position tracking');
console.log('✅ Animation control (start/stop)');
console.log('✅ Browser compatibility and SSR safety');
