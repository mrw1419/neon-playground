import React from 'react';

interface PlaygroundErrorBoundaryProps {
  children: React.ReactNode;
}

interface PlaygroundErrorBoundaryState {
  hasError: boolean;
}

class PlaygroundErrorBoundary extends React.Component<PlaygroundErrorBoundaryProps, PlaygroundErrorBoundaryState> {
  constructor(props: PlaygroundErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(): PlaygroundErrorBoundaryState {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Optionally log error info
  }
  render() {
    if (this.state.hasError) {
      return <div style={{ color: 'red', padding: 24 }}>Something went wrong in PlaygroundScene.</div>;
    }
    return this.props.children;
  }
}

export default PlaygroundErrorBoundary;
