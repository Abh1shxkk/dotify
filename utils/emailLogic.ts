import { ParsedEmail } from '../types';

export const parseEmail = (email: string): ParsedEmail => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { username: '', domain: '', isValid: false };
  }

  const [username, domain] = email.split('@');
  // Remove existing dots for clean generation base
  const cleanUsername = username.replace(/\./g, '');
  
  return {
    username: cleanUsername,
    domain,
    isValid: true
  };
};

/**
 * Generates a specific variation based on an index using bitwise operations.
 * This allows O(1) generation for pagination without storing millions of strings.
 */
export const generateVariationAtIndex = (username: string, domain: string, index: number): string => {
  if (!username) return '';
  
  // username: "abc" (length 3)
  // slots: 2 (between a-b, b-c)
  // index is a bitmask. If bit 0 is 1, place dot at slot 0.
  
  let result = username[0];
  const len = username.length;
  
  for (let i = 1; i < len; i++) {
    // Check if bit (i-1) is set in index
    // We check bits from LSB upwards. 
    // Slot 0 corresponds to bit 0.
    if ((index >> (i - 1)) & 1) {
      result += '.';
    }
    result += username[i];
  }
  
  return `${result}@${domain}`;
};

export const calculateMaxVariations = (username: string): number => {
  if (!username || username.length <= 1) return 0;
  // Limit to 2^20 to prevent performance issues in extreme edge cases (though the Algo supports more)
  // Max Gmail length is 30, so 2^29 is technically possible but huge.
  // We'll return the real math, but the UI might cap pagination.
  return Math.pow(2, username.length - 1);
};
