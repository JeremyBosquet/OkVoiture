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