import { useQueryContext } from "../../../context/Query";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getBusinesses, fetchBusinesses } from "../../../store/businesses";
import Card from "./Card";
import GoogleMap from "./GoogleMap";
import "./index.css";

const BusinessIndex = () => {
    const { keywordQuery, setKeywordQuery, addressQuery } = useQueryContext();

    const businesses = useSelector(getBusinesses());

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchBusinesses(keywordQuery, addressQuery));
    }, [dispatch, keywordQuery, addressQuery]);

    const cards = businesses.length > 0 ? businesses.map((business, idx) => (
        <Card
            business={business}
            idx={idx}
            keywordQuery={keywordQuery}
            setKeywordQuery={setKeywordQuery}
            key={idx}
        />
    )) : <h1 className="no-results">Search Not Found</h1>;

    return (
        <div id="business-index">
            <div>{cards}</div>
            <div>
                <GoogleMap
                    businesses={businesses}
                    keywordQuery={keywordQuery}
                    setKeywordQuery={setKeywordQuery}
                />
            </div>
        </div>
    );
}

export default BusinessIndex;