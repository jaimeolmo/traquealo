import { generateReportSlug } from './generateReportSlug'; // Use import

// Mock the Date object to control time in tests
jest.useFakeTimers();

describe('generateReportSlug', () => {
  it('should generate a slug with the correct date format', () => {
    // Set a fixed date for testing
    jest.setSystemTime(new Date('2024-03-16T10:20:30.000Z'));

    const result = generateReportSlug('municipalityCode');
    expect(result).toBe('240316-37230000-municipalityCode');
  });

  it('should handle different municipality codes', () => {
    const result1 = generateReportSlug('municipalityCode1');
    const result2 = generateReportSlug('municipalityCode2');

    expect(result1).not.toBe(result2); // Slugs should be unique
  });

  // Add more tests for potential edge cases if necessary
});