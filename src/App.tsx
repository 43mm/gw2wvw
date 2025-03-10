import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1 className="text-5xl font-bold">GW2 WvW</h1>
      </div>
    </QueryClientProvider>
  );
}

export default App;
