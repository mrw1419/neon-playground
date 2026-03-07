import React, { Component } from 'react';

// PlaygroundErrorBoundary: catches errors in child components and displays a fallback UI
export class PlaygroundErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean; error: any }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  componentDidCatch(error: any, errorInfo: any) {
    console.error("PlaygroundErrorBoundary caught error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <div style={{ color: 'red', padding: 16 }}>Error: {String(this.state.error)}</div>;
    }
    return this.props.children;
  }
}
