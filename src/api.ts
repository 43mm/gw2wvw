import * as v from "valibot";

const API_URL = "https://api.guildwars2.com/v2";

const WorldSchema = v.object({
  id: v.number(),
  name: v.string(),
  population: v.union([
    v.literal("Low"),
    v.literal("Medium"),
    v.literal("High"),
    v.literal("VeryHigh"),
    v.literal("Full"),
  ]),
});
type World = v.InferOutput<typeof WorldSchema>;

export async function fetchWorlds(): Promise<World[]> {
  const response = await fetch(`${API_URL}/worlds?ids=all&lang=en&wiki=1`);
  if (!response.ok) {
    throw new Error(`Failed to fetch worlds: ${response.status}`);
  }
  const data = await response.json();
  try {
    return v.parse(v.array(WorldSchema), data);
  } catch (error) {
    throw new Error(`Failed to parse worlds: ${error.message}`);
  }
}
