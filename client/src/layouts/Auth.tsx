import React from 'react'
import Loading from '../components/antdComponents/Loading'

const Auth: React.FC = ({ children, loading }: any) => {

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
