import "./index.css";

const Arrow = ({ direction, onClick }) => {
    return (
        <button className={`arrow ${direction}`} onClick={onClick}>
            <i className={`fas fa-chevron-circle-${direction}`}></i>
        </button>
    );
};

export default Arrow;