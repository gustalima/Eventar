import { Box, Button, Typography } from "@mui/material";
import React, { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by error boundary:", error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box
          sx={{
            p: 2,
            borderRadius: 1,
            border: 1,
            borderColor: (theme) =>
              theme.palette.mode === "dark" ? "red.800" : "red.200",
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "rgba(153,27,27,0.2)" : "red.50",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              component="svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              sx={{ width: 20, height: 20, color: "red.500" }}
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </Box>
            <Typography
              component="h3"
              variant="body2"
              sx={{
                color: (theme) =>
                  theme.palette.mode === "dark" ? "red.200" : "red.800",
              }}
            >
              Something went wrong
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{
              mt: 2,
              color: (theme) =>
                theme.palette.mode === "dark" ? "red.300" : "red.700",
            }}
          >
            {this.state.error?.message}
          </Typography>
          <Button
            variant="text"
            onClick={this.handleRetry}
            sx={{
              mt: 3,
              fontSize: "0.875rem",
              color: (theme) =>
                theme.palette.mode === "dark" ? "red.400" : "red.600",
              "&:hover": {
                color: (theme) =>
                  theme.palette.mode === "dark" ? "red.300" : "red.500",
              },
            }}
          >
            Try again
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return function WithErrorBoundary(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
}
