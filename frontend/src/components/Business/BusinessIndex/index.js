import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBusinesses, fetchBusinessesByQuery } from "../../../store/businesses";
import Card from "./Card";
import GoogleMap from "./GoogleMap";
import "./index.css";

const BusinessIndexPage = ({ keywordQuery, addressQuery }) => {
    const businesses = useSelector(getBusinesses());

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchBusinessesByQuery(keywordQuery, addressQuery));
    }, [keywordQuery, addressQuery]);

    const cards = businesses.map((business, idx) => (
        <Card business={business} idx={idx} />
    ));

    return (
        <div id="business-index">
            <div>
                {cards.length > 0 ? (
                    cards
                ) : (
                    <p className="no-results">Search Not Found</p>
                )}
            </div>
            <div>
                <GoogleMap businesses={businesses} />
            </div>
        </div>
    );
}

export default BusinessIndexPage;