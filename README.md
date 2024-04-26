# Projet Eco Bliss Bath

Eco Bliss Bath sort sa première version de site en ligne de vente de produits de beauté écoresponsables dont le produit principal est un savon solide.

## Installation

1. Installez Docker ;
2. Téléchargez le projet ;
3. Ouvrez une fenêtre de terminal dans le dossier du projet ;
4. Lancez la commande sudo docker-compose up ;

Le site sera accessible à l'adresse `http://localhost:8080` dans votre navigateur.

## Tests

Les tests sont réalisés à l'aide de Cypress.

## Installation Cypress via npm:

1. Ouvrez une fenêtre de terminal.
2. Déplacez-vous dans le répertoire racine de votre projet.
3. Exécutez `npm init` pour initialiser votre projet.
4. Exécutez `npm install cypress --save-dev` pour installer Cypress localement dans votre projet.

## Open cypress

`npx cypress open`

1. Cliquez sur le bouton E2E Testing.
2. Choisissez votre navigateur préféré
3. Suivez les instructions pour "Create new spec"
4. Vous pouvez céer les fichiers de test directement dans le dossier e2e.

## Exécuter les tests en ligne de commande

`npx cypress run`

## Génération du Rapport

1. Installez le pluging de reporting "Mochawesome" avec :
   `npm install --save-dev mochawesome`
2. Ajoutez une commande de script dans votre fichier package.json pour exécuter vos tests Cypress avec le reporter Mochawesome.
   "scripts": {
   "cy:report": "cypress run --reporter mochawesome"
   }

3. Exécutez vos tests Cypress en utilisant la commande npm
   `npm run cy:report`
