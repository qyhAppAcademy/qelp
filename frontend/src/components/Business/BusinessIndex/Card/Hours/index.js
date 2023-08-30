const OFFSET = 5;

const toLocalTime = (timeString, offset) => {
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

const isOpen = (business) => {
    const open = new Date(business.open).getUTCHours();
    const close = new Date(business.close).getUTCHours();
    const now = new Date(Date().toLocaleString("en-US")).getUTCHours();
    console.log(`open: ${open}`);
    console.log(`close: ${close}`);
    console.log(`now: ${open}`);

    if (open === close) {
        return true;
    }

    if (now === open) {
        return true;
    }

    if (now === close) {
        return false;
    }

    if (now > open) {
        if (close > open) {
            return now < close;
        }
        else {
            close += 24;
            return now < close;
        }
    }
    else {
        now += 24
        if (close > open) {
            return false;
        }
        else {
            close += 24;
            return now < close;
        }
    }
}

const Hours = ({ business }) => {
    const status = isOpen(business) ? "open" : "closed";

    return (
        <div>
            <span className={`hours ${status}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
            <span style={{ fontWeight: "300" }}>
                until {toLocalTime(status === "open" ?
                business.close : business.open, OFFSET)}
            </span>
        </div>
    );
}

export default Hours;