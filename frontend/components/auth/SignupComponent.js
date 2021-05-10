import { useState } from "react";
import { signup } from "../../actions/auth";

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
        role: -1,
        showForm: true
    }); 

    const {name,email,address,length,about,mobile_no,password,role,loading,message,error,showForm} = values;

    const handleChange = (name) => e => {
        if (name !== 'role'){ 
             setValues({...values, error: '', [name]: e.target.value});
        }else{
            var r = parseInt(e.target.value);
            setValues({...values, role: r});
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({...values, loading: true, error:''});
        const user = {name,email,address,length,about,mobile_no,password,role};
        signup(user)
        .then(data =>{
            if(data.error){
                setValues({...values, error: data.error, loading:false});
            }else {
                setValues({...values, name: '',email: '',address: '',length: 400,about: '',mobile_no: '',role: -1, password: '',loading: false,message: data.message,error: '',showForm: false});
            }
        })
         

    }

    const showLoaing = () => loading ? <div className="Jumbotron">Loading..</div> : '';
    const showError = () => error ? <div className="alert alert-danger">{error}</div> : '';
    const showMessage = () => message ? <div className="alert alert-success">{message}</div> : '';

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
                    <label>Role</label>
                    <br/>
                    <select value={role} type="Number" className="form-control" placeholder="Enter your role..." onChange={handleChange('role')}>
                        <option value=''>Select Role</option>
                        <option value='0'>Blogger</option>
                        <option value='1'>Admin-Blogger</option>
                    </select>
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
            {showError()}
            {showMessage()}
            {showLoaing()}
            <br/>
            {showForm && signupForm()}
        </React.Fragment>
    )
}

export default SignupComponent
