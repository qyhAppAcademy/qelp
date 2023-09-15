import "./index.css";
import { useHistory } from "react-router-dom";

const Title = () => {
    const history = useHistory();

    return (
        <div className="title">
            <button onClick={() => history.push("/")}>
                qelp<i className="fab fa-yelp"></i>
            </button>
        </div>
    );
};

export default Title;