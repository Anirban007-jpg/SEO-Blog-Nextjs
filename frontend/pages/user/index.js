import { isAuth } from '../../actions/auth';
import Layout from '../../components/Layout';

const UserIndex = () => {

    if (isAuth().role === 1){
        router.push('/admin');
    } else if (isAuth().role === 2){
        router.push('/super-admin');
    }
    
    return (
        <Layout>
                <h2>User Dashboard</h2>
        </Layout>
    );
};

export default UserIndex;