# OkVoiture

US1:
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

Tests:

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