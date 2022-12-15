import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBusiness, getBusiness } from "../../../store/businesses";
import Panel from "./Panel";
import Carousel from "./Carousel";
import SideBar from "./SideBar";
import BusinessReviews from "./Reviews";
import ReviewForm from "../../Review/Form";
import ReviewButtons from "./ReviewButtons";
import { getCurrentUser } from "../../../store/session";
import "./index.css";

const BusinessShowPage = () => {
    // debugger
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

    const review = currentUser ? Object.values(business.reviews).find(review => review.user.id === currentUser.id) : undefined;
    const hasReviewed = review !== undefined;

    return (
        <>
            <Carousel business={business} />

            <section>
                <div>
                    <div className="business-panel-container">
                        <Panel business={business} />
                    </div>

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
            </section>
        </>
    );
}

export default BusinessShowPage;