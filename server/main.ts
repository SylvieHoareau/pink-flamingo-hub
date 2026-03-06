// Initialisation de la base de données
const kv = await Deno.openKv();

// Fonction pour calculer l'envergure moyenne (exemple scientifique)
export function calculateAverageWingspan(min: number, max: number): number {
    return (min + max) / 2;
}

async function saveFlamingo(id: string, name: string, scientificName: string) {
    const key = ["flamingos", id];
    const value = { name, scientificName, updatedAt: new Date() };
    
    // Enregistrement du flamant rose dans la base de données
    await kv.set(key, value); 
}

Deno.serve(async (req: Request) => {
    const url = new URL(req.url);
    
    // Préparation des headers CORS
    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // En prod, on mettrait l'URL précise du client
    };

    // Endpoint pour ajouter un flamant rose
    if (url.pathname === "/api/flamingos" && req.method === "POST") {
        const { id, name, scientificName } = await req.json();
        await saveFlamingo(id, name, scientificName);
        return new Response("Flamingo saved", { headers });
    }

    // Endpoint pour récupérer la liste des flamants roses
    if (url.pathname === "/api/flamingos" && req.method === "GET") {
    const list = kv.list({ prefix: ["flamingos"] });
        const flamingos = [];
        for await (const res of list) {
        flamingos.push(res.value);
        }
        return Response.json(flamingos, { headers });
    }

    // Endpoint pour récupérer un flamant rose par ID
    if (url.pathname.startsWith("/api/flamingos/") && req.method === "GET") {
        const id = url.pathname.split("/").pop()!;
        const key = ["flamingos", id];
        const result = await kv.get(key);
        if (result.value) {
        return Response.json(result.value, { headers });
        } else {
        return new Response("Flamingo not found", { status: 404, headers });
        }
    }

    // Endpoint pour mettre à jour un flamant rose
    if (url.pathname.startsWith("/api/flamingos/") && req.method === "PUT") {
        const id = url.pathname.split("/").pop()!;
        const { name, scientificName } = await req.json();
        const key = ["flamingos", id];
        const result = await kv.get(key);
        if (result.value) {
            const updatedValue = { ...result.value, name, scientificName, updatedAt: new Date() };
            await kv.set(key, updatedValue);
            return new Response("Flamingo updated", { headers });
        }

        return new Response("Flamingo not found", { status: 404, headers });
    }   

    // Endpoint pour supprimer un flamant rose
    if (url.pathname.startsWith("/api/flamingos/") && req.method === "DELETE") {
        const id = url.pathname.split("/").pop()!;
        const key = ["flamingos", id];
        const result = await kv.get(key);
        if (result.value) {
            await kv.delete(key);
            return new Response("Flamingo deleted", { headers });
        }

        return new Response("Flamingo not found", { status: 404, headers });
    }   

  // Endpoint pour calculer l'envergure moyenne
  if (url.pathname === "/api/average-wingspan" && req.method === "GET") {
    const min = parseFloat(url.searchParams.get("min") || "0");
    const max = parseFloat(url.searchParams.get("max") || "0");
    const average = calculateAverageWingspan(min, max);
    return Response.json({ average }, { headers });
  }

  // Si l'endpoint n'est pas trouvé, on retourne une 404
  return new Response("Not Found", { status: 404, headers });

});




