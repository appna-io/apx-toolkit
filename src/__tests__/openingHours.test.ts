import { formatOpeningHours, type StoreHours } from '../utils/i18nFormatters';

describe('formatOpeningHours', () => {
    const sampleStoreHours: StoreHours = [
        // Sunday (0) - Open 9:00-18:00
        [{ "closed": "18:00", "open": "09:00" }],
        // Monday (1) - Closed
        { "closed": false, "open": false },
        // Tuesday (2) - Open 9:00-18:00
        [{ "closed": "18:00", "open": "09:00" }],
        // Wednesday (3) - Open 9:00-18:00
        [{ "closed": "18:00", "open": "09:00" }],
        // Thursday (4) - Open 9:00-18:00
        [{ "closed": "18:00", "open": "09:00" }],
        // Friday (5) - Open 9:00-16:00
        [{ "closed": "16:00", "open": "09:00" }],
        // Saturday (6) - Open 9:00-18:00
        [{ "closed": "18:00", "open": "09:00" }]
    ];

    it('should format opening hours in English with AM/PM format', () => {
        const result = formatOpeningHours(sampleStoreHours, {
            locale: 'en-US',
            use24Hour: false,
            language: 'en'
        });

        expect(result).toEqual([
            'Sunday, Saturday: 9:00 AM - 6:00 PM',
            'Tuesday - Thursday: 9:00 AM - 6:00 PM',
            'Friday: 9:00 AM - 4:00 PM',
            'Monday: Closed'
        ]);
    });

    it('should format opening hours in English with 24-hour format', () => {
        const result = formatOpeningHours(sampleStoreHours, {
            locale: 'en-US',
            use24Hour: true,
            language: 'en'
        });

        expect(result).toEqual([
            'Sunday, Saturday: 09:00 - 18:00',
            'Tuesday - Thursday: 09:00 - 18:00',
            'Friday: 09:00 - 16:00',
            'Monday: Closed'
        ]);
    });

    it('should format opening hours in Hebrew', () => {
        const result = formatOpeningHours(sampleStoreHours, {
            locale: 'he-IL',
            use24Hour: false,
            language: 'he'
        });

        expect(result).toEqual([
            'ראשון, שבת: 9:00 AM - 6:00 PM',
            'שלישי - חמישי: 9:00 AM - 6:00 PM',
            'שישי: 9:00 AM - 4:00 PM',
            'שני: סגור'
        ]);
    });

    it('should format opening hours in Arabic with 24-hour format', () => {
        const result = formatOpeningHours(sampleStoreHours, {
            locale: 'ar-SA',
            use24Hour: true,
            language: 'ar'
        });

        expect(result).toEqual([
            'الأحد, السبت: ٠٩:٠٠ - ١٨:٠٠',
            'الثلاثاء - الخميس: ٠٩:٠٠ - ١٨:٠٠',
            'الجمعة: ٠٩:٠٠ - ١٦:٠٠',
            'الاثنين: مغلق'
        ]);
    });

    it('should handle all days closed', () => {
        const allClosedHours: StoreHours = [
            { "closed": false, "open": false },
            { "closed": false, "open": false },
            { "closed": false, "open": false },
            { "closed": false, "open": false },
            { "closed": false, "open": false },
            { "closed": false, "open": false },
            { "closed": false, "open": false }
        ];

        const result = formatOpeningHours(allClosedHours, {
            locale: 'en-US',
            use24Hour: false,
            language: 'en'
        });

        expect(result).toEqual(['Sunday - Saturday: Closed']);
    });

    it('should handle all days with same hours', () => {
        const sameHours: StoreHours = [
            [{ "closed": "18:00", "open": "09:00" }],
            [{ "closed": "18:00", "open": "09:00" }],
            [{ "closed": "18:00", "open": "09:00" }],
            [{ "closed": "18:00", "open": "09:00" }],
            [{ "closed": "18:00", "open": "09:00" }],
            [{ "closed": "18:00", "open": "09:00" }],
            [{ "closed": "18:00", "open": "09:00" }]
        ];

        const result = formatOpeningHours(sameHours, {
            locale: 'en-US',
            use24Hour: false,
            language: 'en'
        });

        expect(result).toEqual(['Sunday - Saturday: 9:00 AM - 6:00 PM']);
    });

    it('should handle multiple periods per day', () => {
        const multiplePeriods: StoreHours = [
            [{ "closed": "12:00", "open": "09:00" }, { "closed": "18:00", "open": "14:00" }],
            [{ "closed": "12:00", "open": "09:00" }, { "closed": "18:00", "open": "14:00" }],
            [{ "closed": "12:00", "open": "09:00" }, { "closed": "18:00", "open": "14:00" }],
            [{ "closed": "12:00", "open": "09:00" }, { "closed": "18:00", "open": "14:00" }],
            [{ "closed": "12:00", "open": "09:00" }, { "closed": "18:00", "open": "14:00" }],
            [{ "closed": "12:00", "open": "09:00" }, { "closed": "18:00", "open": "14:00" }],
            [{ "closed": "12:00", "open": "09:00" }, { "closed": "18:00", "open": "14:00" }]
        ];

        const result = formatOpeningHours(multiplePeriods, {
            locale: 'en-US',
            use24Hour: false,
            language: 'en'
        });

        expect(result).toEqual(['Sunday - Saturday: 9:00 AM - 12:00 PM, 2:00 PM - 6:00 PM']);
    });

    it('should use default options when none provided', () => {
        const result = formatOpeningHours(sampleStoreHours);

        // Should use default locale and AM/PM format
        expect(result[0]).toContain('AM');
        expect(result[0]).toContain('PM');
    });
});
