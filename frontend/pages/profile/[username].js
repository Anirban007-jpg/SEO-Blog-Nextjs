  
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { userPublicProfile } from '../../actions/user';
import { API } from '../../config';
import moment from 'moment';
import { withRouter } from 'next/router';

const UserProfile = ({router}) => {
    return (
        <React.Fragment>
            <Layout>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5>username</h5>
                                    <p>....</p>
                                    {JSON.stringify(router)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </React.Fragment>
    );
};

UserProfile.getInitialProps = ({query}) => {
    
}

export default withRouter(UserProfile);