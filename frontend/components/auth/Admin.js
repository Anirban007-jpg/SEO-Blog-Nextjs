import { useEffect } from 'react';

import { isAuth } from '../../actions/auth';
import router from 'next/router';

const Admin = ({ children }) => {
    useEffect(() => {
        if (!isAuth()) {
            router.push(`/signin`);
        } else if (isAuth().role !== 0) {
            router.push(`/admin`);
        }
        else if (isAuth().role !== 2){
            router.push(`/admin`);
        } else if (isAuth().role === 1 && isAuth().role !== 0 && isAuth().role !== 2){
            router.push('/admin');
        }
    }, []);
    return <React.Fragment>{children}</React.Fragment>;
};

export default Admin;