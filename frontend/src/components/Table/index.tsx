import { FC } from 'react'

interface IProps {
    headers: string[]
    body: string[][]
    onClick?: () => void
}

const Table: FC<IProps> = ({ headers, body, onClick }) => {
    return (
        <>
            <div className="flex flex-col w-full">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden rounded-lg">
                            <table className="min-w-full">
                                <thead className="bg-white border-b">
                                    <tr>
                                        {headers &&
                                            headers.map((header) => {
                                                return (
                                                    <>
                                                        <th
                                                            scope="col"
                                                            className="text-2xl font-medium text-gray-900 px-6 py-4 text-left"
                                                        >
                                                            {header}
                                                        </th>
                                                    </>
                                                )
                                            })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {body &&
                                        body.map((text) => {
                                            return (
                                                <>
                                                    <tr
                                                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 hover:cursor-pointer"
                                                        onClick={onClick}
                                                    >
                                                        {text.map((text) => {
                                                            return (
                                                                <>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">
                                                                        {text}
                                                                    </td>
                                                                </>
                                                            )
                                                        })}
                                                    </tr>
                                                </>
                                            )
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>{' '}
        </>
    )
}

export default Table
