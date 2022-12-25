# OkVoiture

## US1:

    Prerequis:
        Docker pour la base de données
        docker-compose
        pnpm
        ViteJS


    Base de données: PostgreSQL
        Setup:
            Creer un .env contenant ces variables d'environnements (.env):
                POSTGRES_USER=
                POSTGRES_PASSWORD=
                POSTGRES_DB=
            mkdir ./volumes && mkdir ./volumes/db
            docker-compose up -d


    Front:
        Créer un .env contenant ces variables d'environnements (front/.env):
            VITE_URL_API=http://your_api_url:3000

        Pour lancer le front en developpement:
            cd front
            pnpm install
            pnpm run dev


    Back:
        Créer un .env contenant ces variables d'environnements (back/.env):
            DB_HOST=
            DB_NAME=
            DB_USER=
            DB_PASS=
            DB_PORT=

        Pour lancer le back en developpement:
            cd back
            pnpm install
            pnpm run start:dev

## Test postman:

###     POST http://url_api:3000/api/v1/location
####     Body -> form-data (coller):
    
    [{"key":"firstName","value":"Jeremy","type":"text","enabled":true},{"key":"email","value":"professionnel@bosquetjeremy.fr","type":"text","enabled":true},{"key":"carBrand","value":"Chevrolet","type":"text","enabled":true},{"key":"carModel","value":"Aveo","type":"text","enabled":true},{"key":"carYear","value":"2012","type":"text","enabled":true},{"key":"town","value":"Papeete","type":"text","enabled":true},{"key":"startDate","value":"25-12-2022","type":"text","enabled":true},{"key":"endDate","value":"26-12-2022","type":"text","enabled":true},{"key":"pricePerDay","value":"100","type":"text","enabled":true},{"key":"image","type":"file","enabled":true,"value":[]}]


## API Reference:

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