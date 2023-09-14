import React from "react";
import Title from "./Title";
import SearchBar from "./SearchBar";
import Contacts from "./Contacts";
import Session from "./Session";
import "./index.css";

import ProfileButton from "./Session/User/ProfileButton";

const Navigation = () => {

    // const sessions = user ? (
    //     <ProfileButton user={user} />
    // ) : (
    //     <>  
    //         {["Log In", "Sign Up"].map((l) => {
    //             const label = l.split(" ").map(w => w.toLowerCase()).join("");
    //             return (
    //                 <button
    //                     className={`button ${label}-button`}
    //                     onClick={() => history.push(`/${label}`)}
    //                     key={label}
    //                 >{label}</button>
    //             );
    //         })}
    //         {/* <NavLink to="/login" className="button login-button">Log In</NavLink>
    //         <NavLink to="/signup" className="button signup-button">Sign Up</NavLink> */}
    //     </>
    // );

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