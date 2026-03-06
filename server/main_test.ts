import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { calculateAverageWingspan } from "./main.ts";

Deno.test("Calcul de l'envergure moyenne des flamants", () => {
  const result = calculateAverageWingspan(240, 300);
  assertEquals(result, 270);
});