const OPEN = { color: "#008055" };
const CLOSED = { color: "#e00707" };

const businessIsOpen = (business) => {
    let open = new Date(business.open).getUTCHours();
    let closed = new Date(business.close).getUTCHours();
    let now = new Date(Date().toLocaleString("en-US")).getUTCHours();
    if (open >= closed)
        closed += 24;
    if (open > now)
        now += 24;

    console.log(business.business);
    console.log(open);
    
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

const Hours = (business) => {
    const open = businessIsOpen(business);

    return (
        <>
            <span style={open ? OPEN : CLOSED}>
                {open ? "Open" : "Closed"}
            </span>
            <span className="hours">
                until {open ? twelveHourFormat(business.close) :
                    twelveHourFormat(business.open)}
            </span>
        </>
    );
};

export default Hours;