import { isAuth } from "../../actions/auth";
import Layout from "../../components/Layout";

  
const SuperAdminIndex = () => {

    if (isAuth().role === 0){
        router.push('/user');
    } else if (isAuth().role === 1){
        router.push('/admin');
    }

    return (
        <Layout>
            <h2>Super Admin Dashboard</h2>
        </Layout>
    );
};

export default SuperAdminIndex;