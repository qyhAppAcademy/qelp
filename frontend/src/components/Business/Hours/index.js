const OPEN = {
    name: "Open",
    style: { color: "#008055" }
};

const CLOSED = {
    name: "Closed",
    style: { color: "#e00707" }
};

const businessIsOpen = (business) => {
    let open = new Date(business.open).getUTCHours();
    let closed = new Date(business.close).getUTCHours();
    let now = new Date(Date().toLocaleString("en-US")).getUTCHours();
    if (open >= closed)
        closed += 24;
    if (open > now)
        now += 24;
    
    return open <= now && now < closed;
};

const twelveHourFormat = (dateString) => {
    const date = new Date(dateString);
    const hour = date.getHours();
    const minute = date.getMinutes();
    const period = hour >= 0 && hour < 12 ? "AM" : "PM";
    return `${hour % 12 === 0 ? 12 : hour % 12}:${minute < 10 ?
        "0" + minute : minute} ${period}`;
};

const Hours = ({ business, component }) => {
    const open = businessIsOpen(business);

    const status = open ? OPEN : CLOSED;

    const hours = new Array(2);

    hours[0] = <span style={status.style}>{status.name}</span>;

    switch (component) {
        case "card":
            const hour = twelveHourFormat(open ? business.close : business.open);
            hours[1] = <span className="hours">until {hour}</span>;
            break;
        default:
            break;
    }

    return <>{hours}</>;
};

export default Hours;