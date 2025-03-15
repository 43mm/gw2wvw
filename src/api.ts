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

type MatchOverview = v.InferOutput<typeof MatchOverviewSchema>;

export async function fetchAllMatchesOverview(): Promise<MatchOverview[]> {
  const response = await fetch(
    `${API_URL}/wvw/matches/overview?ids=1-1,1-2,1-3,1-4,1-5,2-1,2-2,2-3,2-4,2-5`,
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch match overview: ${response.status}`);
  }
  const data = await response.json();
  return v.parse(v.array(MatchOverviewSchema), data);
}
