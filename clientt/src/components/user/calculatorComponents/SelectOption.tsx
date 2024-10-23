import { Select } from 'antd'
import React, { ReactNode } from 'react'

interface SelectOptionsProps {
    optionsData?: any;
    onChange: any;
    placeholder: string;
    children?: ReactNode;
    value?: string | string[];
    allowClear?: boolean;
}
const SelectOption: React.FC<SelectOptionsProps> = ({ children, optionsData, onChange, placeholder, value, allowClear }) => {
    return (
        <Select
            allowClear={allowClear}
            mode="multiple"
            placeholder={placeholder}
            options={optionsData}
            onChange={onChange}
            size={'large'}
            value={value}
            className="w-full mb-4 sm:mb-6 border border-blue-200 rounded focus:border-blue-400 focus:outline-none bg-blue-50"
        >
            {children}
        </Select>
    )
}

export default SelectOption
