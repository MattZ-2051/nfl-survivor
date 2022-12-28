import { FC, useState } from 'react'

import { Button, Modal, ListGroup } from '@components'
import { GameProfile } from '@types'

interface IProps {
    profile: GameProfile
}
const PrevPicks: FC<IProps> = ({ profile }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    return (
        <>
            {profile?.prev_picks && (
                <div>
                    <Button
                        type="outlined"
                        label="Previous Picks"
                        className="w-full text-base"
                        onClick={() => setIsModalOpen(true)}
                    />
                    <Modal
                        open={isModalOpen}
                        setOpen={setIsModalOpen}
                        title="Previous Picks"
                        buttonTitle="test"
                    >
                        <ListGroup
                            items={profile.prev_picks.map(
                                (team) => team.scrapy_id
                            )}
                        />
                    </Modal>
                </div>
            )}
        </>
    )
}

export default PrevPicks
