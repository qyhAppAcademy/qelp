import { createElement, useRef } from "react";
import { useHistory } from "react-router-dom";

const SearchButton = ({ keyword, setKeyword,
                        address, setAddress,
                        setKeywordQuery,
                        setAddressQuery }) => {
    const buttonRef = useRef();

    const history = useHistory();

    const ripple = (event) => {
        const button = buttonRef.current;

        const ripples = button.getElementsByClassName("ripple");
        for (const r of ripples) {
            r.remove();
        }

        const offsetTop = button.parentElement.offsetTop + button.offsetTop;
        const offsetLeft = button.parentElement.offsetLeft + button.offsetLeft;

        const diameter = Math.max(button.clientWidth, button.clientHeight);

        const top = event.clientY - offsetTop - diameter / 2.0;
        const left = event.clientX - offsetLeft - diameter / 2.0;

        const circle = document.createElement("span");
        circle.classList.add("ripple");
        circle.style.top = `${top}px`;
        circle.style.left = `${left}px`;
        circle.style.width = `${diameter}px`;
        circle.style.height = `${diameter}px`;

        button.appendChild(circle);
    }

    const search = (keyword, address) => {
        if (address.val === "" || address.geo) {
            setKeywordQuery(keyword);
            setAddressQuery(address);
            setKeyword("");
            setAddress({
                val: "",
                geo: null
            });
            history.push("/businesses");
        }
    }

    const handleClick = (e) => {
        e.preventDefault();
        ripple(e);
        search(keyword, address);
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            ripple(e);
            search(keyword, address);
        }
    }

    return (
        <button
            ref={buttonRef}
            className={address.val === "" || address.geo ?
                "valid-to-search" : "invalid-to-search"}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            <i className="fas fa-search"></i>
        </button>
    );
}

export default SearchButton;