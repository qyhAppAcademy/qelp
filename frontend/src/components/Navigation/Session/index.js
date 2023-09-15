import { useSelector } from "react-redux";
import User from "./User";
import Anonymous from "./Anonymous";

const Session = () => {
    const user = useSelector(state => state.session.user);

    return <>{user ? <User /> : <Anonymous />}</>;
}

export default Session;