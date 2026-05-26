import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../services/queryClient.js";

export default function AppProviders({ children }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
