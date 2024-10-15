import { Button } from 'antd'
import React from 'react'

const Error = ({ error }: any) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen  p-4 rounded-md border ">
            <h2 className="text-3xl font-semibold mb-2">Oops! Something went wrong.</h2>
            <p className="text-xl mb-4">{`Error: ${error}`}</p>
            <Button
                type="primary"
                onClick={() => window.location.reload()}
                className="mt-4"
            >
                Refresh
            </Button>
        </div>
    )
}

export default Error
