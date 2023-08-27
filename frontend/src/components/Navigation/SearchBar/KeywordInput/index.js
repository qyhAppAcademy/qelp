import { useRef } from "react";

const KeywordInput = ({ keyword, setKeyword, search }) => {
    const keywordRef = useRef();

    return (
        <input
            ref={keywordRef}
            id="keyword-input"
            type="text"
            placeholder="Keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={search}
        />
    );
}

export default KeywordInput;