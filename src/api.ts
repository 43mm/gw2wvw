const API_URL = "https://api.guildwars2.com/v2";

export async function fetchWorlds(): Promise<any[]> {
  const response = await fetch(`${API_URL}/worlds?ids=all&lang=en&wiki=1`);
  if (!response.ok) {
    throw new Error(`Failed to fetch worlds: ${response.status}`);
  }
  const data = await response.json();

  return data;
}
