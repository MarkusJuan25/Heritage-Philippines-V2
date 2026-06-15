import { apiClient } from "./apiClient";

export async function createQuoteRequest(payload) {
  const { data } = await apiClient.post("/quotes", payload);
  return data;
}
