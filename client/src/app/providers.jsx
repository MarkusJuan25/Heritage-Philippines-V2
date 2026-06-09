import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../services/queryClient.js";
import { JourneyProvider } from "../context/JourneyContext";

export default function AppProviders({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <JourneyProvider>{children}</JourneyProvider>
    </QueryClientProvider>
  );
}
