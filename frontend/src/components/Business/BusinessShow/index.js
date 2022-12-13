import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBusiness, getBusiness } from "../../../store/businesses";
import { Helmet } from "react-helmet";
import Navigation from "../../Navigation";
import Panel from "./Panel";
import Carousel from "./Carousel";
import SideBar from "./SideBar";
import BusinessReviews from "./Reviews";
import Review from "../../Review";
import '../../../fontawesome/css/all.min.css';
import "./index.css";

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

    const reviews = Object.values(business.reviews).map((review, index) => (
        <>
            <div className="review-header">
                <h1>{`${review.user.email.split("@")[0]}...`}</h1>
            </div>
            <Review key={index} review={review} />
        </>
    ));

    return (
        <>
            <header>
                <Navigation setQuery={setQuery} />
            </header>

            <Carousel business={business} />

            <section>
                <div>
                    <div className="business-panel-container">
                        <Panel business={business} setQuery={setQuery} />
                    </div>

                    <div className="business-reviews-container">
                        <BusinessReviews business={business} />
                    </div>

                    <div className="side-bar-container">
                        <SideBar business={business} />
                    </div>
                </div>
            </section>

            <Helmet>
                <script defer src="../../fontawesome/js/all.min.js"></script>
            </Helmet>
        </>
    );
}

export default BusinessShowPage;