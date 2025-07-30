"use client";

import React, { Component, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { ErrorType, ClassifiedError } from '@/utils/errorHandling';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ errorInfo });
    
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <AlertCircle className="h-12 w-12 text-red-500" />
            </div>
            
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Something went wrong
            </h1>
            
            <p className="text-gray-600 mb-6">
              We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
            </p>
            
            <div className="space-y-3">
              <Button 
                onClick={this.handleRetry}
                className="w-full"
                variant="default"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              
              <Button 
                onClick={() => window.location.reload()}
                variant="outline"
                className="w-full"
              >
                Refresh Page
              </Button>
            </div>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                  Error Details (Development)
                </summary>
                <pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-auto max-h-40">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook-based error boundary for functional components
export const useErrorHandler = () => {
  return (error: Error) => {
    // In a real app, you might want to report this to an error reporting service
    console.error('Unhandled error:', error);
    throw error; // Re-throw to trigger error boundary
  };
};

// Specialized error display component
interface ErrorDisplayProps {
  error: ClassifiedError;
  onRetry?: () => void;
  showRetry?: boolean;
  className?: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  onRetry,
  showRetry = true,
  className = ""
}) => {
  const getErrorIcon = () => {
    switch (error.type) {
      case ErrorType.NETWORK:
        return "🌐";
      case ErrorType.TIMEOUT:
        return "⏱️";
      case ErrorType.AUTH:
        return "🔒";
      case ErrorType.SERVER:
        return "🔧";
      default:
        return "⚠️";
    }
  };

  const getErrorColor = () => {
    switch (error.type) {
      case ErrorType.AUTH:
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case ErrorType.NETWORK:
        return "text-blue-600 bg-blue-50 border-blue-200";
      default:
        return "text-red-600 bg-red-50 border-red-200";
    }
  };

  return (
    <div className={`rounded-lg border p-4 ${getErrorColor()} ${className}`}>
      <div className="flex items-start space-x-3">
        <span className="text-2xl">{getErrorIcon()}</span>
        <div className="flex-1">
          <h3 className="font-medium mb-1">
            {error.type === ErrorType.AUTH ? 'Authentication Required' : 'Error Occurred'}
          </h3>
          <p className="text-sm mb-3">{error.userMessage}</p>
          
          {showRetry && error.retryable && onRetry && (
            <Button
              onClick={onRetry}
              size="sm"
              variant="outline"
              className="text-xs"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Try Again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
