import React from "react";

function ErrorHandler({ error }) {
  return (
    <div className="error-container">
      <h2>Error</h2>
      <p>{error}</p>
    </div>
  );
}

export default ErrorHandler;
