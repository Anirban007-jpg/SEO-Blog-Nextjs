import { isAuth } from '../../actions/auth';
import Layout from '../../components/Layout';
import Private from '../../components/auth/Private'
import Router  from 'next/router';
import { useEffect } from 'react';
import Link from 'next/link';

const UserIndex = () => {
  
    useEffect(() => {
        if (!isAuth()){
            router.replace('/');
        }
    })
  

    if (isAuth() && isAuth().role === 1){
        Router.push('/admin');
    } else if (isAuth() && isAuth().role === 2){
        Router.push('/super-admin');
    }
    
    return (
        <Layout>
            <div className="container-fluid">
                <div className="row mr-5 ml-5">
                    <div className="col-md-12 pt-5 pb-5">
                        <h2>User Dashboard</h2>
                    </div>
                    <div className="col-md-4">
                        <ul className="list-group">
                                <li className="list-group-item">
                                    <Link href="/user/createread/blog">
                                        <a>Create Blog</a>
                                    </Link>
                                </li>
                        </ul>
                    </div>
                    <div className="col-md-8">
                        right
                    </div>
                </div>                
            </div>
        </Layout>
    );
};

export default UserIndex;