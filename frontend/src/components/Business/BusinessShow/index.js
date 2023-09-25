import "./index.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBusiness, fetchBusiness } from "../../../store/businesses";
import { useEffect } from "react";

import Carousel from "./Carousel";
import Reviews from "./Reviews";
import SideBar from "./SideBar";

const BusinessShow = () => {
    const { businessId } = useParams();

    const business = useSelector(getBusiness(businessId));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBusiness(businessId))
    }, [dispatch, businessId]);

    if (!business || business.reviews === undefined)
        return null;

    return (
        <div id="business-show">
            <Carousel business={business} />
            <Reviews business={business} />
            {/* <div className="side-bar-container">
                <SideBar business={business} />
            </div> */}
        </div>
    );
};

export default BusinessShow;