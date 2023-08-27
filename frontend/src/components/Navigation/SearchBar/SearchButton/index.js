

const SearchButton = ({ keyword, setKeywordQuery,
                        address, setAddressQuery }) => {





    return (
        <button
            ref={buttonRef}
            className={address.val === "" || address.geo ?
                "valid-to-search" : "invalid-to-search"}
            onClick={(e) => {
                search(e);
            }}
        >
            <i className="fas fa-search"></i>
        </button>
    );
}

export default SearchButton;