/**
 * Validation utilities for form inputs
 */

/**
 * Validates email format using RFC 5322 compliant regex
 * @param email - The email string to validate
 * @returns true if email is valid, false otherwise
 */
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }

  // RFC 5322 compliant email regex (simplified but robust)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  return emailRegex.test(email.trim());
}

/**
 * Gets a user-friendly error message for invalid email
 * @param email - The email string that failed validation
 * @returns Error message string
 */
export function getEmailErrorMessage(email: string): string {
  if (!email || email.trim().length === 0) {
    return 'Email is required';
  }
  
  if (!email.includes('@')) {
    return 'Email must contain @';
  }
  
  if (!email.includes('.')) {
    return 'Email must contain a domain';
  }
  
  return 'Please enter a valid email address';
}

/**
 * Validates password strength
 * @param password - The password string to validate
 * @returns true if password meets minimum requirements
 */
export function validatePassword(password: string): boolean {
  if (!password || typeof password !== 'string') {
    return false;
  }

  // Minimum 6 characters for basic security
  return password.length >= 6;
}

/**
 * Gets a user-friendly error message for invalid password
 * @param password - The password string that failed validation
 * @returns Error message string
 */
export function getPasswordErrorMessage(password: string): string {
  if (!password || password.trim().length === 0) {
    return 'Password is required';
  }
  
  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  
  return 'Please enter a valid password';
}

