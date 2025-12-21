const API = process.env.NEXT_PUBLIC_API_BASE;

export async function apiGet(path: string) {
  const res = await fetch(`${API}${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error("API error");
  return res.json();
}

export async function apiPost(path: string, body: any) {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("API error");
  return res.json();
}
