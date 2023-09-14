import { useHistory } from "react-router-dom";
import "./index.css";

const Title = () => {
    const history = useHistory();

    return (
        <div>
            <button
                id="title"
                onClick={() => history.push("/")}
            >
                qelp<i className="fab fa-yelp"></i>
            </button>
        </div>
    );
}

export default Title;