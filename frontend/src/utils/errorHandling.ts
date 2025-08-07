/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosError } from 'axios';

// Error types for classification
export enum ErrorType {
  NETWORK = 'NETWORK',
  SERVER = 'SERVER',
  AUTH = 'AUTH',
  TIMEOUT = 'TIMEOUT',
  UNKNOWN = 'UNKNOWN'
}

// Error interface
export interface ClassifiedError {
  type: ErrorType;
  message: string;
  userMessage: string;
  retryable: boolean;
  statusCode?: number;
  originalError: any;
}

// Retry configuration
export interface RetryConfig {
  maxAttempts: number;
  baseDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
  retryableErrors: ErrorType[];
}

// Default retry configuration
export const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxAttempts: 3,
  baseDelay: 1000, // 1 second
  maxDelay: 10000, // 10 seconds
  backoffMultiplier: 2,
  retryableErrors: [ErrorType.NETWORK, ErrorType.TIMEOUT, ErrorType.SERVER]
};

/**
 * Classifies errors based on their characteristics
 */
export function classifyError(error: any): ClassifiedError {
  // Handle Axios errors
  if (error.isAxiosError || error.response) {
    const axiosError = error as AxiosError;
    
    // Network errors (no response received)
    if (!axiosError.response) {
      if (axiosError.code === 'ECONNABORTED' || axiosError.message.includes('timeout')) {
        return {
          type: ErrorType.TIMEOUT,
          message: 'Request timeout',
          userMessage: 'The request took too long. Please check your connection and try again.',
          retryable: true,
          originalError: error
        };
      }
      
      return {
        type: ErrorType.NETWORK,
        message: 'Network error',
        userMessage: 'Unable to connect to the server. Please check your internet connection.',
        retryable: true,
        originalError: error
      };
    }

    const status = axiosError.response.status;
    
    // Authentication errors
    if (status === 401 || status === 403) {
      return {
        type: ErrorType.AUTH,
        message: 'Authentication error',
        userMessage: 'Your session has expired. Please log in again.',
        retryable: false,
        statusCode: status,
        originalError: error
      };
    }
    
    // Client errors (4xx)
    if (status >= 400 && status < 500) {
      return {
        type: ErrorType.SERVER,
        message: `Client error: ${status}`,
        userMessage: 'There was a problem with your request. Please try again.',
        retryable: false,
        statusCode: status,
        originalError: error
      };
    }
    
    // Server errors (5xx)
    if (status >= 500) {
      return {
        type: ErrorType.SERVER,
        message: `Server error: ${status}`,
        userMessage: 'The server is experiencing issues. Please try again in a moment.',
        retryable: true,
        statusCode: status,
        originalError: error
      };
    }
  }
  
  // Handle timeout errors
  if (error.name === 'TimeoutError' || error.message?.includes('timeout')) {
    return {
      type: ErrorType.TIMEOUT,
      message: 'Operation timeout',
      userMessage: 'The operation took too long. Please try again.',
      retryable: true,
      originalError: error
    };
  }
  
  // Unknown errors
  return {
    type: ErrorType.UNKNOWN,
    message: error.message || 'Unknown error',
    userMessage: 'Something went wrong. Please try again.',
    retryable: true,
    originalError: error
  };
}

/**
 * Calculates delay for exponential backoff
 */
export function calculateBackoffDelay(attempt: number, config: RetryConfig): number {
  const delay = config.baseDelay * Math.pow(config.backoffMultiplier, attempt - 1);
  return Math.min(delay, config.maxDelay);
}

/**
 * Creates a delay promise
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry wrapper with exponential backoff
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  config: RetryConfig = DEFAULT_RETRY_CONFIG,
  onRetry?: (attempt: number, error: ClassifiedError) => void
): Promise<T> {
  let lastError: ClassifiedError;
  
  for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = classifyError(error);
      
      // Don't retry if error is not retryable or we've reached max attempts
      if (!lastError.retryable || 
          !config.retryableErrors.includes(lastError.type) || 
          attempt === config.maxAttempts) {
        throw lastError;
      }
      
      // Call retry callback if provided
      if (onRetry) {
        onRetry(attempt, lastError);
      }
      
      // Wait before retrying
      const delayMs = calculateBackoffDelay(attempt, config);
      await delay(delayMs);
    }
  }
  
  throw lastError!;
}

/**
 * Creates a timeout wrapper for promises
 */
export function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  timeoutMessage = 'Operation timed out'
): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error(timeoutMessage));
    }, timeoutMs);
  });
  
  return Promise.race([promise, timeoutPromise]);
}

/**
 * Hook for managing component mount state to prevent memory leaks
 */
export function createMountedRef(): { current: boolean } {
  const mountedRef = { current: true };
  
  // Cleanup function to be called in useEffect cleanup
  const cleanup = () => {
    mountedRef.current = false;
  };
  
  return mountedRef;
}
