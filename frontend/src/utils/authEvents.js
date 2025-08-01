// Custom event for authentication changes
export const dispatchAuthEvent = () => {
  // Create and dispatch a custom event
  const authEvent = new Event('authChange');
  window.dispatchEvent(authEvent);
};
