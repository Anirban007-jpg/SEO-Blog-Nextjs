import Layout from '../../components/Layout';
import { isAuth } from '../../actions/auth';
import router from 'next/router';

const AdminIndex = () => {
    
    if (isAuth().role === 0){
        router.push('/user');
    } else if (isAuth().role === 2){
        router.push('/super-admin');
    }
    
    return (
        <Layout>
                <h2>Admin Dashboard</h2>
        </Layout>
    );
};

export default AdminIndex;
