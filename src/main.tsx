import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/primereact.css";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routes/index.tsx";

import "primeicons/primeicons.css";

import "primeflex/primeflex.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <PrimeReactProvider>
    <RouterProvider router={router} />
  </PrimeReactProvider>
  // </StrictMode>
);
