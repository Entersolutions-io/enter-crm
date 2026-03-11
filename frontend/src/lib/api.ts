const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

type FetchOptions = RequestInit & {
  token?: string;
};

export async function api<T = unknown>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const { token, headers, ...rest } = options;

  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...rest,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }

  return res.json();
}
