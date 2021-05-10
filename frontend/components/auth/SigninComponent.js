import { useState } from "react";
import { authenticate, signin } from "../../actions/auth";
import Router from 'next/router';

const SigninComponent = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        loading: false,
        message: '',
        error: '',
        showForm: true
    }); 

    const {email,password,loading,message,error,showForm} = values;

    const handleChange = (name) => e => {
             setValues({...values, error: '', [name]: e.target.value});  
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({...values, loading: true, error:''});
        const user = {email,password};
        signin(user)
        .then(data =>{
            if(data.error){
                setValues({...values, error: data.error, loading:false});
            }else {
                // save user token to cookie
                // save user info to localstorage
                // authenticate user
                authenticate(data, () => {
                    Router.push('/');
                })
            }
        })
         

    }

    const showLoaing = () => loading ? <div className="Jumbotron">Loading..</div> : '';
    const showError = () => error ? <div className="alert alert-danger">{error}</div> : '';
    const showMessage = () => message ? <div className="alert alert-success">{message}</div> : '';

    const signinForm = () => {
        return (
            <form className="mr-5 ml-5 pt-2 pl-3 pr-3" style={{border: '3px solid black', borderRadius: '10px'}} onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <label>Email</label>
                    <br/>
                    <input value={email} type="email" className="form-control" placeholder="Enter your email to be registered..." onChange={handleChange('email')} />
                </div>
               
                <div className="form-group">
                    <label>Password</label>
                    <br/>
                    <input value={password} type="password" className="form-control" placeholder="Enter your Password..." onChange={handleChange('password')} />
                </div><hr />

                <div className="pd-3">
                    <button className="btn btn-success">LOGIN</button>
                </div><br/>
            </form>
        )
    }

    return (
        <React.Fragment>
            {showError()}
            {showMessage()}
            {showLoaing()}
            <br/>
            {showForm && signinForm()}
        </React.Fragment>
    )
}

export default SigninComponent
