import { useRef } from "react";
import { useHistory } from "react-router-dom";

const SearchButton = ({ keyword, setKeywordQuery,
                        address, setAddressQuery }) => {
    const buttonRef = useRef();

    const history = useHistory();

    const ripple = (e) => {
        const button = buttonRef.current;

        const ripples = button.getElementsByClassName("ripple");
        for (const r of ripples) {
            r.remove();
        }

        const offsetTop = button.parentElement.offsetTop + button.offsetTop;
        const offsetLeft = button.parentElement.offsetLeft + button.offsetLeft;

        const diameter = Math.max(button.clientWidth, button.clientHeight);

        const top = e.clientY - offsetTop - diameter / 2.0;
        const left = e.clientX - offsetLeft - diameter / 2.0;

        const circle = document.createElement("span");
        circle.classList.add("ripple");
        circle.style.top = `${top}px`;
        circle.style.left = `${left}px`;
        circle.style.width = `${diameter}px`;
        circle.style.height = `${diameter}px`;

        button.appendChild(circle);
    }

    const search = (e) => {
        e.preventDefault();
        if (address.val === "" || address.geo) {
            ripple(e);
            setKeywordQuery(keyword);
            setAddressQuery(address);
            history.push("/businesses");
        }
    }

    return (
        <button
            ref={buttonRef}
            className={address.val === "" || address.geo ?
                "valid-to-search" : "invalid-to-search"}
            onClick={search}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    search(e);
                }
            }}
        >
            <i className="fas fa-search"></i>
        </button>
    );
}

export default SearchButton;