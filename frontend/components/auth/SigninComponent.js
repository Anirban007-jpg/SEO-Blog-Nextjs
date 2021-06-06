import { useState, useEffect } from "react";
import { authenticate, isAuth, signin } from "../../actions/auth";
import Router from 'next/router';
import Link from "next/Link";

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

    useEffect(() => {
        isAuth() &&  Router.push('/')
    }, [])

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
                    if (isAuth() && isAuth().role === 0){
                        Router.push('/user');
                    } else if (isAuth() && isAuth().role === 1){
                        Router.push('/admin');
                    } else if (isAuth() && isAuth().role === 2){
                        Router.push('/super-admin');
                    }
                })
            }
        })
         

    }

    const showLoaing = () => loading ? <h1 className="jumbotron text-center">Loading..</h1> : '';
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
                </div><hr/>
                <div className="md-3 float-right">
                    <strong><Link href='/auth/forgot'>Forgot Password?</Link></strong>
                </div><br/><br/>
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
