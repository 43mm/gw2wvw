import * as v from "valibot";
import { WorldSchema, MatchSchema, MatchOverviewSchema } from "./schemas";

const API_URL = "https://api.guildwars2.com/v2";

type World = v.InferOutput<typeof WorldSchema>;

export async function fetchWorlds(): Promise<World[]> {
  const response = await fetch(`${API_URL}/worlds?ids=all&lang=en`);
  if (!response.ok) {
    throw new Error(`Failed to fetch worlds: ${response.status}`);
  }
  const data = await response.json();
  return v.parse(v.array(WorldSchema), data);
}

type Match = v.InferOutput<typeof MatchSchema>;

export async function fetchMatches(): Promise<Match[]> {
  const response = await fetch(`${API_URL}/wvw/matches?ids=all`);
  if (!response.ok) {
    throw new Error(`Failed to fetch matches: ${response.status}`);
  }
  const data = await response.json();
  return v.parse(v.array(MatchSchema), data);
}

export type MatchOverview = v.InferOutput<typeof MatchOverviewSchema>;

export async function fetchAllMatchesOverview(): Promise<MatchOverview[]> {
  const response = await fetch(`${API_URL}/wvw/matches/overview?ids=all`);
  if (!response.ok) {
    throw new Error(`Failed to fetch all matches overview: ${response.status}`);
  }
  const data = await response.json();
  return v.parse(v.array(MatchOverviewSchema), data);
}
