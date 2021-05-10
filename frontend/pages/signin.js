//import Header from "./Header";
import SigninComponent from "../components/auth/SigninComponent";
import Layout from "../components/Layout";

const Signin = () => {
    return (
        <Layout>
            <h2 className="text-center pt-4 pb-4"><strong>Please Login to start your session :-</strong><hr style={{border: '2px dashed gold'}}/></h2>
            <div className="row">
                <div className="col-md-10 offset-md-1">
                    <SigninComponent />
                </div>
            </div>
        </Layout>
    );
};

export default Signin;