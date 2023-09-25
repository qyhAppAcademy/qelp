const OPEN = {
    name: "Open",
    style: {
        color: "#008055",
        fontWeight: "600"
    }
};

const CLOSED = {
    name: "Closed",
    style: {
        color: "#e00707",
        fontWeight: "600"
    }
};

const toUTCHours = (time) => {
    return time.getHours() + time.getMinutes() / 60.0 +
        new Date().getTimezoneOffset() / 60.0;
};

const businessIsOpen = (business) => {
    let open = toUTCHours(new Date(business.open));

    let closed = toUTCHours(new Date(business.close));
    if (closed <= open) closed += 24;

    let now = toUTCHours(new Date());
    if (now < open) now += 24;
    
    return open <= now && now < closed;
};

const twelveHourFormat = (time) => {
    return new Date(time).toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit"
    });
    // let date = new Date(time);

    // let hours = date.getUTCHours() - new Date().getTimezoneOffset() / 60;
    
    // let minutes = date.getUTCMinutes();

    // if (hours < 0) hours += 24;

    // // Check whether AM or PM
    // const newformat = hours >= 12 ? "PM" : "AM";

    // // Find current hour in AM-PM Format
    // hours %= 12;

    // // To display "0" as "12"
    // hours = hours ? hours : 12;

    // hours   = hours < 10 ? "0" + hours : hours;
    // minutes = minutes < 10 ? "0" + minutes : minutes;

    // return `${hours}:${minutes} ${newformat}`;
};

const Hours = ({ business, component }) => {
    const open = businessIsOpen(business);

    const status = open ? OPEN : CLOSED;

    let hours;
    
    switch (component) {
        case "card":
            hours = `until ${twelveHourFormat(open ?
                        business.close : business.open)}`;
            break;
        case "panel":
            hours = `${twelveHourFormat(business.open)} -
                     ${twelveHourFormat(business.close)}`;
            break;
        default:
            break;
    }

    return (
        <>
            <span style={status.style}>{status.name}</span>
            <span className="hours">{hours}</span>
        </>
    );
};

export default Hours;