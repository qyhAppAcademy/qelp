import "./index.css";

const ShowFormButton = ({ user, setShowForm, reviewed }) => {
    return <>
        {user &&
            <button
                className="show-form-button"
                onClick={() => {
                    const form = document.getElementById("review-form");
                    if (form)
                        form.scrollIntoView();
                    else
                        setShowForm(true);
                }}
            >
                <span><i className="fas fa-star"></i></span>
                <span>
                    {reviewed ? "Edit your" : "Write a"} review
                </span>
            </button>
        }
    </>;
};

export default ShowFormButton;