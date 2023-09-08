import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusinessesByQuery, getBusinesses } from "../../../store/businesses";
import Card from "./Card";
import { searchByName, searchByCategory, searchByAddress } from "./search";
import GoogleMap from "./GoogleMap";
import "./index.css";

const BusinessIndexPage = ({ keywordQuery, addressQuery }) => {
    const businesses = useSelector(getBusinesses());

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchBusinessesByQuery(keywordQuery, addressQuery));
    }, [keywordQuery, addressQuery]);
    
    if (businesses.length === 0) {
        return null;
    }

    const cards = (keywordQuery === "" && addressQuery === "") ?
        businesses.map((business, idx) => (
            <Card key={idx} business={business} idx={idx} />
        )) :
        businesses.filter(business => {
            return (
                (searchByName(business.name, keywordQuery) || 
                    searchByCategory(business.category, keywordQuery, ",")) &&
                searchByAddress(business, addressQuery)
            );
        }).map((business, idx) => (
            <Card key={idx} business={business} idx={idx} />
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
                <GoogleMap businesses={businesses.filter(business => {
                    return (
                        (searchByName(business.name, keywordQuery) || 
                            searchByCategory(business.category, keywordQuery, ",")) &&
                        searchByAddress(business, addressQuery)
                    );
                })}/>
            </div>
        </div>
    );
}

export default BusinessIndexPage;