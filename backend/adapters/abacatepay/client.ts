import "server-only";

type AbacatePayResponse<T> =
  | { data: T; error: null }
  | { data: null; error: string };

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name} environment variable`);
  return value;
}

export async function abacatepayFetch<T>(
  path: string,
  options: Omit<RequestInit, "headers"> & { headers?: Record<string, string> } = {}
): Promise<T> {
  const apiKey = getRequiredEnv("ABACATEPAY_API_KEY");
  const baseUrl = "https://api.abacatepay.com/v1";
  const url = `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Agent": process.env.ABACATEPAY_USER_AGENT ?? "template-saas",
      ...(options.headers ?? {}),
    },
    cache: "no-store",
  });

  const json = (await res.json()) as AbacatePayResponse<T>;

  if (!res.ok) {
    throw new Error(`AbacatePay request failed (${res.status})`);
  }

  if (json.error) {
    throw new Error(json.error);
  }

  if (json.data === null) {
    throw new Error("AbacatePay response missing data");
  }

  return json.data;
}
