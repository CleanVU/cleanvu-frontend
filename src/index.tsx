import Router from "./router/router.tsx";
import { NavigationProvider } from "./context/navigation.context.tsx";
import { RequestProvider } from "./context/request.context.tsx";
import { UserProvider } from "./context/user.context.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClerkProvider } from "@clerk/clerk-react";

const theme = createTheme({
  fontFamily: "Poppins, sans-serif",
  colors: {},
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme}>
          <UserProvider>
            <NavigationProvider>
              <RequestProvider>
                <Router />
              </RequestProvider>
            </NavigationProvider>
          </UserProvider>
        </MantineProvider>
      </QueryClientProvider>
    </ClerkProvider>
  </React.StrictMode>,
);
