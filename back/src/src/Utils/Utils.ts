import { HttpStatus } from "@nestjs/common";
import { Response } from "express";

export function capitalizeFirstLetter(string: string) {
    string = string.toLowerCase();
    return string[0].toUpperCase() + string.slice(1);
}

export const changeDateFormat = (date: Date): Date => {
    let dateString = date.toString();
    var dateParts = dateString.replace(/-/g, "/").split("/");
    let d = dateParts;
    let dat = new Date(d[2] + '/' + d[1] + '/' + d[0]);
    return dat;
}

export const convertDateStringToDate = (dateString: string): Date => {
    var dateParts = dateString.replace(/-/g, "/").split("/");
    let d = dateParts;
    let dat = new Date(d[2] + '/' + d[1] + '/' + d[0]);
    return dat;
}

export const checkEmail = (email: string): boolean => {
    let re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,10}$/;

    if (email.length < 5 || email.length > 50) {
        return false;
    }
    return re.test(email);
}

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