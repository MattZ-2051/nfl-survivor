import { FC } from 'react'

const Spinner: FC = () => {
    return (
        <div className="flex justify-center items-center">
            <div
                className="spinner-border animate-spin inline-block w-8 h-8 border-3 rounded-full"
                role="status"
            >
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Spinner
