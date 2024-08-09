export function fetchUserData(shouldThrow: boolean = false): string {
  if (shouldThrow) {
    throw new Error('Failed to fetch data');
  }
  return 'User data';
}
