# OkVoiture

# Installation

### Prerequis:
    - Docker
    - docker-compose
    - Port disponible : 3000 et 7000
    
### Mise en place du .env

    # =================================================
    # Creation de la base de données avec ces variables 
    # d'environnement et utilisation dans le back
    # =================================================
    
    # Utilisateur de la base de données
    POSTGRES_USER=NOM_DE_VOTRE_CHOIX (ex: postgres)
    
    # Mot de passe de l'utilisateur de la base de données
    POSTGRES_PASSWORD=MOT_DE_PASSE
    
    # Nom de la base de données
    POSTGRES_DB_NAME=NOM_DE_LA_BDD (ex: okvoiture)
    
    # =================================================
    #     Variables d'environnement pour le front 
    #
    #     Port: 3000
    # =================================================

    # NE PAS CHANGER LE PORT (7000)
    VITE_URL_API=http://localhost:7000 

    # =================================================
    #     Variables d'environnement pour le back
    #    (le back utilise les variables de la bdd)
    #    
    #     Port: 7000
    # =================================================
    
    # NE PAS TOUCHER
    # Actuellement: nom du docker de la base de données
    DB_HOST=postgres

    # METTRE UNE CLE SECRETE DE VOTRE CHOIX (ex: UpuosDFrT5LhaXBEDmjLih6GLsLGFeLw)
    # Permet de crypter les tokens JWT
    JWT_SECRET=SECRET_DE_VOTRE_CHOIX

### Demarrage

Un makefile est fourni afin de créer les fichiers/dossiers necessaires au fonctionnement de l'application.
Il est recommandé d'utiliser le makefile.

#### Avec makefile:

    make
    
### Sans makefile

    mkdir -p volumes/db/data
    docker-compose up -d --build
    
    
Vous avez désormer accès a l'application web depuis le port `3000` de la machine sur lequel vous avez suivi les instructions et également accès a l'api depuis le port `7000`.

/!\ Aller sur la page d'administration du site (url:3000/admin) afin de créer le compte administrateur.

# Tests (avec postman):

##### /!\ L'image est requise afin de poster une nouvelle location.

## Documentation de l'api (contient des tests): 
### https://documenter.getpostman.com/view/14578810/2s8Z6yVXeS
> Vous pouvez egalement importer le fichier `OkVoiture.postman_collection.json` afin de pouvoir faire des tests depuis celui ci.

![Image](https://i.postimg.cc/bwQTjYvh/image.png)