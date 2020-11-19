import React, { Fragment } from "react"
import {Link, withRouter} from "react-router-dom"
import {signout, isAuthenticated} from "../auth"

const isActive = (history, path) => {
    
    if(history.location.pathname === path){
        
        return {color: "#ff9900"}
    } else {
        return {color:"#ffffff"}
    }
}

const Menu = ({history})=> {

    return (
        <div>
            <ul className="nav nav-tabs bg-primary" >
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history,"/")} to="/">Home</Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history,"/user/dashboard")} to="/user/dashboard">Dashboard</Link>
                </li>

                {/* <li className="nav=item">
                    <Link className="nav-link" style={isActive(history,"/signin")} to="/signin">Signin</Link>
                </li>
                <li className="nav=item">
                    <Link className="nav-link" style={isActive(history,"/signup")} to="/signup">Signup</Link>
                </li>
                <li className="nav=item">
                    <span className="nav-link" style={{cursor:"pointer", color:"#ffffff"}} onClick={() => signout(() => {
                        history.push("/");
                    })}>Signout</span>
                </li> */}

                {/* {!isAutheticated() &&(
                   <div>
                        <li className="nav=item">
                    <Link className="nav-link" style={isActive(history,"/signin")} to="/signin">Signin</Link>
                </li>
                <li className="nav=item">
                    <Link className="nav-link" style={isActive(history,"/signup")} to="/signup">Signup</Link>
                </li>
                   </div>
               )}
                {isAutheticated() && (
                    <div>
                        <li className="nav=item">
                    <span className="nav-link" style={{cursor:"pointer", color:"#ffffff"}} onClick={() => signout(() => {
                        history.push("/");
                    })}>Signout</span>
                </li>
                    </div>
                )} */}

{!isAuthenticated() &&(
                   <Fragment>
                        <li className="nav=item">
                    <Link className="nav-link" style={isActive(history,"/signin")} to="/signin">Signin</Link>
                </li>
                <li className="nav=item">
                    <Link className="nav-link" style={isActive(history,"/signup")} to="/signup">Signup</Link>
                </li>
                   </Fragment>
               )}
                {isAuthenticated() && (
                    <Fragment>
                        <li className="nav=item">
                    <span className="nav-link" style={{cursor:"pointer", color:"#ffffff"}} onClick={() => signout(() => {
                        history.push("/");
                    })}>Signout</span>
                </li>
                    </Fragment>
                )}
            </ul>
        </div>
    )
};

export default withRouter(Menu);