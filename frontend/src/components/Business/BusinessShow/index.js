import "./index.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBusiness, fetchBusiness } from "../../../store/businesses";
import { getCurrentUser } from "../../../store/session";
import { useState, useEffect } from "react";

import Carousel from "./Carousel";
import ShowFormButton from "./ShowFormButton";
import Reviews from "./Reviews";
import Form from "./Form";
import { NewSideBar } from "./SideBar";

import SideBar from "./SideBar";

const BusinessShow = () => {
    const { businessId } = useParams();

    const business = useSelector(getBusiness(businessId));

    const user = useSelector(getCurrentUser);

    const review = business && business.reviews && user ?
        Object.values(business.reviews).find(review =>
            review.user.id === user.id) : undefined;
    
    const [showForm, setShowForm] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBusiness(businessId));
    }, [dispatch, businessId]);

    useEffect(() => {
        if (showForm)
            document.getElementById("review-form").scrollIntoView();
    }, [showForm]);

    if (!business || !business.reviews)
        return null;

    return (
        <div id="business-show">
            <Carousel business={business} />
            <NewSideBar business={business} />
            {/* <SideBar business={business} /> */}
            <section>
                <ShowFormButton
                    user={user}
                    setShowForm={setShowForm}
                    reviewed={review !== undefined}
                />
                <Reviews business={business} />
                <Form
                    businessId={business.id}
                    review={review}
                    showForm={showForm}
                    setShowForm={setShowForm}
                />
            </section>
        </div>
    );
};

export default BusinessShow;