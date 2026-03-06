<script setup lang="ts">
import { ref, onMounted } from "vue";

// Interface pour le typage (Rigueur CDA !)
interface Flamingo {
  id: string;
  name: string;
  scientificName: string;
}

// pour le formulaire on n'a pas encore d'ID, on génère
// l'identifiant côté client au moment de l'envoi.
interface FlamingoForm {
  name: string;
  scientificName: string;
}

const flamingos = ref<Flamingo[]>([]);
const loading = ref(true);

const newFlamingo = ref<FlamingoForm>({ name: "", scientificName: "" });
const errorMessage = ref("");

const API_URL = "http://localhost:8000/api/flamingos";

// Fonction pour appeler l'API Deno
const fetchFlamingos = async () => {
  try {
    const response = await fetch(API_URL);
    flamingos.value = await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération :", error);
    errorMessage.value = "Impossible de joindre l'API.";
  } finally {
    loading.value = false;
  }
};

// 4. Logique métier : Ajouter un flamant (CREATE)
const addFlamingo = async () => {
  // Validation simple (Posture CDA : Ne jamais faire confiance à l'utilisateur)
  if (!newFlamingo.value.name || !newFlamingo.value.scientificName) {
    errorMessage.value = "Tous les champs sont obligatoires.";
    return;
  }

  // Construire le payload à envoyer à l'API
  const payload: Flamingo = {
      id: crypto.randomUUID(),
      ...newFlamingo.value,
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },     
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      newFlamingo.value = { name: "", scientificName: "" }; // Reset formulaire (pas d'id dans FlamingoForm)
      errorMessage.value = ""; // On efface l'erreur précédente
      await fetchFlamingos(); // Rafraîchir la liste
    }
  } catch (e) {
    errorMessage.value = "Erreur réseau : impossible d'ajouter le flamant.";
  }
};

// Hook de cycle de vie : on lance l'appel quand le composant est prêt
onMounted(() => {
  fetchFlamingos();
});
</script>

<template>
  <div class="app">
    <h1>🦩 Mon Atlas des Flamants</h1>

    <div v-if="loading">Chargement des données scientifiques...</div>

    <div v-else>
      <section class="form-section">
        <h3>Ajouter une espèce</h3>
        <input
          v-model="newFlamingo.name"
          placeholder="Nom (ex: Flamant Rose)"
        />
        <input
          v-model="newFlamingo.scientificName"
          placeholder="Nom scientifique"
        />
        <button @click="addFlamingo">Enregistrer</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </section>

      <section class="list-section">
        <div v-for="f in flamingos" :key="f.id" class="card">
          <h4>{{ f.name }}</h4>
          <p>
            <em>{{ f.scientificName }}</em>
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.app {
  font-family: sans-serif;
  padding: 2rem;
  color: #ff85a2;
}
li {
  list-style: none;
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.container {
  max-width: 600px;
  margin: auto;
  font-family: sans-serif;
}
.form-section {
  background: #fff0f3;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}
.card {
  border-left: 5px solid #ff85a2;
  padding: 10px;
  margin: 10px 0;
  background: #f9f9f9;
}
.error {
  color: red;
  font-weight: bold;
}
input {
  margin-right: 10px;
  padding: 5px;
}
button {
  background: #ff85a2;
  color: white;
  border: none;
  padding: 6px 12px;
  cursor: pointer;
}
</style>
