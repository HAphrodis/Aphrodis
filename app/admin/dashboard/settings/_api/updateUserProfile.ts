export async function updateUserProfile(
  userId: string,
  data: {
    name: string;
    email: string;
  },
) {
  const response = await fetch("/api/user/update-profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, ...data }),
  });

  if (!response.ok) {
    throw new Error("Failed to update user profile");
  }

  return response.json();
}
