import { useHistory } from "react-router-dom";
import "./index.css";

const ACTIONS = ["Log In", "Sign Up"];

const Anonymous = () => {
    const history = useHistory();

    const actions = ACTIONS.map((ACTION, idx) => {
        const action =
            ACTION.split(" ").map(word => word.toLowerCase()).join("");

        return (
            <button
                className={`button ${action}-button`}
                onClick={() => history.push(`/${action}`)}
                key={idx}
            >
                {ACTION}
            </button>
        );
    });

    return <>{actions}</>
}

export default Anonymous;