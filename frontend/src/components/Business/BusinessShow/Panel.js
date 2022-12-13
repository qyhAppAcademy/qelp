import "./Panel.css";
import { EST_OFFSET, toLocalTime, isOpen } from "../../../store/time.js";

const Panel = ({ business, setQuery }) => {

    return (
        <>
            <div className="business-panel-item">
                <h1>{business.name}</h1>
            </div>
            <div className="business-panel-item">
                <span>{business.price}</span>
                <span className="icon-circle-container"><i className="fas fa-circle"></i></span>
                <span>{business.category}</span>
            </div>
            {isOpen(business) ? (
            <div className="business-panel-item">
                <span className="business-open">Open</span>
                <span style={{ fontWeight: "300" }}>until {toLocalTime(business.close, EST_OFFSET)}</span>
            </div>
            ) : (
            <div className="business-panel-item">
                <span className="business-closed">Closed</span>
                <span style={{ fontWeight: "300" }}>until {toLocalTime(business.open, EST_OFFSET)}</span>
            </div>
            )}
        </>
    );
}

export default Panel;