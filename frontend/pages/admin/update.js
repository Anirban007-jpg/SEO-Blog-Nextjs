import Layout from '../../components/Layout';
// import Private from '../../components/auth/Private';
import ProfileUpdate from '../../components/ProfileUpdate';
import Link from 'next/link';

const UserProfileUpdate = () => {
    return (
        <Layout>
                <div className="container-fluid">
                    <div className="row">
                        <ProfileUpdate />
                    </div>
                </div>
        </Layout>
    );
};

export default UserProfileUpdate;