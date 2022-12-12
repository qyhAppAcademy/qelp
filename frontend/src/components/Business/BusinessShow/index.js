import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBusiness, getBusiness } from "../../../store/businesses";
import { Helmet } from "react-helmet";
import Navigation from "../../Navigation";
import Panel from "./Panel";
import Carousel from "./Carousel";
import SideBar from "./SideBar";
import '../../../fontawesome/css/all.min.css';

const BusinessShowPage = () => {
    const [query, setQuery] = useState("");

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
            <header>
                <Navigation setQuery={setQuery} />
            </header>
            <Panel business={business} setQuery={setQuery} />
            <Carousel business={business} />
            <SideBar business={business} />
            <Helmet>
                <script defer src="../../fontawesome/js/all.min.js"></script>
            </Helmet>
        </>
    );
}

export default BusinessShowPage;