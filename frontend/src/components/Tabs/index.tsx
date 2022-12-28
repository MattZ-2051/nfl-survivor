import { FC, useState } from 'react'
import { TabsType } from '@types'

interface IProps {
    tabs: TabsType
}

const Tabs: FC<IProps> = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState<number>(0)
    return (
        <>
            <ul
                className="flex flex-col flex-wrap pl-0 mb-4 list-none bg-white border-b-0 nav nav-tabs nav-justified md:flex-row"
                id="tabs"
                role="tablist"
            >
                {tabs.map((tab, index) => {
                    return (
                        <li
                            className="flex-grow text-center nav-item"
                            role="presentation"
                            key={index}
                        >
                            <span
                                className={`
  nav-link
  w-full
  block
  font-medium
  text-xs
  leading-tight
  uppercase
  border-x-0 border-t-0 border-b-2 border-transparent
  px-6
  py-3
  my-2
  hover:border-transparent hover:bg-gray-100
  focus:border-transparent
  hover:cursor-pointer
  ${activeTab === index ? 'active' : ''}`}
                                onClick={() => setActiveTab(index)}
                                role="tab"
                            >
                                {tab.title}
                            </span>
                        </li>
                    )
                })}
            </ul>

            <div className="tab-content">
                {tabs.map((tab, index) => {
                    return (
                        <div key={index}>
                            <div
                                className={`tab-pane fade ${
                                    activeTab === index
                                        ? 'show active'
                                        : 'hidden'
                                }`}
                                role="tabpanel"
                            >
                                {tab.content}
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Tabs
