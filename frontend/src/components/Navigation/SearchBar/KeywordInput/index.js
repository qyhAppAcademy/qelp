import { useRef } from "react";

const KeywordInput = ({ keyword, setKeyword, handleKeydown}) => {
    const keywordRef = useRef();

    return (
        <input
            ref={keywordRef}
            id="keyword-input"
            type="text"
            placeholder="Keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeydown}
        />
    );
}

export default KeywordInput;