import { useQuery } from "@tanstack/react-query";
import { fetchWorlds } from "./api";

function App() {
  const { data: worlds, error } = useQuery({
    queryKey: ["worlds"],
    queryFn: fetchWorlds,
  });

  return (
    <div>
      <h1 className="text-5xl font-bold">GW2 WvW</h1>
      {error && <p>Error: {JSON.stringify(error)}</p>}
      <pre>{JSON.stringify(worlds, null, 2)}</pre>
    </div>
  );
}

export default App;
