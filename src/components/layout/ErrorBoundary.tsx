import { Component } from 'react';
import type { ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }



  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
          <svg width="80" height="80" fill="none" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="40" fill="#f87171" />
            <path d="M28 52L52 28M28 28l24 24" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
          </svg>
          <h1 className="text-3xl font-bold mt-6 mb-2 text-red-600">Something went wrong</h1>
          <p className="text-neutral-600 dark:text-neutral-300 mb-4">An unexpected error occurred. Please try refreshing the page or contact support if the problem persists.</p>
          <pre className="bg-neutral-100 dark:bg-neutral-800 rounded p-4 text-xs text-left overflow-x-auto max-w-xl mx-auto">
            {this.state.error?.message}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
} 