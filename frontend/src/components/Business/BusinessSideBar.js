const BusinessSideBar = ({ business }) => {
    return (
        <ul className="business-show-page-side-bar">
            <li className="business-show-page-side-bar-item">
                <div>
                    <p>
                        <a href={`${business.website}`}>
                            {business.website}
                        </a>
                    </p>
                    <span>
                        <a href={`${business.website}`}>
                            <i className="fas fa-arrow-alt-circle-right"></i>
                        </a>
                    </span>
                </div>
            </li>
            <li className="business-show-page-side-bar-item">
                <div>
                    <p>
                        {business.phoneNumber}
                    </p>
                    <span>
                        <i className="fas fa-phone-volume"></i>
                    </span>
                </div>
            </li>
            <li className="business-show-page-side-bar-item">
                <div>
                    <div>
                        <a href={`https://www.google.com/maps?q=${business.lat},${business.lng}`}>
                            Get Directions
                        </a>
                        <p>
                            {`${business.address} ${business.city}, ${business.state} ${business.zipCode}`}
                        </p>
                    </div>
                    <span>
                        <a href={`https://www.google.com/maps?q=${business.lat},${business.lng}`}>
                            <i className="fas fa-map-pin"></i>
                        </a>
                    </span>
                </div>
            </li>
        </ul>
    );
}

export default BusinessSideBar;