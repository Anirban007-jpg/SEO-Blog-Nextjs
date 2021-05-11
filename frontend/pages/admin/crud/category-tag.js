import Layout from '../../../components/Layout';
import { isAuth } from '../../../actions/auth';
import router from 'next/router';
import Link from 'next/link';
import Category from '../../../components/crud/Category';
import Tag from '../../../components/crud/Tag';

const AdminIndex = () => {
    
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
                            <h2>Create Categories and tags</h2>
                        </div>
                        <div className="col-md-6">
                            <h2>Manage Categories</h2><hr/>
                            <Category />
                        </div>
                        <div className="col-md-6">
                            <h2>Manage Tags</h2><hr/>
                            <Tag />
                        </div>
                    </div>                
                </div>
        </Layout>
    );
};

export default AdminIndex;
