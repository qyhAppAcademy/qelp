import { useSelector } from "react-redux";
import User from "./User";
import Anonymous from "./Anonymous";

const Session = () => {
    const user = useSelector(state => state.session.user);

    return <div>{user ? <User /> : <Anonymous />}</div>;
}

export default Session;