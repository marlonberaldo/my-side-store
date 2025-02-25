export async function getData<T>(endpoint: string, options?: RequestInit): Promise<T> {
  if (!process.env.API_URL) {
    throw new Error("API_URL is not defined");
  }

  const initialOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  const adjustedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  const response = await fetch(`${process.env.API_URL}${adjustedEndpoint}`, initialOptions);

  if (!response.ok) {
    console.error(response);
    throw new Error("Failed to fetch data");
  }

  return response.json();
}