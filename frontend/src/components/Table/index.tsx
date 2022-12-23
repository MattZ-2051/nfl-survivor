import { Game } from '@types'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Pagination from '../Pagination'

interface IProps {
    headers: string[]
    body: (string | React.ReactNode)[][]
    games?: Game[]
    active?: boolean
}

const Table: FC<IProps> = ({ headers, body, games, active }) => {
    const navigate = useNavigate()
    const [showRows, setShowRows] = useState<(string | React.ReactNode)[][]>()
    const [paginationIndex, setPaginationIndex] = useState<number>(0)

    useEffect(() => {
        if (body.length > 4) {
            setShowRows(
                body.slice(paginationIndex * 4, paginationIndex * 4 + 4)
            )
        } else {
            setShowRows(body)
        }
    }, [paginationIndex, body])

    return (
        <>
            <div className="flex flex-col w-full">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="rounded-lg">
                            <table className="min-w-full">
                                <thead className="bg-white border-b">
                                    <tr>
                                        {headers &&
                                            headers.map((header, index) => {
                                                return (
                                                    <th
                                                        scope="col"
                                                        key={index}
                                                        className="px-6 py-4 text-2xl font-medium text-left text-gray-900"
                                                    >
                                                        {header}
                                                    </th>
                                                )
                                            })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {showRows &&
                                        showRows.map((item, index) => {
                                            return (
                                                <tr
                                                    className={`transition duration-300 ease-in-out bg-white border-b ${
                                                        active &&
                                                        'hover:bg-gray-100 hover:cursor-pointer'
                                                    }`}
                                                    onClick={() =>
                                                        games
                                                            ? navigate(
                                                                  `${games[index].id}`
                                                              )
                                                            : null
                                                    }
                                                    key={index}
                                                >
                                                    {item.map(
                                                        (content, index) => {
                                                            return (
                                                                <td
                                                                    className="px-6 py-4 text-base font-medium text-gray-900 whitespace-nowrap"
                                                                    key={index}
                                                                >
                                                                    {content}
                                                                </td>
                                                            )
                                                        }
                                                    )}
                                                </tr>
                                            )
                                        })}
                                </tbody>
                            </table>
                        </div>
                        {body.length > 4 && (
                            <div className="mt-12">
                                <Pagination
                                    index={paginationIndex}
                                    length={body.length}
                                    setPagination={setPaginationIndex}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>{' '}
        </>
    )
}

export default Table
