import type { Config } from 'tailwindcss';

export default {
    darkMode: 'class',
    content: ['./demo/index.html', './demo/src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                success: {
                    DEFAULT: 'hsl(var(--success))',
                    foreground: 'hsl(var(--success-foreground))'
                },
                warning: {
                    DEFAULT: 'hsl(var(--warning))',
                    foreground: 'hsl(var(--warning-foreground))'
                }
            },
            borderRadius: {
                xl: 'calc(var(--radius) + 4px)',
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 4px)',
                sm: 'calc(var(--radius) - 8px)'
            },
            fontFamily: {
                mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
            },
            boxShadow: {
                soft: '0 1px 2px 0 hsl(240 10% 8% / 0.04), 0 4px 16px -4px hsl(240 10% 8% / 0.08)',
                glow: '0 0 0 1px hsl(var(--primary) / 0.2), 0 8px 24px -8px hsl(var(--primary) / 0.4)'
            },
            keyframes: {
                'fade-in': {
                    from: { opacity: '0' },
                    to: { opacity: '1' }
                },
                'slide-up': {
                    from: { opacity: '0', transform: 'translateY(12px)' },
                    to: { opacity: '1', transform: 'translateY(0)' }
                },
                'flash': {
                    '0%': { backgroundColor: 'hsl(var(--primary) / 0.18)' },
                    '100%': { backgroundColor: 'transparent' }
                }
            },
            animation: {
                'fade-in': 'fade-in 200ms ease-out',
                'slide-up': 'slide-up 320ms cubic-bezier(0.22, 1, 0.36, 1)',
                'flash': 'flash 600ms ease-out'
            }
        }
    },
    plugins: []
} satisfies Config;
