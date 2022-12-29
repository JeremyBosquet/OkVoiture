import dayjs from "dayjs";
import { Ireservation, Ivehicle } from "../Interfaces/Vehicle";

const convertDateStringToDate = (dateString: string): Date => {
    var dateParts = dateString.replaceAll("-", "/").split("/");
    let d = dateParts;
    let dat = new Date(d[2] + '/' + d[1] + '/' + d[0]);
    return dat;
}

const isInReservations = (reservations: Ireservation[], date: string) => {
    for (let i = 0; i < reservations.length; i++) {
        const reservation : Ireservation = reservations[i];
        if (isBetweenTwoDate(date, reservation.startDate, reservation.endDate)) {
            return true;
        }
    }
    return false;
}

const isBetweenTwoDate = (date: string, dateOne: string, dateTwo: string) => {
    let ndate = dayjs((convertDateStringToDate(date)));
    let ndateOne = dayjs((convertDateStringToDate(dateOne)));
    let ndateTwo = dayjs((convertDateStringToDate(dateTwo)));

    if (ndate >= ndateOne && ndate <= ndateTwo)
        return true;
    return false;
}

export {convertDateStringToDate, isInReservations, isBetweenTwoDate};
