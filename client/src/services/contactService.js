import { apiClient } from "./apiClient";

export async function createContactInquiry(payload) {
  const { data } = await apiClient.post("/contact", payload);
  return data;
}
