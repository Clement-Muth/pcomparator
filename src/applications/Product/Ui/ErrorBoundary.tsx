import React from "react";
import { InvalidPayload } from "~/applications/Product/Domain/InvalidPayload";

type ErrorBoundaryProps = {
  children: React.ReactNode;
  renderOnInvalidPayload: () => React.ReactNode;
};

type ErrorBoundaryState = {
  error: InvalidPayload | undefined;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = { error: undefined };
  }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    if (error instanceof InvalidPayload) {
      return { error };
    }

    throw error;
  }

  render() {
    const { error } = this.state;

    if (error === undefined) {
      return this.props.children;
    }

    if (error instanceof InvalidPayload) {
      return this.props.renderOnInvalidPayload();
    }
  }
}

export default ErrorBoundary;
