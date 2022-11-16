import { FC } from 'react'
import { Form as RouterForm } from 'react-router-dom'

interface IProps {
    children: JSX.Element | JSX.Element[]
    onSubmit: () => void
}
const Form: FC<IProps> = ({ children, onSubmit }) => {
    return (
        <RouterForm method="post" onSubmit={onSubmit}>
            {children}
        </RouterForm>
    )
}

export default Form
