import { ListGroupProps } from '@types'
import { FC } from 'react'

const ListGroup: FC<ListGroupProps> = ({ items }) => {
    return (
        <>
            <div className="flex w-full my-8">
                <ul className="text-gray-900 bg-white rounded-lg w-96">
                    {items.map((item, index) => (
                        <li
                            className="w-full px-6 py-2 border-b border-gray-200 rounded-t-lg"
                            key={index}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default ListGroup
