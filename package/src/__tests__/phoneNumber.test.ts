import { formatPhoneNumber, COUNTRY_CODES } from '../utils/phoneNumber';

describe('Phone Number Utilities', () => {
  describe('COUNTRY_CODES', () => {
    test('should contain expected country codes', () => {
      expect(COUNTRY_CODES.IL).toBe(972);
      expect(COUNTRY_CODES.US).toBe(1);
      expect(COUNTRY_CODES.GB).toBe(44);
      expect(COUNTRY_CODES.DE).toBe(49);
      expect(COUNTRY_CODES.FR).toBe(33);
    });
  });

  describe('formatPhoneNumber', () => {
    describe('Basic formatting', () => {
      test('should format with PPP - EEE SSSS format', () => {
        expect(formatPhoneNumber('0502892553', 'PPP - EEE SSSS')).toBe('050 - 289 2553');
        expect(formatPhoneNumber('1234567890', 'PPP - EEE SSSS')).toBe('123 - 456 7890');
      });

      test('should format with (PPP) - EEE SSSS format', () => {
        expect(formatPhoneNumber('0502892553', '(PPP) - EEE SSSS')).toBe('(050) - 289 2553');
        expect(formatPhoneNumber('1234567890', '(PPP) - EEE SSSS')).toBe('(123) - 456 7890');
      });

      test('should format with (PP)  EEE SSSS format', () => {
        expect(formatPhoneNumber('0502892553', '(PP)  EEE SSSS')).toBe('(05)  289 2553');
        expect(formatPhoneNumber('1234567890', '(PP)  EEE SSSS')).toBe('(12)  345 6789');
      });

      test('should format with PP-EEE SSSS format', () => {
        expect(formatPhoneNumber('0502892553', 'PP-EEE SSSS')).toBe('05-289 2553');
        expect(formatPhoneNumber('1234567890', 'PP-EEE SSSS')).toBe('12-345 6789');
      });

      test('should format with PPP-EEE SSSS format', () => {
        expect(formatPhoneNumber('0502892553', 'PPP-EEE SSSS')).toBe('050-289 2553');
        expect(formatPhoneNumber('1234567890', 'PPP-EEE SSSS')).toBe('123-456 7890');
        });
    });

    describe('International formatting', () => {
      test('should format with +C (PPP)-EEE-SSSS format', () => {
        expect(formatPhoneNumber('+9720502892553', '+C (PPP)-EEE-SSSS')).toBe('+972 (050)-289-2553');
        expect(formatPhoneNumber('+12345678901', '+C (PPP)-EEE-SSSS')).toBe('+1 (234)-567-8901');
      });

      test('should format with +C (PPP) EEESSSS format', () => {
        expect(formatPhoneNumber('+9720502892553', '+C (PPP) EEESSSS')).toBe('+972 (050) 2892553');
        expect(formatPhoneNumber('+12345678901', '+C (PPP) EEESSSS')).toBe('+1 (234) 5678901');
        });
    });

    describe('E.164 formatting', () => {
      test('should format Israeli number without country code to E.164', () => {
        expect(formatPhoneNumber('0502892553', 'E.164', { originCountry: 'IL' })).toBe('+972502892553');
      });

      test('should format Israeli number with country code to E.164', () => {
        expect(formatPhoneNumber('+9720502892553', 'E.164')).toBe('+972502892553');
      });
    });

    describe('Country code detection', () => {
      test('should auto-detect country code with + prefix', () => {
        expect(formatPhoneNumber('+9720502892553', '+C (PPP)-EEE-SSSS')).toBe('+972 (050)-289-2553');
        expect(formatPhoneNumber('+12345678901', '+C (PPP)-EEE-SSSS')).toBe('+1 (234)-567-8901');
        expect(formatPhoneNumber('+447911123456', '+C (PPP)-EEE-SSSS')).toBe('+44 (791)-112-3456');
      });

      test('should auto-detect country code without + prefix', () => {
        expect(formatPhoneNumber('9720502892553', '+C (PPP)-EEE-SSSS')).toBe('+972 (050)-289-2553');
        expect(formatPhoneNumber('12345678901', '+C (PPP)-EEE-SSSS')).toBe('+1 (234)-567-8901');
        expect(formatPhoneNumber('447911123456', '+C (PPP)-EEE-SSSS')).toBe('+44 (791)-112-3456');
      });

      test('should use originCountry when no country code detected', () => {
        expect(formatPhoneNumber('0502892553', '+C (PPP)-EEE-SSSS', { originCountry: 'US' })).toBe('+1 (050)-289-2553');
        expect(formatPhoneNumber('1234567890', '+C (PPP)-EEE-SSSS', { originCountry: 'GB' })).toBe('+44 (123)-456-7890');
        });
    });

    describe('Israel special handling', () => {
      test('should handle Israeli numbers correctly', () => {
        expect(formatPhoneNumber('+9720502892553', '+C (PPP)-EEE-SSSS')).toBe('+972 (050)-289-2553');
        expect(formatPhoneNumber('9720502892553', '+C (PPP)-EEE-SSSS')).toBe('+972 (050)-289-2553');
        expect(formatPhoneNumber('+972 (050)-289-2553', '+C (PPP)-EEE-SSSS')).toBe('+972 (050)-289-2553');
      });

      test('should handle Israeli numbers without leading 0', () => {
        expect(formatPhoneNumber('972502892553', '+C (PPP)-EEE-SSSS')).toBe('+972 (050)-289-2553');
        });
    });

    describe('Padding and length handling', () => {
      test('should pad short numbers with leadingDigitPad', () => {
        expect(formatPhoneNumber('123456789', 'PPP - EEE SSSS', { leadingDigitPad: '0' })).toBe('012 - 345 6789');
        expect(formatPhoneNumber('12345678', 'PPP - EEE SSSS', { leadingDigitPad: '0' })).toBe('001 - 234 5678');
      });

      test('should use custom leadingDigitPad', () => {
        expect(formatPhoneNumber('123456789', 'PPP - EEE SSSS', { leadingDigitPad: '9' })).toBe('912 - 345 6789');
      });

      test('should handle custom nationalNumberLength', () => {
        expect(formatPhoneNumber('123456789', 'PPP - EEE SSSS', { nationalNumberLength: 9 })).toBe('123 - 456 789');
      });

      test('should return original phone for invalid lengths', () => {
        expect(formatPhoneNumber('1234567', 'PPP - EEE SSSS')).toBe('1234567');
        expect(formatPhoneNumber('123456789012345', 'PPP - EEE SSSS')).toBe('123456789012345');
        });
    });

    describe('Format token handling', () => {
      test('should handle PP vs PPP correctly', () => {
        expect(formatPhoneNumber('1234567890', 'PP-EEE SSSS')).toBe('12-345 6789');
        expect(formatPhoneNumber('1234567890', 'PPP-EEE SSSS')).toBe('123-456 7890');
      });

      test('should prefer PPP over PP when both present', () => {
        expect(formatPhoneNumber('1234567890', 'PP-PPP-EEE SSSS')).toBe('12-123-456 7890');
      });

      test('should handle C token without +', () => {
        expect(formatPhoneNumber('+9720502892553', 'C (PPP)-EEE-SSSS')).toBe('972 (050)-289-2553');
        });
    });

    describe('Input handling', () => {
      test('should handle empty or invalid input', () => {
        expect(formatPhoneNumber('', 'PPP - EEE SSSS')).toBe('');
        expect(formatPhoneNumber('abc', 'PPP - EEE SSSS')).toBe('abc');
        expect(formatPhoneNumber('123', 'PPP - EEE SSSS')).toBe('123');
      });

      test('should handle null/undefined input', () => {
        expect(formatPhoneNumber(null as any, 'PPP - EEE SSSS')).toBe(null);
        expect(formatPhoneNumber(undefined as any, 'PPP - EEE SSSS')).toBe(undefined);
      });

      test('should strip non-digit characters except leading +', () => {
        expect(formatPhoneNumber('+1 (234) 567-8901', '+C (PPP)-EEE-SSSS')).toBe('+1 (234)-567-8901');
        expect(formatPhoneNumber('1.234.567.8901', '+C (PPP)-EEE-SSSS', { originCountry: 'US' })).toBe('+1 (234)-567-8901');
        });
    });

    describe('Options handling', () => {
      test('should respect inputIncludesCountry option', () => {
        expect(formatPhoneNumber('1234567890', '+C (PPP)-EEE-SSSS', { 
          inputIncludesCountry: false, 
          originCountry: 'US' 
        })).toBe('+1 (123)-456-7890');
      });

      test('should use default options', () => {
        expect(formatPhoneNumber('1234567890', '+C (PPP)-EEE-SSSS')).toBe('+972 (123)-456-7890');
        });
    });

    describe('Edge cases', () => {
      test('should handle numbers with exactly 9 digits', () => {
        expect(formatPhoneNumber('123456789', 'PPP - EEE SSSS')).toBe('012 - 345 6789');
      });

      test('should handle numbers with exactly 10 digits', () => {
        expect(formatPhoneNumber('1234567890', 'PPP - EEE SSSS')).toBe('123 - 456 7890');
      });

      test('should handle format with no tokens', () => {
        expect(formatPhoneNumber('1234567890', 'static format')).toBe('static format');
      });

      test('should handle format with only literal characters', () => {
        expect(formatPhoneNumber('1234567890', 'Phone: ###-###-####')).toBe('Phone: ###-###-####');
        });
    });
});
});