import { useInput } from "../../hooks";
import { useHistory } from "react-router-dom";
import "./SearchBar.css";

const SearchBar = ({ setQuery }) => {
    const [category, onCategoryChange] = useInput("");

    const history = useHistory();

    const createRipple = (event) => {
        const button = event.currentTarget;

        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
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
        setQuery(category);
        history.push("/businesses");
    }

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
                    placeholder="Address, Neighborhood, City, State or Zip"
                />
                <button onClick={search}><i className="fas fa-search"></i></button>
            </div>
        </>
    );
}

export default SearchBar;