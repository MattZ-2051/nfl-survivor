import { FC, useState } from 'react'
import { Button, ListGroup, Modal } from '@components'
import type { GamePick, Team } from '@types'
import { useEvent } from 'effector-react'
import { toast } from 'react-toastify'
import { updateGamePickFx } from '@api'

interface IProps {
    prevPicks: GamePick[] | null
    availablePicks: Team[] | null
}
const SelectPick: FC<IProps> = ({ availablePicks }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [selectedPick, setSelectedPick] = useState<string | null | string[]>(
        null
    )
    const updateGamePick = useEvent(updateGamePickFx)

    const updatePick = () => {
        if (!selectedPick) {
            toast.error('Select a Team')
            return
        }
        const gameId = Number.parseInt(
            window.location.pathname.split('/')[2],
            10
        )
        const newPick = availablePicks?.find(
            (team) => team.team_name === selectedPick
        )?.scrapy_id
        if (newPick) {
            updateGamePick({
                newPick,
                gameId,
            })
        }

        setIsModalOpen(false)
    }

    return (
        <>
            <Button
                label="Update"
                type="outlined"
                onClick={() => setIsModalOpen(true)}
            />
            <Modal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                title="Update Current Pick"
                buttonTitle="Update"
                onSubmit={updatePick}
            >
                {availablePicks ? (
                    <ListGroup
                        items={availablePicks.map((pick) => pick.team_name)}
                        active
                        setCurrentPick={setSelectedPick}
                        selectedPick={selectedPick}
                    />
                ) : (
                    <h1>No more picks available</h1>
                )}
            </Modal>
        </>
    )
}

export default SelectPick
