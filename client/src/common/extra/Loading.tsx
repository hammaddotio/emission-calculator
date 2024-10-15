import { Spin } from 'antd'
import React from 'react'

const Loading: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <Spin size="large" />
        </div>
    )
}

export default Loading
