import { useQuery } from "@tanstack/react-query";
import { fetchAllMatchesOverview, MatchOverview } from "./api";
import { WORLDS } from "./data/worlds";

function selectWorldIds(matches: MatchOverview[]) {
  return matches
    .sort((a, b) => a.id.localeCompare(b.id))
    .flatMap((match) =>
      Object.values(match.all_worlds)
        .flat()
        .filter((id) => id.toString().length === 5),
    );
}

function App() {
  const { data: worldIds } = useQuery({
    queryKey: ["matches"],
    queryFn: fetchAllMatchesOverview,
    select: selectWorldIds,
  });

  return (
    <div>
      <h1 className="text-5xl font-bold">GW2 WvW</h1>
      <ul>{worldIds?.map((id) => <li key={id}>{WORLDS[id].en}</li>)}</ul>
    </div>
  );
}

export default App;
