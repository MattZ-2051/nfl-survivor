import React, { FC } from 'react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

interface IProps {
    items: string[]
    active?: boolean
    setCurrentPick?: (
        pick: React.SetStateAction<string | string[] | null>
    ) => void
    selectedPick?: string | string[] | null
    multiple?: boolean
}

const ListGroup: FC<IProps> = ({
    items,
    active,
    setCurrentPick,
    selectedPick,
    multiple,
}) => {
    const handleSelect = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        const text = e.currentTarget.innerHTML
        if (setCurrentPick) {
            if (multiple && Array.isArray(selectedPick)) {
                selectedPick.includes(text)
                    ? setCurrentPick(
                          selectedPick.filter((pick) => pick !== text)
                      )
                    : setCurrentPick((prevState) =>
                          prevState ? [...prevState, text] : null
                      )
            } else {
                console.log('here', text, selectedPick)
                selectedPick === text
                    ? setCurrentPick(null)
                    : setCurrentPick(text)
            }
        }
    }

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
                            >
                                <span
                                    onClick={active ? handleSelect : () => null}
                                    className="w-full"
                                >
                                    {item}
                                </span>
                                {(item === selectedPick ||
                                    selectedPick?.includes(item)) && (
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
