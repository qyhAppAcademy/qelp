import { useInput } from "../../hooks";
import "./SearchBar.css";

const SearchBar = ({ setSearchCategory }) => {
    const [category, onCategoryChange] = useInput("");

    const createRipple = (event) => {
        const button = event.currentTarget;

        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        // circle.style.left = `0px`;
        // circle.style.top = `0px`;
        circle.classList.add("ripple");

        const ripple = button.getElementsByClassName("ripple")[0];

        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }

    const search = (e) => {
        e.preventDefault();
        createRipple(e);
        setSearchCategory(category);
    }

    // const buttons = document.getElementsByTagName("button");
    
    // for (const button of buttons) {
    //     button.addEventListener("click", createRipple);
    // }

    return (
        <>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Coffee & Tea, Bars, Pizza"
                    value={category}
                    onChange={onCategoryChange}
                />
                <span></span>
                <input
                    type="text"
                    placeholder="address, neighborhood, city, state or zip"
                />
                <button onClick={search}><i className="fas fa-search"></i></button>
            </div>
        </>
    );
}

export default SearchBar;