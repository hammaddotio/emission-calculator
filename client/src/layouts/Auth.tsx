import React, { ReactNode } from 'react'
import Loading from '../components/antdComponents/Loading'

interface AuthInterface {
    children?: ReactNode;
    loading: boolean;
}

const Auth: React.FC<AuthInterface> = ({ children, loading }: any) => {

    if (loading) {
        return <Loading />
    }

    return (
        <>
            {children}
        </>
    )
}

export default Auth
