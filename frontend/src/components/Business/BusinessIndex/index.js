import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusinesses, getBusinesses } from "../../../store/businesses";
import Navigation from "../../Navigation";
import Item from "./Item.js";
import { searchByName, searchByCategory } from "./search";
import "./index.css";
import '../../../fontawesome/css/all.min.css';

const BusinessIndexPage = () => {
    const [query, setQuery] = useState("");

    const businesses = useSelector(getBusinesses());
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchBusinesses());
    }, [dispatch]);
    
    if (businesses.length === 0) {
        return null;
    }

    const businessItems = query === "" ? 
        businesses.map((business, index) => (
            <Item key={business.id} idx={index} business={business} />
        )) :
        businesses.filter(business => {
            return searchByName(business.name, query) || searchByCategory(business.category, query, ",");
        }).map((business, index) => (
            <Item key={business.id} idx={index} business={business} />
        ));

    return (
        <>
            <header>
                <Navigation setQuery={setQuery} />   
            </header>
            <div>
                {businessItems.length > 0 ? (
                    businessItems
                ) : (
                    <p className="no-results">Search Not Found</p>
                )}
            </div>
        </>
    );
}

export default BusinessIndexPage;