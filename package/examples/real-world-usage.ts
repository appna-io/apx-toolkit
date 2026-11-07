/**
 * Real-world usage example of @apx-ui/toolkit with context system
 * This shows how you would typically use the library in a production application
 */

import { 
    config, 
    setLanguage, 
    getLanguage,
    setCurrency,
    getCurrency,
    formatCurrencyI18N, 
    formatDateI18N, 
    formatTimeI18N,
    getDayTranslation,
    getMonthTranslation,
    ApxContextOptions 
} from '../src/index';

/**
 * App configuration based on environment
 */
interface AppConfig {
    environment: 'development' | 'staging' | 'production';
    region: 'US' | 'EU' | 'ASIA' | 'MENA';
    features: {
        multiCurrency: boolean;
        multiLanguage: boolean;
        analytics: boolean;
    };
}

/**
 * Initialize the library based on app configuration
 */
function initializeLibrary(appConfig: AppConfig) {
    console.log('🚀 Initializing @apx-ui/toolkit...');
    
    // Configure based on region and environment
    const contextConfig: ApxContextOptions = {
        persistToStorage: true,
        debug: appConfig.environment === 'development',
        languageStorageKey: `${appConfig.environment}_apx_language`,
        currencyStorageKey: `${appConfig.environment}_apx_currency`,
    };
    
    // Set defaults based on region
    switch (appConfig.region) {
        case 'US':
            contextConfig.defaultLanguage = 'en';
            contextConfig.defaultCurrency = 'USD';
            contextConfig.defaultTimezone = 'America/New_York';
            break;
        case 'EU':
            contextConfig.defaultLanguage = 'en';
            contextConfig.defaultCurrency = 'EUR';
            contextConfig.defaultTimezone = 'Europe/London';
            break;
        case 'MENA':
            contextConfig.defaultLanguage = 'ar';
            contextConfig.defaultCurrency = 'SAR';
            contextConfig.defaultTimezone = 'Asia/Riyadh';
            break;
        case 'ASIA':
            contextConfig.defaultLanguage = 'en';
            contextConfig.defaultCurrency = 'USD';
            contextConfig.defaultTimezone = 'Asia/Tokyo';
            break;
    }
    
    config(contextConfig);
    console.log(`✅ Library initialized for ${appConfig.region} region`);
}

/**
 * E-commerce product display component
 */
class ProductDisplay {
    private product: {
        id: string;
        name: string;
        price: number;
        saleDate: Date;
        deliveryTime: number; // in hours
    };
    
    constructor(product: any) {
        this.product = product;
    }
    
    render(): string {
        // All formatting automatically uses current context
        const price = formatCurrencyI18N(this.product.price);
        const saleDate = formatDateI18N(this.product.saleDate);
        const deliveryTime = formatTimeI18N(this.product.deliveryTime, 'h');
        
        const currentLang = getLanguage();
        const currentCurrency = getCurrency();
        
        return `
Product: ${this.product.name}
Price: ${price} (${currentCurrency})
Sale Date: ${saleDate}
Delivery: ${deliveryTime}
Language: ${currentLang}
        `.trim();
    }
}

/**
 * User settings management
 */
class UserSettings {
    static updateLanguage(language: 'en' | 'es' | 'fr' | 'de' | 'ar' | 'he') {
        console.log(`🌐 User changed language to: ${language}`);
        setLanguage(language);
        
        // Log current settings
        console.log('Current settings:', {
            language: getLanguage(),
            currency: getCurrency()
        });
    }
    
    static updateCurrency(currency: string) {
        console.log(`💰 User changed currency to: ${currency}`);
        setCurrency(currency);
    }
    
    static updateRegion(region: 'US' | 'EU' | 'UK' | 'MENA') {
        console.log(`🗺️ User changed region to: ${region}`);
        
        // Update both language and currency based on region
        switch (region) {
            case 'US':
                setLanguage('en');
                setCurrency('USD');
                break;
            case 'EU':
                setLanguage('en');
                setCurrency('EUR');
                break;
            case 'UK':
                setLanguage('en');
                setCurrency('GBP');
                break;
            case 'MENA':
                setLanguage('ar');
                setCurrency('AED');
                break;
        }
    }
}

/**
 * Calendar/Scheduler component
 */
class Calendar {
    static getWeekdays(): string[] {
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        const currentLang = getLanguage();
        
        return days.map(day => 
            getDayTranslation(currentLang, day as any, 'short')
        );
    }
    
    static getMonths(): string[] {
        const months = [
            'january', 'february', 'march', 'april', 'may', 'june',
            'july', 'august', 'september', 'october', 'november', 'december'
        ];
        const currentLang = getLanguage();
        
        return months.map(month => 
            getMonthTranslation(currentLang, month as any, 'long')
        );
    }
    
    static formatEvent(eventDate: Date, title: string): string {
        const formattedDate = formatDateI18N(eventDate, undefined, 'appointment');
        return `📅 ${title} - ${formattedDate}`;
    }
}

/**
 * Demo function showing real-world usage
 */
export function demonstrateRealWorldUsage() {
    console.log('=== Real-World Usage Demo ===\n');
    
    // 1. App initialization for different regions
    console.log('--- 1. US E-commerce App ---');
    
    initializeLibrary({
        environment: 'production',
        region: 'US',
        features: {
            multiCurrency: true,
            multiLanguage: true,
            analytics: true
        }
    });
    
    // 2. Display product
    const product = new ProductDisplay({
        id: 'prod_123',
        name: 'Premium Headphones',
        price: 299.99,
        saleDate: new Date('2024-02-15T10:00:00'),
        deliveryTime: 24
    });
    
    console.log('Product Display (US/English):');
    console.log(product.render());
    
    // 3. User changes language to Spanish
    console.log('\n--- 2. User Changes Language ---');
    UserSettings.updateLanguage('es');
    
    console.log('\nProduct Display (Spanish):');
    console.log(product.render());
    
    // 4. User changes to European region
    console.log('\n--- 3. User Changes Region ---');
    UserSettings.updateRegion('EU');
    
    console.log('\nProduct Display (EU/Euro):');
    console.log(product.render());
    
    // 5. Calendar component
    console.log('\n--- 4. Calendar Component ---');
    console.log('Weekdays:', Calendar.getWeekdays().join(', '));
    console.log('Months:', Calendar.getMonths().slice(0, 6).join(', ') + '...');
    
    const event = Calendar.formatEvent(
        new Date('2024-03-15T14:30:00'), 
        'Team Meeting'
    );
    console.log('Event:', event);
    
    // 6. Multi-language support
    console.log('\n--- 5. Multi-Language Support ---');
    
    const languages = ['en', 'es', 'fr', 'de', 'ar', 'he'] as const;
    
    languages.forEach(lang => {
        UserSettings.updateLanguage(lang);
        const price = formatCurrencyI18N(99.99);
        const date = formatDateI18N(new Date('2024-01-15'));
        console.log(`${lang}: ${price} | ${date}`);
    });
    
    // 7. MENA region app
    console.log('\n--- 6. MENA Region App ---');
    
    initializeLibrary({
        environment: 'production',
        region: 'MENA',
        features: {
            multiCurrency: true,
            multiLanguage: true,
            analytics: false
        }
    });
    
    const menaProduct = new ProductDisplay({
        id: 'prod_456',
        name: 'Smart Watch',
        price: 899,
        saleDate: new Date('2024-02-20T16:00:00'),
        deliveryTime: 48
    });
    
    console.log('Product Display (MENA/Arabic):');
    console.log(menaProduct.render());
    
    // 8. Override formatting for specific needs
    console.log('\n--- 7. Context Override Examples ---');
    
    console.log('Current context currency:', formatCurrencyI18N(199.99));
    console.log('Override to USD:', formatCurrencyI18N(199.99, 'USD'));
    console.log('Override to EUR with German formatting:', formatCurrencyI18N(199.99, 'EUR', 'de-DE'));
    
    console.log('\n=== Real-World Demo Complete ===');
}

/**
 * Performance and best practices demo
 */
export function demonstrateBestPractices() {
    console.log('\n=== Best Practices Demo ===\n');
    
    // 1. Initialize once at app startup
    console.log('✅ DO: Initialize once at app startup');
    config({
        defaultLanguage: 'en',
        defaultCurrency: 'USD',
        persistToStorage: true,
        debug: false // Always false in production
    });
    
    // 2. Use context-aware formatters
    console.log('✅ DO: Use formatters without parameters to leverage context');
    console.log('Price:', formatCurrencyI18N(29.99)); // Uses context
    console.log('Date:', formatDateI18N(new Date())); // Uses context
    
    // 3. Change context globally for user preferences
    console.log('\n✅ DO: Change context for user preference changes');
    setLanguage('es');
    setCurrency('EUR');
    
    // All subsequent formatting will use the new context
    console.log('After context change:');
    console.log('Price:', formatCurrencyI18N(29.99));
    console.log('Date:', formatDateI18N(new Date()));
    
    // 4. Override context only when needed
    console.log('\n✅ DO: Override context only for specific formatting needs');
    console.log('German formatting (override):', formatCurrencyI18N(29.99, 'EUR', 'de-DE'));
    console.log('Context formatting (normal):', formatCurrencyI18N(29.99));
    
    // 5. Performance considerations
    console.log('\n💡 Performance Tips:');
    console.log('- Initialize context once');
    console.log('- Use context-aware formatting (fewer parameters)');
    console.log('- Change context globally, not per formatting call');
    console.log('- Enable debug only in development');
    
    console.log('\n=== Best Practices Demo Complete ===');
}

// Run the demo if this file is executed directly
if (require.main === module) {
    demonstrateRealWorldUsage();
    demonstrateBestPractices();
}
