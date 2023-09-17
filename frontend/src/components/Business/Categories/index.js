import { useQueryContext } from "../../../context/Query";
import { useHistory } from "react-router-dom";

const Categories = ({ business, component, separator }) => {
    const { keywordQuery, setKeywordQuery } = useQueryContext();

    const history = useHistory();

    const ctgs = [];

    const categories = business.category.split(",");

    categories.forEach((category, idx) => {
        const ctg = (
            <span
                className="category"
                onClick={() => {
                    const keyword = category.trim();
                    if (keyword !== keywordQuery) {
                        setKeywordQuery(keyword);
                        history.push("/businesses");
                    }
                }}
                key={`${component}-${business.id}-ctg-${idx}`}
            >
                {category.trim()}
            </span>
        );

        ctgs.push(ctg);

        if (idx < categories.length - 1) {
            const spt = (
                <span
                    className="separator"
                    key={`${component}-${business.id}-spt-${idx}`}
                >{separator}</span>
            );
            ctgs.push(spt);
        }
    });

    return (<>{ctgs}</>);
};

export default Categories;