export const EST_OFFSET = 5;

export const convertToEst = (time) => {
    if (time < 0) {
        time += 24;
    }

    if (time === 12) {
        return "12:00 PM";
    }
    else if (time === 24 || time === 0) {
        return "12:00 AM";
    }
    else if (time < 12) {
        return `${time}:00 AM`;
    }
    else {
        return `${time % 12}:00 PM`;
    }
}

export const IsOpen = (business) => {
    const open = new Date(business.open);
    const close = new Date(business.close);
    const now = new Date(Date().toLocaleString("en-US"));

    let openHr = open.getUTCHours();
    let closeHr = close.getUTCHours() > openHr ? close.getUTCHours() : close.getUTCHours() + 24;
    let nowHr = now.getUTCHours();

    return nowHr >= openHr && nowHr < closeHr;
}