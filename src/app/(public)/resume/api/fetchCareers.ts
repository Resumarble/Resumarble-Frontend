export async function fetchCareers() {
  const response = await fetch("/api/career");
  if (!response.ok) {
    throw new Error("Failed to fetch careers");
  }
  return response.json();
}
