import * as v from "valibot";

export const WorldSchema = v.object({
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

export const MatchSchema = v.object({
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

export const MatchOverviewSchema = v.object({
  id: v.string(),
  worlds: CountSchema,
  all_worlds: v.object({
    red: v.array(v.number()),
    blue: v.array(v.number()),
    green: v.array(v.number()),
  }),
  start_time: v.string(),
  end_time: v.string(),
});

export const MatchScoresSchema = v.object({
  id: v.string(),
  scores: CountSchema,
  victory_points: CountSchema,
  skirmishes: v.array(SkirmishSchema),
  maps: v.array(
    v.object({
      id: v.number(),
      type: MapTypeSchema,
      scores: CountSchema,
    }),
  ),
});

export const MatchStatsSchema = v.object({
  id: v.string(),
  deaths: CountSchema,
  kills: CountSchema,
  maps: v.array(
    v.object({
      id: v.number(),
      type: MapTypeSchema,
      deaths: CountSchema,
      kills: CountSchema,
    }),
  ),
});
