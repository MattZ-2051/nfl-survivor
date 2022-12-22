import type { Tabs as TabsType } from '@types'
import { FC, useState } from 'react'

interface IProps {
    tabs: TabsType
}
const Tabs: FC<IProps> = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState<number>(0)
    return (
        <>
            <ul
                className="
            bg-white
nav
nav-tabs
nav-justified
flex flex-col
md:flex-row
flex-wrap
list-none
border-b-0
pl-0
mb-4
"
                id="tabs"
                role="tablist"
            >
                {tabs.map((tab, index) => {
                    return (
                        <>
                            <li
                                className="nav-item flex-grow text-center"
                                role="presentation"
                                key={index}
                            >
                                <a
                                    href={`#tabs-${tab.title}`}
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
  ${activeTab === index ? 'active' : ''}`}
                                    id={`tabs-${tab.title}`}
                                    onClick={() => setActiveTab(index)}
                                    role="tab"
                                >
                                    {tab.title}
                                </a>
                            </li>
                        </>
                    )
                })}
            </ul>

            <div className="tab-content" id="tabs-tabContentJustify">
                {tabs.map((tab, index) => {
                    return (
                        <>
                            <div
                                className={`tab-pane fade ${
                                    activeTab === index ? 'show active' : ''
                                }`}
                                role="tabpanel"
                                key={index}
                            >
                                {tab.content}
                            </div>
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default Tabs
