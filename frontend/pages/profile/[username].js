  
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { userPublicProfile } from '../../actions/user';
import { API } from '../../config';
import moment from 'moment';
import { withRouter } from 'next/router';

const UserProfile = ({router,user,blogs}) => {

    const showUserBlogs = () => {
        return blogs.map((blog,i) => {
            return (
                <div className="mt-4 mb-4" key={i}>
                    <Link href={`/blogs/${blog.slug}`}>
                        <a className="lead">
                            {blog.title}
                        </a>
                    </Link>
                </div>
            )
        })
    }

    return (
        <React.Fragment>
            <Layout>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5>{user.name}</h5>
                                    <Link href={`${user.profile}`}><a>View Profile</a></Link>
                                    <p className="text-muted">Joined {moment(user.createdAt).fromNow()}</p>
                          
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="container pb-5">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title bg-primary pt-4 pb-4 pl-4 pr-4 text-white">Recent blogs by {user.name}</h5>
                                    <br/>
                                    {showUserBlogs()}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title bg-primary pt-4 pb-4 pl-4 pr-4 text-white">Message {user.name}</h5>
                                    <br/>
                                    <p>Contact Form</p>
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
    return userPublicProfile(query.username).then(data => {
        if(data.error){
            console.log(data.error);
        }else{
            return {user: data.user, blogs: data.blogs}
        }
    })
}

export default withRouter(UserProfile);