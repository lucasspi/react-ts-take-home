import { StrictMode } from "react";

import * as ReactDOMClient from "react-dom/client";
import { ChakraBaseProvider } from "@chakra-ui/react";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

const root = ReactDOMClient.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <ChakraBaseProvider>
      <App />
    </ChakraBaseProvider>
  </StrictMode>
);

reportWebVitals();
