# Projet Eco Bliss Bath
Eco Bliss Bath sort sa première version de site en ligne de vente de produits de beauté écoresponsables dont le produit principal est un savon solide.

## Installation
 
1. Installez Docker ;
2. Téléchargez le projet ; 
3. Ouvrez une fenêtre de terminal dans le dossier du projet ;
4. Lancez la commande sudo docker-compose up ;

Le site sera accessible à l'adresse `http://localhost:8080` dans votre navigateur.

## Tests
Les tests sont réalisés à l'aide de Cypress. Assurez-vous d'avoir bien installé Cypress sur votre machine.

## Installation Cypress via npm:
1. Ouvrez une fenêtre de terminal.
2. Déplacez-vous dans le répertoire racine de votre projet.
3. Exécutez la commande `npm init` pour initialiser votre projet.
4. Exécutez la commande `npm install cypress --save-dev` pour installer Cypress localement dans votre projet.

## open cypress 
`npx cypress open`

1. Cliquez sur le bouton E2E Testing.
2. Choisissez votre navigateur préféré
3. Une nouvelle fenêtre s’ouvre. Vous retrouvez la page des spécifications.
4. Choisissez l'option "Create new spec" pour créer une nouvelle spec.
5. Entrer le chemin de votre spec et cliquez sur "Create spec".
6. Vous pouvez céer les fichiers de test directement dans le dossier e2e.


## Exécuter les tests en ligne de commande
`npx cypress run`

## Génération du Rapport

1. Installer le paquet "mochawesome"
2. 
Pour générer un rapport détaillé des tests, exécutez la commande suivante :
`npm run cy:report`

Le rapport sera généré dans le dossier cypress/reports.


Ce README fournirait des instructions claires sur la façon d'installer le projet, de l'exécuter, d'exécuter les tests et de générer un rapport détaillé des tests à l'aide de Cypress.
