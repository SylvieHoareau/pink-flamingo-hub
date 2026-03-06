# pink-flamingo-hub

# 🦩 Flamingo Atlas - Plateforme d'Étude des Flamants Roses

## 🎯 Présentation du projet
Flamingo Atlas est une application **Full Stack** destinée à centraliser les connaissances scientifiques sur les différentes espèces de flamants roses. L'application permet de visualiser des données géographiques, des statistiques démographiques et des fiches détaillées par espèce.

Ce projet est réalisé dans le cadre de ma progression vers le **Titre Professionnel Concepteur Développeur d'Applications (Niveau 6)**.

## 🛠️ Stack Technique
Pour ce projet, j'ai choisi une architecture découplée (Client-Serveur) :

- **Frontend :** [Vue3](https://vuejs.org/) (Composition API) - Pour une interface réactive et performante.
- **Backend :** [Deno](https://deno.land/) - Pour sa sécurité native et son support du TypeScript sans configuration.
- **Base de données :** PostgreSQL (ou MongoDB selon ton choix final) - Pour la persistance des données scientifiques.
- **Outils :** Git pour le versioning, [Leaflet.js] pour la cartographie.

## 🚀 Fonctionnalités (MVP)
- [ ] **Tableau de bord :** Statistiques mondiales sur les populations.
- [ ] **Carte interactive :** Visualisation des zones de nidification.
- [ ] **Fiches espèces :** Galerie photos et données biologiques (envergure, régime, etc.).
- [ ] **API REST :** Fourniture des données au format JSON.

## ⚙️ Installation (Development Mode)

### Prérequis
- Deno installé (v1.x ou +)
- Node.js (pour le tooling Vue3)

### Backend (Deno)
```bash
cd server
deno run --allow-net --allow-read main.ts
