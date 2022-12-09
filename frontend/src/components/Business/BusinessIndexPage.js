import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBusinesses, getBusinesses } from "../../store/businesses";
import '../../fontawesome/css/all.min.css';
import { Helmet } from "react-helmet";
import BusinessIndexItem from "./BusinessIndex/BusinessIndexItem";

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
        <BusinessIndexItem key={business.id} idx={index} business={business}/>
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