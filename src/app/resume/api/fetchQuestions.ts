export async function fetchQuestions() {
  const response = await fetch("/api/questions");
  if (!response.ok) {
    throw new Error("Failed to fetch questions");
  }
  return response.json();
}
