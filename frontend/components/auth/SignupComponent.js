import { useState } from "react";

const SignupComponent = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        address: '',
        length: 400,
        about: '',
        mobile_no: '',
        password: '',
        loading: false,
        message: '',
        error: '',
        showForm: true
    }); 

    const {name,email,address,length,about,mobile_no,password,loading,message,error,showForm} = values;

    const handleChange = (name) => e => {
        setValues({...values, error: '', [name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    // 
    // disable={length-about.length !== 0}
    const signupForm = () => {
        return (
            <form className="mr-5 ml-5 pt-2 pl-3 pr-3" style={{border: '3px solid black', borderRadius: '10px'}} onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <label>Name</label>
                    <br/>
                    <input value={name} type="text" className="form-control" placeholder="Enter your name..." onChange={handleChange('name')} />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <br/>
                    <input value={email} type="email" className="form-control" placeholder="Enter your email to be registered..." onChange={handleChange('email')} />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <br/>
                    <textarea  value={address}rows="2" type="text" className="form-control" placeholder="Enter your address..." onChange={handleChange('address')} />
                </div>
                <div className="form-group">
                    <label>Bio{" "}<strong>(Mention Something about yourself){" "}[{length-about.length} {length-about.length === 1 ? "word left" : "words left"}]</strong></label>
                    <br/>
                    <textarea value={about} rows="5" disable={length-about.length !== 0} type="text"  className="form-control" placeholder="Enter about yourself..." onChange={handleChange('about')} />
                </div>
                <div className="form-group">
                    <label>Registered Mobile Number</label>
                    <br/>
                    <input value={mobile_no} type="text" className="form-control" placeholder="Enter your mobile number to be registered..." onChange={handleChange('mobile_no')} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <br/>
                    <input value={password} type="password" className="form-control" placeholder="Enter your Password..." onChange={handleChange('password')} />
                </div><hr />
                <div className="pd-3">
                    <button className="btn btn-success">REGISTER</button>
                </div><br/>
            </form>
        )
    }

    return (
        <React.Fragment>
            {signupForm()}
        </React.Fragment>
    )
}

export default SignupComponent
