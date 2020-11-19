import React, {useState} from "react"
import { Redirect} from "react-router-dom"
import Layout from "../core/Layout"
// import {API} from "../config"
import {signin, authenticate, isAuthenticated} from "../auth"

const Signin = () => {
    const [values, setValues] = useState({
       
        email: "sougato23@gmail.com",
        password: "abcd@1234",
        error: "",
        loading: false,
        redirectToReferrer:false
    });
    const {email,password,error, loading, redirectToReferrer} = values;

    const {user} = isAuthenticated();

    const handleChange = (name) => (event) => {
        setValues({...values, error:false, [name]:event.target.value})
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        //signup(name,email,password);
        setValues({...values, error:false,loading:true});
        signin({email,password})
        .then(data => {
            if(data.err){
                setValues({...values, error:data.err, loading:false})
            }else {
                // setValues({...values, redirectToReferrer:true, loading:false});
                authenticate(data, () => {
                    setValues({...values, redirectToReferrer:true, loading:false});
                });
            }
        });
    };

    const showError = () => (
        <div className="alert alert-danger" style={{display:error?"": "none"}}>
            {error}
        </div>
    );
    const showLoading = () => (
        <div className="alert alert-info" style={{display:loading?"": "none"}}>
            Loading please wait
        </div>
        
    );

    const redirectUser = () => {
       if(redirectToReferrer){
          if(user && user.role === 1){
            return <Redirect to="/admin/dashboard"></Redirect>
          }else{
            return <Redirect to="/user/dashboard"></Redirect>
          }
       }
    }

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
        <Layout title="Signin" description="Signin to Node React e-commerce App"
        className="container col-md-8 offset-md-2">
    {/* {API} */}
    {showLoading()}
    
    {showError()}
        {signupForm()}
        {redirectUser()}

        {/* {JSON.stringify(values)} */}

        </Layout>
       )
}




export default Signin;