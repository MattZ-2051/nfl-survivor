import { FC } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

type ButtonType = 'primary' | 'outlined'

interface IProps {
    type: ButtonType
    onClick?: () => void | undefined
    classes?: string
    label: string
    redirectTo?: string
    form?: boolean
}

const buttonTypeMap: Record<ButtonType, Record<string, string>> = {
    primary: {
        class: 'inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out',
    },
    outlined: {
        class: 'inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out',
    },
}

const Button: FC<IProps> = ({
    label,
    type,
    onClick,
    classes,
    redirectTo,
    form,
}) => {
    if (redirectTo) {
        return (
            <Link
                type="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                className={clsx(buttonTypeMap[type].class, classes)}
                to={redirectTo}
            >
                {label}
            </Link>
        )
    }
    return (
        <button
            type={form ? 'submit' : 'button'}
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            className={clsx(buttonTypeMap[type].class, classes)}
            onClick={onClick}
        >
            {label}
        </button>
    )
}

export default Button
