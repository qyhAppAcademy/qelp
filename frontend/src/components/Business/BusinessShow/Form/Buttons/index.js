import "./index.css";

const Buttons = ({ handle, reviewed }) => {
    return (
        <div className="buttons">
            <button type="submit" className="submit">
                Post Review
            </button>
            <button
                className="cancel"
                onClick={(e) => handle(e, "cancel")}
            >
                Cancel
            </button>
            {reviewed &&
                <button
                    className="delete"
                    onClick={(e) => handle(e, "delete")}
                >
                    <i className="fas fa-trash"></i>
                </button>
            }
        </div>
    );
};

export default Buttons;