import { useQuery } from "@tanstack/react-query";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import { fetchAllMatchesOverview } from "./api";
import { WORLDS } from "./data/worlds";
import { MatchOverview } from "./schemas";

type Match = {
  red: number;
  blue: number;
  green: number;
  startTime: Date;
  endTime: Date;
};

function selectWorldIds(matches: MatchOverview[]): [Match[], Match[]] {
  const [na, eu] = [[], []] as [Match[], Match[]];
  for (const { id, all_worlds: w, start_time, end_time } of matches) {
    const Match = {
      red: Math.max(...w.red),
      blue: Math.max(...w.blue),
      green: Math.max(...w.green),
      startTime: parseISO(start_time),
      endTime: parseISO(end_time),
    };
    (id.startsWith("1") ? na : eu).push(Match);
  }
  return [na, eu];
}

function App() {
  const { data: matches, isLoading } = useQuery({
    queryKey: ["matches"],
    queryFn: fetchAllMatchesOverview,
    select: selectWorldIds,
  });

  if (isLoading) return <div>Loading...</div>;
  if (matches === undefined) return <div>Error...</div>;

  return (
    <div>
      <h1 className="text-5xl font-bold">GW2 WvW</h1>
      <h5 className="text-xl font-semibold">NA</h5>
      <div>
        From: {format(matches[0][0].startTime, "yyyy-MM-dd HH:mm")} (
        {formatDistanceToNow(matches[0][0].startTime, {
          addSuffix: true,
          includeSeconds: true,
        })}
        )
      </div>
      <div>
        To: {format(matches[0][0].endTime, "yyyy-MM-dd HH:mm")} (
        {formatDistanceToNow(matches[0][0].endTime, {
          addSuffix: true,
          includeSeconds: true,
        })}
        )
      </div>
      <div className="grid grid-cols-3 gap-2">
        {matches &&
          matches[0].map((match) => (
            <>
              <button>{WORLDS[match.red].en}</button>
              <button>{WORLDS[match.blue].en}</button>
              <button>{WORLDS[match.green].en}</button>
            </>
          ))}
      </div>
      <h5 className="text-xl font-semibold">EU</h5>
      <div>
        From: {format(matches[1][0].startTime, "yyyy-MM-dd HH:mm")} (
        {formatDistanceToNow(matches[0][0].startTime, {
          addSuffix: true,
          includeSeconds: true,
        })}
        )
      </div>
      <div>
        To: {format(matches[1][0].endTime, "yyyy-MM-dd HH:mm")} (
        {formatDistanceToNow(matches[0][0].endTime, {
          addSuffix: true,
          includeSeconds: true,
        })}
        )
      </div>
      <div className="grid grid-cols-3 gap-2">
        {matches &&
          matches[1].map((match) => (
            <>
              <button>{WORLDS[match.red].en}</button>
              <button>{WORLDS[match.blue].en}</button>
              <button>{WORLDS[match.green].en}</button>
            </>
          ))}
      </div>
    </div>
  );
}

export default App;
