export function downloadAsTxt(text: string) {
  const blob = new Blob([text], { type: "text/plain" });
  const $a = document.createElement("a");
  $a.href = URL.createObjectURL(blob);
  $a.download = "resume";
  $a.click();
}
