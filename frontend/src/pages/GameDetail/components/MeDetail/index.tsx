import { FC } from 'react'
import type { GameProfile } from '@types'
import PrevPicks from '../PrevPicks'
import SelectPick from '../SelectPick'
import { Table } from '@components'

interface IProps {
    userProfile: GameProfile
}

const MeDetail: FC<IProps> = ({ userProfile }) => {
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
                                    <p>userProfile.current_pick</p>
                                ) : (
                                    <p>Select Pick</p>
                                )}
                                <div className="ml-4">
                                    <SelectPick
                                        prevPicks={userProfile.prev_picks}
                                    />
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
