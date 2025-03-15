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
  const response = await fetch(`${API_URL}/worlds?ids=all&lang=en`);
  if (!response.ok) {
    throw new Error(`Failed to fetch worlds: ${response.status}`);
  }
  const data = await response.json();
  return v.parse(v.array(WorldSchema), data);
}

const TeamSchema = v.union([
  v.literal("Red"),
  v.literal("Blue"),
  v.literal("Green"),
]);

const CountSchema = v.object({
  red: v.number(),
  blue: v.number(),
  green: v.number(),
});

const MapTypeSchema = v.union([
  v.literal("Center"),
  v.literal("RedHome"),
  v.literal("BlueHome"),
  v.literal("GreenHome"),
]);

const SkirmishSchema = v.object({
  id: v.number(),
  scores: CountSchema,
  map_scores: v.array(
    v.object({
      type: MapTypeSchema,
      scores: CountSchema,
    }),
  ),
});

const MapSchema = v.object({
  id: v.number(),
  type: MapTypeSchema,
  scores: CountSchema,
  bonuses: v.array(
    v.object({
      type: v.literal("Bloodlust"),
      owner: TeamSchema,
    }),
  ),
  objectives: v.array(
    v.object({
      id: v.string(),
      type: v.union([
        v.literal("Spawn"),
        v.literal("Mercenary"),
        v.literal("Ruins"),
        v.literal("Camp"),
        v.literal("Tower"),
        v.literal("Keep"),
        v.literal("Castle"),
      ]),
      owner: TeamSchema,
      last_flipped: v.string(),
      claimed_by: v.nullish(v.string()),
      claimed_at: v.nullish(v.string()),
      points_tick: v.number(),
      points_capture: v.number(),
      yaks_delivered: v.optional(v.number()),
      guild_upgrades: v.optional(v.array(v.number())),
    }),
  ),
});

const MatchSchema = v.object({
  id: v.string(),
  start_time: v.string(),
  end_time: v.string(),
  scores: CountSchema,
  worlds: CountSchema,
  all_worlds: v.object({
    red: v.array(v.number()),
    blue: v.array(v.number()),
    green: v.array(v.number()),
  }),
  deaths: CountSchema,
  kills: CountSchema,
  victory_points: CountSchema,
  skirmishes: v.array(SkirmishSchema),
  maps: v.array(MapSchema),
});
type Match = v.InferOutput<typeof MatchSchema>;

export async function fetchMatches(): Promise<Match[]> {
  const response = await fetch(`${API_URL}/wvw/matches?ids=all`);
  if (!response.ok) {
    throw new Error(`Failed to fetch matches: ${response.status}`);
  }
  const data = await response.json();
  return v.parse(v.array(MatchSchema), data);
}
