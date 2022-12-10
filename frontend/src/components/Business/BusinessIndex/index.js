import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBusinesses, getBusinesses } from "../../../store/businesses";
import { Helmet } from "react-helmet";
import Item from "./Item.js";
import '../../../fontawesome/css/all.min.css';

const BusinessIndexPage = () => {
    const businesses = useSelector(getBusinesses());
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchBusinesses());
    }, [dispatch]);

    if (businesses.length === 0) {
        return null;
    }

    const businessItems = businesses.map((business, index) => (
        <Item key={business.id} idx={index} business={business} />
    ));

    return (
        <>
            <div>
                {businessItems}
            </div>
        </>
    );
}

export default BusinessIndexPage;