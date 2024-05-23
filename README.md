# Sportista - Projekat
Na projektu rade: Saida Saric, Lejla Garic, Ibrahim Lazovic, Damir Bajrami, Imran Djokic


# UPUTE ZA KOLEGE
Nakon kloniranja repo-a, otvoriti root directory u terminalu. Da biste preuzeli sve dependencies uraditi:



cd backend -> pip install -r requirements.txt



zatim cd ..



cd frontend -> npm install


# Za AdminPanel, ManagerPanel i UserPanel

otvori terminal

cd MenadzerProjekt
npm install
npm run dev

localhost:(broj koji se dodijeli)

zatvori terminal

Installing tailwind.config.js

in terminal, npm install tailwindcss autoprefixer

(npm install postcss postcss-cli)

npx tailwindcss init

create a new file in MenadzerProjekt called postcss.config.js, it contains this code:
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
};

create a new file index.css (if it doesn't already exist) with this code:
@tailwind base;
@tailwind components;
@tailwind utilities;

.card {
    @apply bg-white rounded overflow-hidden shadow-md relative hover:shadow-lg
}

.badge {
    @apply bg-gray-400 text-gray-100 text-xs uppercase font-bold rounded-full p-2 absolute top-0 ml-2 mt-2
}

.btn {
    @apply rounded-full py-2 px-3 uppercase text-xs font-bold cursor-pointer
}


u terminalu npm install react-icons

npm install react-router-dom
npm install recharts

