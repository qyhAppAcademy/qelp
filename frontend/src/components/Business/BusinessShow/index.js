import "./index.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBusiness, fetchBusiness } from "../../../store/businesses";
import { getCurrentUser } from "../../../store/session";
import { useState, useEffect } from "react";

import Carousel from "./Carousel";

import Panel from "./Panel";
import SideBar from "./SideBar";
import BusinessReviews from "./Reviews";
import ReviewForm from "../../Review/Form";
import ReviewButtons from "./ReviewButtons";

const BusinessShowPage = () => {
    const { businessId } = useParams();

    const business = useSelector(getBusiness(businessId));

    const currentUser = useSelector(getCurrentUser);

    const [showReviewForm, setShowReviewForm] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBusiness(businessId))
    }, [dispatch, businessId]);

    if (!business || business.reviews === undefined) {
        return null;
    }

    const review = currentUser ?
        Object.values(business.reviews)
            .find(review => review.user.id === currentUser.id) : undefined;
    
    const hasReviewed = review !== undefined;

    return (
        <div id="business-show">
            <Carousel business={business} />
            {/* <Panel business={business} /> */}
            {/* <section>
                <div>
                    <div className="business-reviews-container">
                        {currentUser && (
                        <ReviewButtons hasReviewed={hasReviewed} setShowReviewForm={setShowReviewForm} />
                        )}
                        <BusinessReviews business={business} />
                        {currentUser && (
                            <ReviewForm businessId={business.id} review={review} showReviewForm={showReviewForm} setShowReviewForm={setShowReviewForm} />
                        )}
                    </div>

                    <div className="side-bar-container">
                        <SideBar business={business} />
                    </div>
                </div>
            </section> */}
        </div>
    );
};

export default BusinessShowPage;