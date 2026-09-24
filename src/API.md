# API MiamMiam

## POST /auth/login
- Description : cree un utilisateur 
- Body : Utilisateur crée
- Réponses :
  - 401 : non authentifié
  - Body : Utilisateur crée avec son id
  - 200 : Succès

##   GET /recipes
- Descrption : Recupères toutes les recettes
- Paramètres :
   - categoryId (query) : Liste des recettes donc la category est celle recherchée
   - search=string (query) : Liste des recttes contenant chocolat
   - ingredient=oeuf (query) : Liste des recttes avec des oeufs dans leur   ingrédients
   - maxPrepTime=20 (query) : Liste des recttes donc le Maxtime vaut 20 min
   - authordId=3 (query) : Liste des recttes avec les authors d'Id 3
- Réponses : 
   - 200 :Succés
   - Body : Liste de toutes les recettes

##  GET /recipes/:id
- Description : Liste la rectte existante
- Parametres :
  - id (path) : Id de la rectte à lister
- Réponses :
  - 400 : Bad request
  - 404 : Recette non trouvée
  - 200 : Succès
  - Body : Liste de la recette donc l'id est précisé

## POST /recipes
- Description :  crée une nouvelle recette
- Body : Nouvelle recette à créer
- Réponses :
   - 201 : Recette créee
   - Body : Recette créee avec son ID
   - 409 : Une recette avec le même titre existe déjà

## PUT /recipes/:id
- Description : Met à jour une recette existante
- Boby : Recette à mettre à jour
- Paramètres :
 - id (path) : ID de la recette à mettre à jour 
- Réponses :
  - 204 : Recette mise à jour
  - 404 : Recette non trouvée 

## DELETE /recipes/:id
- Description :   Suprime une recette existante
- Authentification: JWT
  - Utilisateurs administrateurs
- Paramètres :
  - id (path) : ID de la recette à supprimer
- Réponses :
  - 204 :     