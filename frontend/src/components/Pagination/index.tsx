import { FC, useEffect, useState } from 'react'

interface IProps {
    length: number
    index: number
    setPagination: (index: number) => void
}
const Pagination: FC<IProps> = ({ length, index, setPagination }) => {
    const [current, setCurrent] = useState<number>(index + 1)

    useEffect(() => {
        setPagination(current - 1)
    }, [current])

    return (
        <div className="flex justify-center">
            <nav>
                <ul className="flex list-style-none">
                    {current - 1 > 0 && (
                        <>
                            <li className="page-item">
                                <span
                                    className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300  text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none hover:cursor-pointer"
                                    tabIndex={-1}
                                    onClick={() =>
                                        setCurrent((prevState) => prevState - 1)
                                    }
                                >
                                    Previous
                                </span>
                            </li>

                            <li className="page-item">
                                <span className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300  text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none">
                                    {current - 1}
                                </span>
                            </li>
                        </>
                    )}

                    <li className="page-item active">
                        <span className="page-link relative block py-1.5 px-3 rounded border-0 bg-blue-600 outline-none transition-all duration-300  text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md">
                            {current}
                            <span className="visually-hidden">(current)</span>
                        </span>
                    </li>
                    {current < length / 4 && (
                        <>
                            <li className="page-item">
                                <span className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300  text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none">
                                    {current + 1}
                                </span>
                            </li>
                            <li className="page-item">
                                <span
                                    className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300  text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none hover:cursor-pointer"
                                    onClick={() =>
                                        setCurrent((prevState) => prevState + 1)
                                    }
                                >
                                    Next
                                </span>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    )
}

export default Pagination
