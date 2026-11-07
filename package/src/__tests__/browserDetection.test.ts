/**
 * This is from dotCollab: Added comprehensive tests for browser detection utility
 */

import { detectBrowser, type BrowserInfo } from '../utils/browserDetection.js';

// Mock navigator object
const mockNavigator = (userAgent: string, userAgentData?: any) => {
    const originalNavigator = global.navigator;
    
    // @ts-ignore - Mocking navigator for testing
    global.navigator = {
        userAgent,
        userAgentData,
    } as Navigator;
    
    return () => {
        global.navigator = originalNavigator;
    };
};

describe('browserDetection', () => {
    describe('detectBrowser', () => {
        describe('Modern browsers (userAgentData API)', () => {
            test('should detect Chrome using userAgentData', () => {
                const restore = mockNavigator('', {
                    brand: 'Google Chrome',
                    version: '120.0.0.0',
                    mobile: false,
                    platform: 'Windows',
                });
                
                const result = detectBrowser();
                expect(result.name).toBe('Chrome');
                expect(result.version).toBe('120.0.0.0');
                expect(result.isMobile).toBe(false);
                
                restore();
            });

            test('should detect Edge using userAgentData', () => {
                const restore = mockNavigator('', {
                    brand: 'Microsoft Edge',
                    version: '119.0.0.0',
                    mobile: false,
                    platform: 'Windows',
                });
                
                const result = detectBrowser();
                expect(result.name).toBe('Edge');
                expect(result.version).toBe('119.0.0.0');
                expect(result.isMobile).toBe(false);
                
                restore();
            });

            test('should detect mobile Chrome using userAgentData', () => {
                const restore = mockNavigator('', {
                    brand: 'Google Chrome',
                    version: '120.0.0.0',
                    mobile: true,
                    platform: 'Android',
                });
                
                const result = detectBrowser();
                expect(result.name).toBe('Chrome');
                expect(result.version).toBe('120.0.0.0');
                expect(result.isMobile).toBe(true);
                
                restore();
            });
        });

        describe('Chrome detection (userAgent fallback)', () => {
            test('should detect desktop Chrome', () => {
                const restore = mockNavigator(
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                );
                
                const result = detectBrowser();
                expect(result.name).toBe('Chrome');
                expect(result.version).toBe('120.0.0.0');
                expect(result.isMobile).toBe(false);
                
                restore();
            });

            test('should detect mobile Chrome', () => {
                const restore = mockNavigator(
                    'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
                );
                
                const result = detectBrowser();
                expect(result.name).toBe('Chrome');
                expect(result.version).toBe('120.0.0.0');
                expect(result.isMobile).toBe(true);
                
                restore();
            });
        });

        describe('Firefox detection', () => {
            test('should detect desktop Firefox', () => {
                const restore = mockNavigator(
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0'
                );
                
                const result = detectBrowser();
                expect(result.name).toBe('Firefox');
                expect(result.version).toBe('121.0');
                expect(result.isMobile).toBe(false);
                
                restore();
            });

            test('should detect mobile Firefox', () => {
                const restore = mockNavigator(
                    'Mozilla/5.0 (Android 10; Mobile; rv:121.0) Gecko/121.0 Firefox/121.0'
                );
                
                const result = detectBrowser();
                expect(result.name).toBe('Firefox');
                expect(result.version).toBe('121.0');
                expect(result.isMobile).toBe(true);
                
                restore();
            });
        });

        describe('Safari detection', () => {
            test('should detect desktop Safari', () => {
                const restore = mockNavigator(
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15'
                );
                
                const result = detectBrowser();
                expect(result.name).toBe('Safari');
                expect(result.version).toBe('17.1');
                expect(result.isMobile).toBe(false);
                
                restore();
            });

            test('should detect mobile Safari (iPhone)', () => {
                const restore = mockNavigator(
                    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1'
                );
                
                const result = detectBrowser();
                expect(result.name).toBe('Safari');
                expect(result.version).toBe('17.1');
                expect(result.isMobile).toBe(true);
                
                restore();
            });

            test('should detect mobile Safari (iPad)', () => {
                const restore = mockNavigator(
                    'Mozilla/5.0 (iPad; CPU OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1'
                );
                
                const result = detectBrowser();
                expect(result.name).toBe('Safari');
                expect(result.version).toBe('17.1');
                expect(result.isMobile).toBe(true);
                
                restore();
            });
        });

        describe('Edge detection', () => {
            test('should detect desktop Edge', () => {
                const restore = mockNavigator(
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0'
                );
                
                const result = detectBrowser();
                expect(result.name).toBe('Edge');
                expect(result.version).toBe('120.0.0.0');
                expect(result.isMobile).toBe(false);
                
                restore();
            });

            test('should detect mobile Edge', () => {
                const restore = mockNavigator(
                    'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36 EdgA/120.0.0.0'
                );
                
                const result = detectBrowser();
                expect(result.name).toBe('Edge');
                expect(result.version).toBe('120.0.0.0');
                expect(result.isMobile).toBe(true);
                
                restore();
            });
        });

        describe('Opera detection', () => {
            test('should detect desktop Opera', () => {
                const restore = mockNavigator(
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 OPR/106.0.0.0'
                );
                
                const result = detectBrowser();
                expect(result.name).toBe('Opera');
                expect(result.version).toBe('106.0.0.0');
                expect(result.isMobile).toBe(false);
                
                restore();
            });

            test('should detect mobile Opera', () => {
                const restore = mockNavigator(
                    'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36 OPR/106.0.0.0'
                );
                
                const result = detectBrowser();
                expect(result.name).toBe('Opera');
                expect(result.version).toBe('106.0.0.0');
                expect(result.isMobile).toBe(true);
                
                restore();
            });
        });

        describe('Unknown browser handling', () => {
            test('should return unknown for unrecognized user agent', () => {
                const restore = mockNavigator(
                    'SomeUnknownBrowser/1.0'
                );
                
                const result = detectBrowser();
                expect(result.name).toBe('unknown');
                expect(result.version).toBe('');
                expect(result.isMobile).toBe(false);
                
                restore();
            });

            test('should handle empty user agent', () => {
                const restore = mockNavigator('');
                
                const result = detectBrowser();
                expect(result.name).toBe('unknown');
                expect(result.version).toBe('');
                expect(result.isMobile).toBe(false);
                
                restore();
            });

            // This is from dotCollab: Added test for SSR/Node.js environment where navigator is undefined
            test('should handle SSR/Node.js environment where navigator is undefined', () => {
                const originalNavigator = global.navigator;
                // @ts-ignore - Removing navigator to simulate SSR/Node.js
                delete global.navigator;
                
                const result = detectBrowser();
                expect(result.name).toBe('unknown');
                expect(result.version).toBe('');
                expect(result.isMobile).toBe(false);
                
                // Restore navigator
                global.navigator = originalNavigator;
            });
        });

        describe('Mobile device detection', () => {
            test('should detect Android as mobile', () => {
                const restore = mockNavigator(
                    'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36'
                );
                
                const result = detectBrowser();
                expect(result.isMobile).toBe(true);
                
                restore();
            });

            test('should detect iPhone as mobile', () => {
                const restore = mockNavigator(
                    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15'
                );
                
                const result = detectBrowser();
                expect(result.isMobile).toBe(true);
                
                restore();
            });

            test('should detect iPad as mobile', () => {
                const restore = mockNavigator(
                    'Mozilla/5.0 (iPad; CPU OS 17_1 like Mac OS X) AppleWebKit/605.1.15'
                );
                
                const result = detectBrowser();
                expect(result.isMobile).toBe(true);
                
                restore();
            });

            test('should detect desktop as not mobile', () => {
                const restore = mockNavigator(
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                );
                
                const result = detectBrowser();
                expect(result.isMobile).toBe(false);
                
                restore();
            });
        });

        describe('Browser priority (Edge/Opera before Chrome)', () => {
            test('should detect Edge even when Chrome is in user agent', () => {
                const restore = mockNavigator(
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0'
                );
                
                const result = detectBrowser();
                expect(result.name).toBe('Edge');
                expect(result.name).not.toBe('Chrome');
                
                restore();
            });

            test('should detect Opera even when Chrome is in user agent', () => {
                const restore = mockNavigator(
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 OPR/106.0.0.0'
                );
                
                const result = detectBrowser();
                expect(result.name).toBe('Opera');
                expect(result.name).not.toBe('Chrome');
                
                restore();
            });
        });

        describe('Return type validation', () => {
            test('should return BrowserInfo type with all required fields', () => {
                const restore = mockNavigator(
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                );
                
                const result = detectBrowser();
                
                expect(result).toHaveProperty('name');
                expect(result).toHaveProperty('version');
                expect(result).toHaveProperty('isMobile');
                expect(typeof result.name).toBe('string');
                expect(typeof result.version).toBe('string');
                expect(typeof result.isMobile).toBe('boolean');
                
                restore();
            });
        });
    });
});
