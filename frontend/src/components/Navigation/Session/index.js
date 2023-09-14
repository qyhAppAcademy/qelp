import { useSelector } from "react-redux";
import Anonymous from "./Anonymous";

const Session = () => {
    const user = useSelector(state => state.session.user);

    return <>{ !user && <Anonymous /> }</>
}

export default Session;