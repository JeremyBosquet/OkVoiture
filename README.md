# OkVoiture

# Installation

### Prerequis:
    - Docker
    - docker-compose
    
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

    # NE PAS CHANGER LE PORT
    VITE_URL_API=http://localhost:7000 

    # =================================================
    #     Variables d'environnement pour le back
    #    (le back utilise les variables de la bdd)
    #    
    #     Port: 7000
    # =================================================
    
    # NE PAS TOUCHER
    # Actuellement: nom du docker de la base de donneées
    DB_HOST=postgres

### Demarrage

Un makefile est fourni afin de créer les fichiers/dossiers necessaires au fonctionnement de l'application.
Il est recommandé d'utiliser le makefile.

#### Avec makefile:

    make
    
### Sans makefile

    mkdir -p volumes/db/data
    docker-compose up -d --build
    
    
Vous avez désormer accès a l'application web depuis le port `3000` de la machine sur lequel vous avez suivi les instructions et également accès a l'api depuis le port `7000`.
# Tests (avec postman):

###     POST http://url_api:3000/api/v1/location
####     Body -> form-data (copier/coller les valeurs ci-dessous):
Tout les champs ci-dessous sont requis afin de créer une nouvelle location, ici ils sont presque déjà presque tous pré-rempli avec un exemple mise à part "image", où vous devez ajouter une image au format (png/jpg/jpeg). 

    [{"key":"firstName","value":"Jeremy","type":"text","enabled":true},{"key":"email","value":"professionnel@bosquetjeremy.fr","type":"text","enabled":true},{"key":"carBrand","value":"Chevrolet","type":"text","enabled":true},{"key":"carModel","value":"Aveo","type":"text","enabled":true},{"key":"carYear","value":"2012","type":"text","enabled":true},{"key":"town","value":"Papeete","type":"text","enabled":true},{"key":"startDate","value":"25-12-2022","type":"text","enabled":true},{"key":"endDate","value":"26-12-2022","type":"text","enabled":true},{"key":"pricePerDay","value":"100","type":"text","enabled":true},{"key":"image","type":"file","enabled":true,"value":[]}]


# API Reference:

    Nouvelle location : 
        POST /api/v1/location/ 
            data: {
                firstName: string;
                email: string;
                carBrand: string;
                carModel: string;
                carYear: number;
                town: string;
                startDate: Date;
                endDate: Date;
                pricePerDay: number;
                image: Express.Multer.File;
            }

    Recuperer toutes les locations:
        GET /api/v1/location/all

    Recuperer une location:
        GET /api/v1/location/:id

    Recuperer l'image d'une location:
        GET /api/v1/location/image/:id d'une location