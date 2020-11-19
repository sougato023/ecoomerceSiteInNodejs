import React, {useState} from "react"
import {Link} from "react-router-dom"
import Layout from "../core/Layout"
// import {API} from "../config"
import {signup} from "../auth"

const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });
    const {name,email,password,error, success} = values;

    const handleChange = (name) => (event) => {
        setValues({...values, error:false, [name]:event.target.value})
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        //signup(name,email,password);
        setValues({...values, error:false});
        signup({name,email,password})
        .then(data => {
            if(data.errMsg){
                setValues({...values, error:data.errMsg, success:false})
            }else {
                setValues({...values,name:"",email:"",password:"",error:"",success:true})
            }
        });
    };

    const showError = () => (
        <div className="alert alert-danger" style={{display:error?"": "none"}}>
            {error}
        </div>
    );
    const showSuccess = () => (
        <div className="alert alert-info" style={{display:success?"": "none"}}>
            New account created successfully. Please <Link to="/signin">Signin</Link>
        </div>
    );

    // const signup = (name,email,password) => {
    //     // console.log(name, email, password);
    //     fetch(`${API}/signup`,{
    //         method: "POST",
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json"
    //         },
    //         body:JSON.stringify(name,email,password)
    //     })
    // }
    //movded to index.js
    // const signup = (user) => {
    //     // console.log(name, email, password);
    //     return fetch(`${API}/signup`,{
    //         method: "POST",
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json"
    //         },
    //         body:JSON.stringify(user)
    //     })
    //     .then( response => {
    //         return response.json()
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
    // };
    //return (<div>Sign up</div>)
    //console.log(API)
    const signupForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange("name")} type="text" value={name} className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange("email")} type="email" value={email} className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange("password")} type="password" value={password} className="form-control" />
            </div>

            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
    )
    return (
        <Layout title="Signup" description="Sign up to Node React e-commerce App"
        className="container col-md-8 offset-md-2">
    {/* {API} */}
    {showSuccess()}
    {showError()}
        {signupForm()}

        {/* {JSON.stringify(values)} */}

        </Layout>
       )
}




export default Signup;