import { FC, useState } from 'react'

interface IProps {
    selectedItem: string
    items: string[]
    setSelectedItem: (item: string) => void
}

const Dropdown: FC<IProps> = ({ selectedItem, items, setSelectedItem }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleClick = (newItem: string) => {
        setIsOpen((prevState) => !prevState)
        setSelectedItem(newItem)
    }
    return (
        <>
            <div className="flex justify-center">
                <div>
                    <div className="relative dropdown">
                        <div
                            onClick={() => setIsOpen((prevState) => !prevState)}
                            className="
          dropdown-toggle
          px-6
          py-2.5
          bg-blue-600
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-blue-700 hover:shadow-lg
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg active:text-white
          transition
          duration-150
          ease-in-out
          flex
          items-center
          whitespace-nowrap
          hover:cursor-pointer
        "
                        >
                            {selectedItem}
                            <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon="caret-down"
                                className="w-2 ml-2"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                                ></path>
                            </svg>
                        </div>
                        <ul
                            className={`max-h-[200px] overflow-x-scroll absolute z-50 float-left w-full py-2 m-0 mt-1 text-base text-left list-none bg-white border-none rounded-lg shadow-lg dropdown-menu min-w-max bg-clip-padding ${
                                !isOpen && 'hidden'
                            }`}
                            aria-labelledby="dropdownMenuButton2"
                        >
                            {items.map((text, index) => (
                                <li key={index}>
                                    <span
                                        className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100 hover:cursor-pointer"
                                        onClick={() => handleClick(text)}
                                    >
                                        {text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dropdown
