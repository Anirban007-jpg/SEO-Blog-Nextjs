import Layout from '../../../components/Layout';
import { isAuth } from '../../../actions/auth';
import router from 'next/router';
import BlogCreate from '../../../components/crud/BlogCreate';
import { useEffect } from 'react';

const AdminIndex = () => {

    useEffect(() => {
        if (!isAuth()){
            router.replace('/');
        }
    })
     
    if (isAuth() && isAuth().role === 0){
        router.push('/user');
    } else if (isAuth() && isAuth().role === 2){
        router.push('/super-admin');
    }
    
    return (
        <Layout>
                <div className="container-fluid">
                    <div className="row mr-5 ml-5">
                        <div className="col-md-12 pt-5 pb-5 text-center">
                            <h2>Blog Management</h2>
                        </div>
                        <div className="col-md-12">
                            <BlogCreate />
                        </div>
                    </div>                
                </div>
        </Layout>
    );
};

export default AdminIndex;
