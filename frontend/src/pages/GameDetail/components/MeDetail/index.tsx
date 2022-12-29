import { FC, useEffect, useState } from 'react'
import { GameProfile, Team } from '@types'
import PrevPicks from '../PrevPicks'
import SelectPick from '../SelectPick'
import { Table } from '@components'
import { useStore } from 'effector-react'
import { $teams } from '@store'

interface IProps {
    userProfile: GameProfile
}

const MeDetail: FC<IProps> = ({ userProfile }) => {
    const teams = useStore($teams)
    return (
        <>
            <div className="flex flex-col items-center w-full">
                <Table
                    headers={['Current Pick', 'Previous Picks']}
                    body={[
                        [
                            <div
                                key={userProfile.id}
                                className="flex items-center"
                            >
                                {userProfile.current_pick ? (
                                    <p>{userProfile.current_pick.team_name}</p>
                                ) : (
                                    <p>Select Pick</p>
                                )}
                                <div className="ml-4">
                                    {teams && userProfile && (
                                        <SelectPick
                                            prevPicks={userProfile.prev_picks}
                                            availablePicks={teams?.filter(
                                                (team) => {
                                                    if (
                                                        !userProfile?.prev_picks?.some(
                                                            (prevPick) =>
                                                                prevPick.scrapy_id ===
                                                                team.scrapy_id
                                                        )
                                                    ) {
                                                        return team
                                                    }
                                                }
                                            )}
                                        />
                                    )}
                                </div>
                            </div>,
                            userProfile.prev_picks &&
                            userProfile.prev_picks.length > 0 ? (
                                <PrevPicks profile={userProfile} />
                            ) : (
                                'No picks made yet'
                            ),
                        ],
                    ]}
                />
            </div>
        </>
    )
}

export default MeDetail
