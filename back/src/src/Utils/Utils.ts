import { Response } from "express";

// Mettre la première lettre en majuscule
export function capitalizeFirstLetter(string: string) {
    if (!string)
        return string;
    string = string.toLowerCase();
    return string[0].toUpperCase() + string.slice(1);
}

// Changement du format de la date
export const changeDateFormat = (date: Date): Date => {
    const dateString = date.toString();
    const dateParts = dateString.replace(/-/g, "/").split("/");
    const d = dateParts;
    const dat = new Date(d[2] + '/' + d[1] + '/' + d[0]);
    return dat;
}

// Conversion d'une string en date
export const convertDateStringToDate = (dateString: string): Date => {
    const dateParts = dateString.replace(/-/g, "/").split("/");
    const d = dateParts;
    const dat = new Date(d[2] + '/' + d[1] + '/' + d[0]);
    return dat;
}

// Verifier si un email est valide
export const checkEmail = (email: string): boolean => {
    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,10}$/;

    if (email.length < 5 || email.length > 50) {
        return false;
    }
    return re.test(email);
}

// Creation d'un objet de retour pour les requêtes
export const createRes = (code: number, message: string, res: Response) => {
    res.status(code).send({
        message: message,
        code: code
    });
}

// Retourne le nombre de jours entre deux dates
const dayDiff = (date1: Date, date2: Date) => {
    const d1 = changeDateFormat(date1).getTime() / 86400000;
    const d2 = changeDateFormat(date2).getTime() / 86400000;

    return Math.round(d2 - d1);
}

// Calculer le prix total en fonction de la date de début et de fin
export const calcPrice = (pricePerDay: number, startDate: Date | undefined, endDate: Date | undefined) => {
    if (startDate === undefined || endDate === undefined) {
        return pricePerDay;
    }
    let days = dayDiff(startDate, endDate);

    days += 1;
    return days * pricePerDay;
}