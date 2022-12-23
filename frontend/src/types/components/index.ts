import React from 'react'

export type ButtonType = 'primary' | 'outlined'

export type TabProps = {
    title: string
    content: React.ReactNode
}

export type Tabs = TabProps[]

export type ListGroupProps = {
    items: string[]
}
