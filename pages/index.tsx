import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error, mutate } = useSWR("/api/volume", fetcher);
  const { data: isMutedData, mutate: mutateIsMuted } = useSWR(
    "/api/is_muted",
    fetcher
  );
  const volume = data?.message;
  const isMuted = isMutedData?.status === "true";
  function handleUp() {
    fetch("/api/volume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newVolume: parseInt(volume) + 10 }),
    }).then((_) => mutate());
  }
  function handleDown() {
    fetch("/api/volume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newVolume: parseInt(volume) - 10 }),
    }).then((_) => mutate());
  }
  return (
    <main className="max-w-sm mx-auto py-8 px-4">
      {error && <pre className="text-red-800">{error}</pre>}
      <h1 className="text-3xl font-bold">Vol: {volume}</h1>{" "}
      <div className="flex flex-col gap-y-8 mt-8">
        <button
          className="block px-8 py-8 bg-gray-900 hover:bg-gray-600"
          onClick={handleUp}
        >
          +
        </button>
        <button
          className="block px-8 py-8 bg-gray-900 hover:bg-gray-600"
          onClick={handleDown}
        >
          -
        </button>
        <button
          className="block px-8 py-8 bg-gray-900 hover:bg-gray-600"
          onClick={() => {
            if (isMuted) {
              fetch("/api/unmute").then((_) => mutateIsMuted());
            } else {
              fetch("/api/mute").then((_) => mutateIsMuted());
            }
          }}
        >
          {isMuted ? "Unmute" : "Mute"}
        </button>
      </div>
    </main>
  );
}
