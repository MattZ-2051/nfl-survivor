import { FC } from 'react'
import { useRouteError } from 'react-router-dom'
import type { PageError } from '@types'

const ErrorPage: FC = (): JSX.Element => {
    const error = useRouteError()
    const typedError = error as PageError
    return (
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
