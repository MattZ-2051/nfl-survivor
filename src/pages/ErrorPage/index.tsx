import { FC } from 'react'
import { useRouteError } from 'react-router-dom'

const ErrorPage: FC = (): JSX.Element => {
    const error = useRouteError()
    console.log('app error', error)
    return (
        <div>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error?.statusText || error?.message}</i>
            </p>
        </div>
    )
}

export default ErrorPage
