import dayjs, { Dayjs } from "dayjs";
import { Ireservation, Ivehicle } from "../Interfaces/Vehicle";

// Convertir une Date String en date
const convertDateStringToDate = (dateString: string): Date => {
    var dateParts = dateString.replaceAll("-", "/").split("/");
    let d = dateParts;
    let dat = new Date(d[2] + '/' + d[1] + '/' + d[0]);
    return dat;
}

// Savoir si une date est déjà réservée
const isInReservations = (reservations: Ireservation[], date: string) => {
    for (let i = 0; i < reservations.length; i++) {
        const reservation : Ireservation = reservations[i];
        if (isBetweenTwoDate(date, reservation.startDate, reservation.endDate)) {
            return true;
        }
    }
    return false;
}

// Savoir si une date est entre deux autres dates
const isBetweenTwoDate = (date: string, dateOne: string, dateTwo: string) => {
    let ndate = dayjs((convertDateStringToDate(date)));
    let ndateOne = dayjs((convertDateStringToDate(dateOne)));
    let ndateTwo = dayjs((convertDateStringToDate(dateTwo)));

    if (ndate >= ndateOne && ndate <= ndateTwo)
        return true;
    return false;
}

// Calculer le prix total en fonction de la date de début et de fin
const calcPrice = (pricePerDay: number, startDate: Dayjs | undefined, endDate: Dayjs | undefined) => {
    if (startDate === undefined || endDate === undefined) {
        return pricePerDay;
    }
    let days = endDate.diff(startDate, 'day');

    days += 1;
    return Math.abs(days * pricePerDay);
}

// Calculer le nombre de jours entre deux dates
const calcDays = (startDate: Dayjs | undefined, endDate: Dayjs | undefined) => {
    if (startDate === undefined || endDate === undefined) {
        return 0;
    }
    let days = endDate.diff(startDate, 'day');

    days += 1;
    return days;
}

export {convertDateStringToDate, isInReservations, isBetweenTwoDate, calcPrice, calcDays};