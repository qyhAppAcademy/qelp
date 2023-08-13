import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews, getReviews } from "../../store/reviews";
import { ReviewAtHomePage } from "../Review/index";
import HomeCarousel from "./carousel";
import "./index.css";

const Home = () => {
    const reviews = useSelector(getReviews());

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchReviews());
    }, [dispatch]);

    if (reviews.length === 0) {
        return null;
    }

    const reviewItems = reviews.map((review, index) => (
        <ReviewAtHomePage key={review.id} idx={index} review={review} />
    ));

    return (
        <div className="home outer">
            <HomeCarousel />
            {/* <h1>Recent Reviews</h1>
            <div className="reviews-at-home-page-container">
                {reviewItems}
            </div> */}
        </div>
    );
}

export default Home;