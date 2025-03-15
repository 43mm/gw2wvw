import { useQuery } from "@tanstack/react-query";
import { fetchAllMatchesOverview } from "./api";
import { WORLDS } from "./data/worlds";
import { MatchOverview, TeamCount } from "./schemas";

function selectWorldIds(matches: MatchOverview[]): [TeamCount[], TeamCount[]] {
  const [na, eu] = [[], []] as [TeamCount[], TeamCount[]];
  for (const { id, all_worlds: w } of matches) {
    const team = {
      red: Math.max(...w.red),
      blue: Math.max(...w.blue),
      green: Math.max(...w.green),
    };
    (id.startsWith("1") ? na : eu).push(team);
  }
  return [na, eu];
}

function App() {
  const { data: matches } = useQuery({
    queryKey: ["matches"],
    queryFn: fetchAllMatchesOverview,
    select: selectWorldIds,
  });

  return (
    <div>
      <h1 className="text-5xl font-bold">GW2 WvW</h1>
      <h5 className="text-xl font-semibold">NA</h5>
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
