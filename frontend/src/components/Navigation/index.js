import "./index.css";
import Title from "./Title";
import SearchBar from "./SearchBar";
import Contacts from "./Contacts";
import Session from "./Session";

const Navigation = () => {
    return (
        <nav>
            <Title />
            <SearchBar />
            <Contacts />
            <Session />
        </nav>
    );
}

export default Navigation;