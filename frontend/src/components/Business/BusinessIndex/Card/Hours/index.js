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

const hoursStatus = (business) => {
    let open    = new Date(business.open).getUTCHours();
    let closed  = new Date(business.close).getUTCHours();
    let now     = new Date(Date().toLocaleString("en-US")).getUTCHours();

    if (open >= closed) {
        closed += 24;
    }

    return open <= now && now < closed ? "open" : "closed";
}

const Hours = ({ business }) => {
    const status = hoursStatus(business);

    return (
        <div>
            <span className={`hours ${status}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
            {/* <span style={{ fontWeight: "300" }}>
                until {toLocalTime(hoursStatus === "open" ?
                business.close : business.open, OFFSET)}
            </span> */}
        </div>
    );
}

export default Hours;