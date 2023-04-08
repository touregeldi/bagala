import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const withAuth = (WrappedComponent) => {
    const Wrapper = (props) => {
        const { data: session, status } = useSession();
        const router = useRouter();

        if (status === 'loading') {
            return <div>Loading...</div>;
        }

        if (!session) {
            router.replace('/login');
            return <div>Redirecting to login page...</div>;
        }

        return <WrappedComponent {...props} />;
    };

    return Wrapper;
};

export default withAuth;
