import { useRef } from "react";
import { useHistory } from "react-router-dom";

const SearchButton = ({ keyword, setKeyword,
                        address, setAddress,
                        setKeywordQuery,
                        setAddressQuery }) => {
    const buttonRef = useRef();

    const history = useHistory();

    const createRipple = (event) => {
        const button = event.currentTarget;
        const offsetTop = button.parentElement.offsetTop + button.offsetTop;
        const offsetLeft = button.parentElement.offsetLeft + button.offsetLeft;

        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.top = `${event.clientY - offsetTop - radius}px`;
        circle.style.left = `${event.clientX - offsetLeft - radius}px`;
        circle.classList.add("ripple");

        const ripple = button.getElementsByClassName("ripple")[0];

        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }

    const search = (keyword, address) => {
        setKeywordQuery(keyword);
        setAddressQuery(address);
        setKeyword("");
        setAddress({
            val: "",
            geo: null
        });
        history.push("/businesses");
    }

    const handleClick = (e) => {
        e.preventDefault();
        if (address.geo) {
            createRipple(e);
            search(keyword, address);
        }
    }

    return (
        <button
            className={address.geo ? "valid-to-search" : "invalid-to-search"}
            onClick={handleClick}
        >
            <i className="fas fa-search"></i>
        </button>
    );
}

export default SearchButton;