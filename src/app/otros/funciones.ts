

/**
 * Formatear una fecha en el formato YYYY-MM-DD
 * @param date la fecha a formatear
 */
export function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

export function getHora(date){
    let h = new Date(date),
        hour = ' ' + (h.getHours()),
        min = '' + (h.getMinutes()),
        sec = '' + (h.getSeconds());
    if(hour.length < 2) hour = '0' + hour;
    if(min.length < 2) min = '0' + min;
    if(sec.length < 2) sec = '0' + sec;
    return [hour, min, sec].join(':');
}