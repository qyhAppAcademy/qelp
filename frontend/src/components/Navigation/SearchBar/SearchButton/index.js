import "./index.css";

const SearchButton = ({ clickable, search }) => {
    return (
        <button
            className={clickable ? "clickable" : "unclickable"}
            onClick={search}
        >
            <i className="fas fa-search"></i>
        </button>
    );
}

export default SearchButton;