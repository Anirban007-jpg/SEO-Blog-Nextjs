import Layout from '../../components/Layout';
import { isAuth } from '../../actions/auth';
import router from 'next/router';
import Link from 'next/link';

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
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Admin Dashboard</h2>
                        </div>
                        <div className="col-md-4">
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <Link href="/admin/crud/category-tag">
                                        <a>Create Category</a>
                                    </Link>
                                </li>
                                <li className="list-group-item">
                                    <Link href="/admin/crud/category-tag">
                                        <a>Create Tag</a>
                                    </Link>
                                </li>
                                <li className="list-group-item">
                                    <Link href="/admin/crud/blog">
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

export default AdminIndex;
