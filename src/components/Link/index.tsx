import { FC } from 'react'
import { NavLink } from 'react-router-dom'

interface IProps {
    text: string
    to: string
}
const Link: FC<IProps> = ({ text, to }) => {
    return <NavLink to={to}>{text}</NavLink>
}

export default Link
