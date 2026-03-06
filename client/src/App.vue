<script setup lang="ts">
import { ref, onMounted } from "vue";

// Interface pour le typage (Rigueur CDA !)
interface Flamingo {
  id: number;
  name: string;
  scientificName: string;
}

const flamingos = ref<Flamingo[]>([]);
const loading = ref(true);

// Fonction pour appeler l'API Deno
const fetchFlamingos = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/flamingos");
    flamingos.value = await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération :", error);
  } finally {
    loading.value = false;
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

    <ul v-else>
      <li v-for="f in flamingos" :key="f.id">
        <strong>{{ f.name }}</strong> (<em>{{ f.scientificName }}</em
        >)
      </li>
    </ul>
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
</style>
