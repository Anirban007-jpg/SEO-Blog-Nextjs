//import Header from "./Header";
import SigninComponent from "../components/auth/SigninComponent";
import Layout from "../components/Layout";
import { withRouter } from 'next/router';

const Signin = ({router}) => {

    const showRedirectMessage = () => {
        if (router.query.message) {
            return <div className="alert alert-danger">{router.query.message}</div>;
        } else {
            return;
        }
    };

    return (
        <Layout>
           <div className="container-fluid">
                <h2 className="text-center pt-4 pb-4">Login to Start your session</h2>

                <div className="row">
                    <div className="col-md-6 offset-md-3">{showRedirectMessage()}</div>
                </div>

                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <SigninComponent />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default withRouter(Signin);