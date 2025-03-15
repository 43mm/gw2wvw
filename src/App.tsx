import { useQuery } from "@tanstack/react-query";
import { fetchAllMatchesOverview } from "./api";

function App() {
  const { data: matches } = useQuery({
    queryKey: ["matches"],
    queryFn: fetchAllMatchesOverview,
  });

  return (
    <div>
      <h1 className="text-5xl font-bold">GW2 WvW</h1>
      <pre>{JSON.stringify(matches, null, 2)}</pre>
    </div>
  );
}

export default App;
