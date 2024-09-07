export async function fetchWeeklySlots(mentorId: string) {
  const response = await fetch(
    `https://live-merely-drum.ngrok-free.app/api/${mentorId}/slots`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}
