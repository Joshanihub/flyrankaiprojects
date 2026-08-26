async function getHealthData() {
  const response = await fetch("https://httpbin.org/json", { cache: "no-store" });
  if (!response.ok) throw new Error("Health data could not be loaded.");
  return response.json();
}

export default async function HealthPage() {
  const data = await getHealthData();

  return (
    <main className="mx-auto min-h-[calc(100vh-74px)] w-full max-w-4xl px-6 py-16 lg:px-10">
      <p className="eyebrow">Diagnostics</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-[var(--ink)]">System health</h1>
      <div className="mt-8 border border-[#bfd5c2] bg-[#edf6ee] p-5 text-[#365340]">
        <p className="font-semibold">Application running</p>
        <p className="mt-1 text-sm">External data fetch: {data ? "OK" : "Failed"}</p>
      </div>
      <pre className="mt-6 max-h-72 overflow-auto bg-[#e8ebe5] p-5 text-xs leading-6 text-[var(--muted)]">
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}