import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBusiness, getBusiness } from "../../../store/businesses";
import { Helmet } from "react-helmet";
import Carousel from "./Carousel";
import Header from "./Header";
import SideBar from "./SideBar";
import '../../../fontawesome/css/all.min.css';

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
            <Header business={business} />
            <Carousel />
            <SideBar business={business} />
        </>
    );
}

export default BusinessShowPage;