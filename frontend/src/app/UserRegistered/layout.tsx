"use client";
import { ReactNode, useEffect, useState, useCallback } from "react";
import Header from "../layout/Header";
import { Toaster } from "@/components/ui/toaster";
import { useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import TriangleLoader from "../Components/Loader";
import { useRegistrationStatus } from "@/hooks/useUser";
import { toast } from "@/hooks/use-toast";
import { ErrorBoundary, ErrorDisplay } from "@/components/ErrorBoundary";
import { ClassifiedError, classifyError, ErrorType } from "@/utils/errorHandling";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertCircle } from "lucide-react";

export default function UserRegisteredLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [hasHandledRedirect, setHasHandledRedirect] = useState(false);
  const user = useUser();

  // Store user ID in session storage
  const userId = user?.id;
  if (userId !== undefined) {
    sessionStorage.setItem("userStackId", userId);
  }

  // Use the enhanced registration status hook
  const {
    isRegistered,
    isLoading,
    error,
    retry,
    reset,
    retryCount,
  } = useRegistrationStatus({
    enabled: true,
    onSuccess: (data) => {
      if (data.isRegistered && !hasHandledRedirect) {
        console.log("Redirecting from onSuccess...");
        setHasHandledRedirect(true);
        router.push("/dashboard");
      }
    },
    onError: (error) => {
      if (error.type === ErrorType.AUTH && !hasHandledRedirect) {
        console.log("Redirecting from onError...");
        setHasHandledRedirect(true);
        router.push("/");
      }
    },
  });

  const errorInfo = error ? classifyError(error) : null;

  // This useEffect handles fallback redirection after the component has rendered.
  useEffect(() => {
    // If loading is finished, there's no error, and the user is registered, redirect.
    if (!isLoading && !error && isRegistered && !hasHandledRedirect) {
      setHasHandledRedirect(true);
      router.push("/dashboard");
    }
  }, [isLoading, error, isRegistered, router, hasHandledRedirect]);

  // Manual retry handler
  const handleRetry = useCallback(() => {
    toast({
      title: "Retrying...",
      description: "Checking registration status again.",
      variant: "default",
    });
    retry();
  }, [retry]);

  // Reset and try again
  const handleReset = useCallback(() => {
    setHasHandledRedirect(false);
    reset();
  }, [reset]);

  // Loading state
  if (isLoading) {
    return (
      <ErrorBoundary>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
          <TriangleLoader />
          <p className="mt-4 text-gray-600">Checking registration status...</p>
          {retryCount > 0 && (
            <p className="mt-2 text-sm text-gray-500">
              Attempt {retryCount + 1}...
            </p>
          )}
        </div>
        <Toaster />
      </ErrorBoundary>
    );
  }

  // Error state with retry options
  if (error && errorInfo) {
    // For auth errors, show a different UI
    if (errorInfo.type === ErrorType.AUTH) {
      return (
        <ErrorBoundary>
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
              <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-xl font-semibold text-gray-900 mb-2">
                Authentication Required
              </h1>
              <p className="text-gray-600 mb-6">
                Your session has expired. Please log in again to continue.
              </p>
              <Button 
                onClick={() => router.push("/")}
                className="w-full"
              >
                Go to Login
              </Button>
            </div>
          </div>
          <Toaster />
        </ErrorBoundary>
      );
    }

    // For other errors, show retry options
    const canRetry = errorInfo?.retryable && retryCount < 3;

    return (
      <ErrorBoundary>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="max-w-md w-full">
            <ErrorDisplay 
              error={error as ClassifiedError}
              onRetry={canRetry ? handleRetry : undefined}
              showRetry={canRetry}
              className="mb-4"
            />
            
            <div className="bg-white rounded-lg shadow p-4 space-y-3">
              <h3 className="font-medium text-gray-900">What you can do:</h3>
              
              <div className="space-y-2">
                {canRetry && (
                  <Button 
                    onClick={handleRetry}
                    variant="outline"
                    size="sm"
                    className="w-full"
                    disabled={isLoading}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                )}
                
                <Button 
                  onClick={handleReset}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  Reset and Retry
                </Button>
                
                <Button 
                  onClick={() => router.push("/")}
                  variant="ghost"
                  size="sm"
                  className="w-full"
                >
                  Go to Home
                </Button>
              </div>
              
              {retryCount > 0 && (
                <p className="text-xs text-gray-500 text-center">
                  Failed attempts: {retryCount}
                </p>
              )}
            </div>
          </div>
        </div>
        <Toaster />
      </ErrorBoundary>
    );
  }

  // Render children if user is not yet registered, allowing them to see the registration form.
  // If all other conditions fail, this acts as the default render.
  return (
    <ErrorBoundary>
      <Header userRegister={true} />
      <main>{children}</main>
      <Toaster />
    </ErrorBoundary>
  );
}
