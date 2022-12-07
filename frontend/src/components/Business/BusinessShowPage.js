import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBusiness, getBusiness } from "../../store/businesses";
import BusinessSideBar from "./BusinessSideBar";
import "./BusinessShowPage.css";
import '../../fontawesome/css/all.min.css';
import { Helmet } from "react-helmet";
import BusinessCarousel from "./BusinessCarousel";

const BusinessShowPage = () => {
    const { businessId } = useParams();
    const business = useSelector(getBusiness(businessId));
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchBusiness(businessId))
    }, [dispatch, businessId]);

    if (!business) {
        return null;
    }

    return (
        <>
            <Helmet>
                <script defer src="../../fontawesome/js/all.min.js"></script>
            </Helmet>
            <BusinessCarousel />
            {/* <BusinessSideBar business={business} /> */}
        </>
    );
}

export default BusinessShowPage;