import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusinesses, getBusinesses } from "../../../store/businesses";
import Navigation from "../../Navigation";
import Item from "./Item.js";
import "./index.css";
import '../../../fontawesome/css/all.min.css';

const containsCategory = (business, category) => {
    const tags = business.category.split(",");
    for (let i = 0; i < tags.length; i++) {
        tags[i] = tags[i].trim();
    }
    return tags.some(tag => tag === category);
}

const BusinessIndexPage = () => {
    const [searchCategory, setSearchCategory] = useState("");

    const businesses = useSelector(getBusinesses());
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchBusinesses());
    }, [dispatch]);

    // useEffect(() => {
        
    // }, [searchCategory]);
    
    if (businesses.length === 0) {
        return null;
    }

    const businessItems = searchCategory === "" ? 
        businesses.map((business, index) => (
            <Item key={business.id} idx={index} business={business} />
        )) :
        businesses.filter(business => {
            return containsCategory(business, searchCategory);
            // return business.category === searchCategory;
        }).map((business, index) => (
            <Item key={business.id} idx={index} business={business} />
        ));

    return (
        <>
            <Navigation setSearchCategory={setSearchCategory} />
            <p>{searchCategory}</p>
            <div>
                {businessItems}
            </div>
        </>
    );
}

export default BusinessIndexPage;