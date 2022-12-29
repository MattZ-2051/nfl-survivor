import { getTeamsFx } from '@api'
import { Dropdown, Spinner, Table } from '@components'
import { $teams } from '@store'
import { Team, TeamSchedule } from '@types'
import { useEvent, useStore } from 'effector-react'
import { FC, useEffect, useState } from 'react'

const TeamsTable: FC = () => {
    const getTeams = useEvent(getTeamsFx)
    const teams = useStore($teams)
    const [selectedTeamId, setSelectedTeamId] = useState<string>('lac')
    const [teamSchedule, setTeamSchedule] = useState<TeamSchedule[]>()
    const [showTeam, setShowTeam] = useState<Team>()
    useEffect(() => {
        getTeams()
    }, [])

    useEffect(() => {
        if (teams) {
            const team = teams.find((team) => team.scrapy_id === selectedTeamId)
            if (team) {
                setShowTeam(team)
                setTeamSchedule(JSON.parse(team.schedule))
            }
        }
    }, [teams, selectedTeamId])

    return teams ? (
        <>
            <div className="flex items-center justify-between w-full px-8 mt-12">
                <p className="text-3xl font-normal">{showTeam?.team_name}</p>
                <Dropdown
                    selectedItem={selectedTeamId}
                    items={teams.map((team) => team.scrapy_id)}
                    setSelectedItem={setSelectedTeamId}
                />
            </div>
            {teamSchedule && showTeam && (
                <div className="min-h-[400px]">
                    <Table
                        headers={['Week', 'Team', 'Result', 'Score']}
                        body={[
                            ...teamSchedule.map((item) => {
                                return [
                                    item.week,
                                    item.team,
                                    item.result,
                                    item.score,
                                ]
                            }),
                        ]}
                    />
                </div>
            )}
        </>
    ) : (
        <>
            <div className="flex items-center justify-center">
                <p className="mr-2 text-xl font-light">loading teams</p>
                <Spinner />
            </div>
        </>
    )
}

export default TeamsTable
