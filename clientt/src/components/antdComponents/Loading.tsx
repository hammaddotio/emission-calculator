import { Spin } from 'antd'
import React from 'react'

const Loading: React.FC = () => {
    return (
        <div>
            <Spin spinning fullscreen />
        </div>
    )
}

export default Loading
