const convertDateStringToDate = (dateString: string): Date => {
    var dateParts = dateString.replaceAll("-", "/").split("/");
    let d = dateParts;
    let dat = new Date(d[2] + '/' + d[1] + '/' + d[0]);
    return dat;
}

export default convertDateStringToDate;
