const KeywordInput = ({ keyword, setKeyword, search }) => {
    return (
        <input
            id="keyword-input"
            type="text"
            placeholder="Keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter") search(e);
            }}
        />
    );
};

export default KeywordInput;