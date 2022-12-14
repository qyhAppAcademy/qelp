import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusinesses, getBusinesses } from "../../../store/businesses";
import Item from "./Item.js";
import { searchByName, searchByCategory, searchByAddress } from "./search";
import MapContainer from "./MapContainer";
import "./index.css";

const BusinessIndexPage = ({ query, addressQuery }) => {
    const businesses = useSelector(getBusinesses());
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchBusinesses());
    }, [dispatch]);
    
    if (businesses.length === 0) {
        return null;
    }

    const businessItems = (query === "" && addressQuery === "") ? 
        businesses.map((business, index) => (
            <Item key={business.id} idx={index} business={business} />
        )) :
        businesses.filter(business => {
            return (
                (searchByName(business.name, query) || 
                    searchByCategory(business.category, query, ",")) &&
                searchByAddress(business, addressQuery)
            );
        }).map((business, index) => (
            <Item key={business.id} idx={index} business={business} />
        ));

    return (
        <>
        <div className="business-search-results-container">
            <div className="business-search-results-list">
                {businessItems.length > 0 ? (
                    businessItems
                ) : (
                    <p className="no-results">Search Not Found</p>
                )}
            </div>
            <div className="business-search-results-google-map">
                <MapContainer businesses={businesses.filter(business => {
                    return (
                        (searchByName(business.name, query) || 
                            searchByCategory(business.category, query, ",")) &&
                        searchByAddress(business, addressQuery)
                    );
                })}/>
            </div>
        </div>
        </>
    );
}

export default BusinessIndexPage;