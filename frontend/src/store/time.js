export const EST_OFFSET = 5;

export const toLocalTime = (timeString, offset) => {
    const datetime = new Date(timeString);
    let localTime = datetime.getUTCHours() - offset;

    if (localTime < 0) {
        localTime += 24;
    }

    if (localTime === 12) {
        return "12:00 PM";
    }
    else if (localTime === 24 || localTime === 0) {
        return "12:00 AM";
    }
    else if (localTime < 12) {
        return `${localTime}:00 AM`;
    }
    else {
        return `${localTime % 12}:00 PM`;
    }
}

export const isOpen = (business) => {
    const open = new Date(business.open);
    const close = new Date(business.close);
    const now = new Date(Date().toLocaleString("en-US"));

    let openHr = open.getUTCHours();
    let closeHr = close.getUTCHours();
    let nowHr = now.getUTCHours();

    if (openHr === closeHr) {
        return true;
    }

    if (nowHr === openHr) {
        return true;
    }

    if (nowHr === closeHr) {
        return false;
    }

    if (nowHr > openHr) {
        if (closeHr > openHr){
            return nowHr < closeHr;
        }
        else {
            closeHr += 24;
            return nowHr < closeHr;
        }
    }
    else {
        nowHr += 24
        if (closeHr > openHr) {
            return false;
        }
        else {
            closeHr += 24;
            return nowHr < closeHr;
        }
    }
}