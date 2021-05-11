import { isAuth } from '../../actions/auth';
import Layout from '../../components/Layout';
import Private from '../../components/auth/Private'
import Router  from 'next/router';
import Cookies from 'js-cookie';

const UserIndex = () => {
    
    // if (!isAuth()){
        // Router.push('/signin');
    // }

    if (isAuth().role === 1){
        router.push('/admin');
    } else if (isAuth().role === 2){
        router.push('/super-admin');
    }
    
    return (
        <Layout>
            <Private>
                <h2>User Dashboard</h2>
                {/* {JSON.stringify(Cookies.get('token'))} */}
            </Private>
        </Layout>
    );
};

export default UserIndex;