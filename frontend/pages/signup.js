//import Header from "./Header";
import SignupComponent from "../components/auth/SignupComponent";
import Layout from "../components/Layout";

const Signup = () => {
    return (
        <Layout>
            <h2 className="text-center pt-4 pb-4"><strong>Please fill up the Registration form :-</strong><hr style={{border: '2px dashed gold'}}/></h2>
            <div className="row">
                <div className="col-md-10 offset-md-1">
                    <SignupComponent />
                </div>
            </div>
        </Layout>
    );
};

export default Signup;