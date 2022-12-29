import React, { FC } from 'react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

interface IProps {
    items: string[]
    active?: boolean
    setCurrentPick?: (pick: string | null) => void
    selectedPick?: string | null
}

const ListGroup: FC<IProps> = ({
    items,
    active,
    setCurrentPick,
    selectedPick,
}) => {
    const handleSelect = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        const text = e.currentTarget.innerHTML
        if (setCurrentPick) {
            selectedPick === text ? setCurrentPick(null) : setCurrentPick(text)
        }
    }

    console.log('pick', selectedPick)

    return (
        <>
            <div className="flex w-full my-8 overflow-hidden hover:overflow-auto max-h-80">
                <ul className="text-gray-900 bg-white rounded-lg w-96">
                    {items.map((item, index) => {
                        return (
                            <li
                                className={`w-full px-6 py-2 border-b border-gray-200 rounded-t-lg flex justify-between items-center ${
                                    active &&
                                    'hover:bg-gray-100 hover:cursor-pointer'
                                }`}
                                key={index}
                                onClick={active ? handleSelect : () => null}
                            >
                                {item}
                                {item === selectedPick && (
                                    <CheckCircleIcon className="w-6 text-green-500" />
                                )}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}

export default ListGroup
