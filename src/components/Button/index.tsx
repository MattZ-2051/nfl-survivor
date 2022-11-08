import { FC } from 'react'

type ButtonType = 'primary' | 'outlined'

interface IProps {
    children?: JSX.Element
    type: ButtonType
    onClick?: () => void
    classes?: string
    label: string
}

const buttonTypeMap: Record<ButtonType, Record<string, string>> = {
    primary: {
        class: 'inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out',
    },
    outlined: {
        class: 'inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out',
    },
}
const Button: FC<IProps> = ({ label, children, type, onClick, classes }) => {
    return (
        <button
            type="button"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            className={`${(buttonTypeMap[type].class, classes)}`}
            onClick={onClick}
        >
            {label}
        </button>
    )
}

export default Button
