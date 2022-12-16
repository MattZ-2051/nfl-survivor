import { FC } from 'react'

interface IProps {
    onChange: (value: string) => void
    label: string
    id: string
    type: 'text' | 'password' | 'number'
    placeHolder: string
    maxLength?: number
}

const Input: FC<IProps> = ({
    onChange,
    label,
    id,
    type,
    placeHolder,
    maxLength,
}) => {
    return (
        <>
            <div className="form-floating">
                <input
                    type={type}
                    maxLength={maxLength}
                    className="form-control
block
w-full
px-3
py-1.5
text-base
font-normal
text-gray-700
bg-white bg-clip-padding
border border-solid border-gray-300
rounded
transition
ease-in-out
m-0
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id={id}
                    placeholder={placeHolder}
                    onChange={(e) => onChange(e.target.value)}
                />
                <label htmlFor={id} className="text-gray-700">
                    {label}
                </label>
            </div>
        </>
    )
}

export default Input
