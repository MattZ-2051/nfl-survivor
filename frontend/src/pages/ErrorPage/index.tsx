import { FC } from 'react'
import { Navigate, useRouteError } from 'react-router-dom'
import type { PageError } from '@types'

const ErrorPage: FC = (): JSX.Element => {
    const error = useRouteError()
    const typedError = error as PageError

    return typedError.status === 404 ? (
        <Navigate to="/home" />
    ) : (
        <div>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{typedError?.statusText || typedError?.message}</i>
            </p>
        </div>
    )
}

export default ErrorPage
