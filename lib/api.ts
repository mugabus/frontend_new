const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";


export async function getNonce() {
  const res = await fetch(`${BACKEND}/api/nonce`);
  if (!res.ok) throw new Error("Failed to fetch nonce");
  return res.json();
}

export async function verifySignature(message: string, signature: string) {
  const res = await fetch(`${BACKEND}/api/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, signature }),
  });
  return res.json();
}
