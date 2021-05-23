import router from 'next/router';
import { useEffect } from 'react';
import { isAuth } from '../../actions/auth';

const Private = ({children}) => {
    useEffect(() => {
        if (!isAuth()){
            router.push('/signin');
        } else if (isAuth().role !== 1){
            router.push('/user');
        } else if (isAuth().role !== 2){
            router.push('/user');
        } else if (isAuth().role === 0 && isAuth().role !== 1 && isAuth().role !== 2){
            router.push('/user');
        }
        
    }, [])

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}

export default Private;