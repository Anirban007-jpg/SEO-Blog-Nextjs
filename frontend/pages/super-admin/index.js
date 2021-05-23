import { Router } from "next/router";
import { isAuth } from "../../actions/auth";
import Layout from "../../components/Layout";

  
const SuperAdminIndex = () => {

    if (isAuth() && isAuth().role === 0){
        Router.push('/user');
    } else if (isAuth() && isAuth().role === 1){
        Router.push('/admin');
    }

    return (
        <Layout>
            <h2>Super Admin Dashboard</h2>
        </Layout>
    );
};

export default SuperAdminIndex;