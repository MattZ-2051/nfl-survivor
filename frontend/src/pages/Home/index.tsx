import { FC } from 'react'

import { Header } from '@layout'
import { useEvent } from 'effector-react'
import { getUserProfileFx, getTeamsFx, getGamesFx } from '@api'

const Home: FC = (): JSX.Element => {
    const test = useEvent(getUserProfileFx)
    const testCrawl = useEvent(getTeamsFx)
    const testTeams = useEvent(getGamesFx)

    return (
        <>
            <Header />
            <div>
                <h1>asdfasdfsdfssd Page</h1>
                <button onClick={() => test()}>test api</button>
                <button onClick={() => testCrawl()}>test crawl</button>
                <button onClick={() => testTeams()}>test teams</button>
            </div>
        </>
    )
}

export default Home
