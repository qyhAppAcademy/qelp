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
import ReviewForm from "../../Review/Form";
import ReviewButtons from "./ReviewButtons";
import '../../../fontawesome/css/all.min.css';
import "./index.css";
import { getCurrentUser } from "../../../store/session";

const BusinessShowPage = () => {
    const [query, setQuery] = useState("");

    const { businessId } = useParams();
    const business = useSelector(getBusiness(businessId));

    const currentUser = useSelector(getCurrentUser);


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchBusiness(businessId))
    }, [dispatch, businessId]);

    if (!business) {
        return null;
    }

    const review = currentUser ? Object.values(business.reviews).find(review => review.user.id === currentUser.id) : undefined;
    const hasReviewed = review !== undefined;

    console.log(review);

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
                        <ReviewButtons hasReviewed={hasReviewed} />
                        <BusinessReviews business={business} />
                        <div style={{padding: "20px 0", fontSize: "24px", fontWeight: "700"}}>
                            <h1>{hasReviewed ? "Edit your" : "Write a"} review</h1>
                        </div>
                        <ReviewForm businessId={business.id} review={review}/>
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