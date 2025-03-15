import * as v from "valibot";
import {
  Match,
  MatchOverview,
  MatchOverviewSchema,
  MatchSchema,
  World,
  WorldSchema,
} from "./schemas";

const API_URL = "https://api.guildwars2.com/v2";

export async function fetchWorlds(): Promise<World[]> {
  const response = await fetch(`${API_URL}/worlds?ids=all&lang=en`);
  if (!response.ok) {
    throw new Error(`Failed to fetch worlds: ${response.status}`);
  }
  const data = await response.json();
  return v.parse(v.array(WorldSchema), data);
}

export async function fetchMatches(): Promise<Match[]> {
  const response = await fetch(`${API_URL}/wvw/matches?ids=all`);
  if (!response.ok) {
    throw new Error(`Failed to fetch matches: ${response.status}`);
  }
  const data = await response.json();
  return v.parse(v.array(MatchSchema), data);
}

export async function fetchAllMatchesOverview(): Promise<MatchOverview[]> {
  const response = await fetch(`${API_URL}/wvw/matches/overview?ids=all`);
  if (!response.ok) {
    throw new Error(`Failed to fetch all matches overview: ${response.status}`);
  }
  const data = await response.json();
  return v.parse(v.array(MatchOverviewSchema), data);
}
