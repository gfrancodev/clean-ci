import { describe, it, expect } from 'vitest';
import { fetchUserData } from '../../services/user-service';

describe('User Service', () => {
  it("should return 'User data' when shouldThrow is false", () => {
    const result = fetchUserData(false);
    expect(result).toBe('User data');
  });

  it('should throw an error when shouldThrow is true', () => {
    expect(() => fetchUserData(true)).toThrow('Failed to fetch data');
  });
});
