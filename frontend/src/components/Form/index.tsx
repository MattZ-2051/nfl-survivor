import { FC } from 'react'
import { Form as RouterForm, FormMethod } from 'react-router-dom'

interface IProps {
    children: React.ReactNode
    onSubmit: () => void
    method: FormMethod
}
const Form: FC<IProps> = ({ children, onSubmit, method }) => {
    return (
        <RouterForm method={method} onSubmit={onSubmit}>
            {children}
        </RouterForm>
    )
}

export default Form
