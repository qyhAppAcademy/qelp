import "./index.css";
import { useQueryContext } from "../../../context/Query";
import { useHistory } from "react-router-dom";

const Title = () => {
    const { setKeywordQuery, setAddressQuery } = useQueryContext();
    const history = useHistory();

    return (
        <div className="title">
            <button onClick={() => {
                setKeywordQuery("");
                setAddressQuery({
                    val: "",
                    geo: null
                });
                history.push("/");
            }}>
                qelp<i className="fab fa-yelp"></i>
            </button>
        </div>
    );
};

export default Title;