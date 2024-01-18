# Utiliser une image Node.js comme base
FROM node:20.10.0-alpine
RUN apk add --no-cache tzdata
# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier package.json et package-lock.json (si existant)
COPY package.json ./

# Installer les dépendances
RUN npm install

# Commande par défaut pour démarrer l'application
CMD ["npm", "run", "dev"]