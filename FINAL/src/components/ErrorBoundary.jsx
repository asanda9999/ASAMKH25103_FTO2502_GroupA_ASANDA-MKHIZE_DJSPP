import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    // State to track if an error has occurred
    this.state = { hasError: false };
  }

  // Update state when an error is thrown in a child component
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // Log error details (optional)
  componentDidCatch(error, errorInfo) {
    // You can log error info here if needed
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Show fallback UI if an error occurred
      return (
        <div style={{ padding: 40, textAlign: "center" }}>
          <h2>Something went wrong.</h2>
          <p>Try refreshing the page or come back later.</p>
        </div>
      );
    }
    // Render children if no error
    return this.props.children;
  }
} 