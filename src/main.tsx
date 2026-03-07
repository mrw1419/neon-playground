// This file serves as the entry point for the Neon Playground application, rendering the main App component which includes the game canvas and control panel. It also sets up error handling and a loading state for better user experience during initialization.

import React from "react";
import ReactDOM from "react-dom/client";
import { startPlayground } from './game/playground/startPlayground';

// Start the Playground game and get cleanup function
const stopPlayground = startPlayground();
window.addEventListener("beforeunload", () => {
  stopPlayground();
});
