import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusinessesByQuery, getBusinesses } from "../../../store/businesses";
import Card from "./Card";
import { searchByName, searchByCategory, searchByAddress } from "./search";
import MapContainer from "./MapContainer";
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

    const businessItems = (keywordQuery === "" && addressQuery === "") ?
        businesses.map((business, idx) => (
            <Card key={business.id} business={business} idx={idx} />
        )) :
        businesses.filter(business => {
            return (
                (searchByName(business.name, keywordQuery) || 
                    searchByCategory(business.category, keywordQuery, ",")) &&
                searchByAddress(business, addressQuery)
            );
        }).map((business, index) => (
            <Card key={business.id} idx={index} business={business} />
        ));

    return (
        <div id="business-index">
            <div>
                {businessItems.length > 0 ? (
                    businessItems
                ) : (
                    <p className="no-results">Search Not Found</p>
                )}
            </div>
            <div>
                <MapContainer businesses={businesses.filter(business => {
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