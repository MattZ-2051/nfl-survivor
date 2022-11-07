import { FC } from 'react'

interface IProps {
    children: JSX.Element
}
const Button: FC<IProps> = ({ children }) => {
    return <button>{children}</button>
}

export default Button
