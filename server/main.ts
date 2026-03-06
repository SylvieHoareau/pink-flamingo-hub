Deno.serve((req: Request) => {
  const url = new URL(req.url);
  
  // Préparation des headers CORS
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*", // En prod, on mettrait l'URL précise du client
  };

  if (url.pathname === "/api/flamingos") {
    const data = [
      { id: 1, name: "Flamant Rose", scientificName: "Phoenicopterus roseus" }
    ];
    return new Response(JSON.stringify(data), { headers });
  }

  return new Response("Not Found", { status: 404, headers });
});

// Fonction pour calculer l'envergure moyenne (exemple scientifique)
export function calculateAverageWingspan(min: number, max: number): number {
  return (min + max) / 2;
}