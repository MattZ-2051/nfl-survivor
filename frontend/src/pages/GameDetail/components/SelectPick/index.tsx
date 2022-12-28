import { FC, useEffect, useState } from 'react'
import { Button, ListGroup, Modal } from '@components'
import type { Team } from '@types'
import { useStore } from 'effector-react'
import { $teams } from '@store'
import { toast } from 'react-toastify'

interface IProps {
    prevPicks: Team[] | null
}
const SelectPick: FC<IProps> = ({ prevPicks }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [availablePicks, setAvailablePicks] = useState<Team[]>()
    const [selectedPick, setSelectedPick] = useState<string | null>()
    const teams = useStore($teams)

    const updatePick = () => {
        if (!selectedPick) {
            toast.error('Select a Team')
        }
    }

    useEffect(() => {
        if (prevPicks && prevPicks.length > 0) {
            setAvailablePicks(
                teams?.filter((team) => {
                    if (
                        !prevPicks.some(
                            (prevPick) => prevPick.scrapy_id === team.scrapy_id
                        )
                    ) {
                        return team
                    }
                })
            )
        } else {
            teams && setAvailablePicks(teams)
        }
    }, [prevPicks])

    return (
        <>
            <Button
                label="Update"
                type="outlined"
                onClick={() => setIsModalOpen(true)}
            />
            {availablePicks && (
                <Modal
                    open={isModalOpen}
                    setOpen={setIsModalOpen}
                    title="Update Current Pick"
                    buttonTitle="Update"
                    onSubmit={updatePick}
                >
                    <ListGroup
                        items={availablePicks.map((pick) => pick.scrapy_id)}
                        active
                        setCurrentPick={setSelectedPick}
                        selectedPick={selectedPick}
                    />
                </Modal>
            )}
        </>
    )
}

export default SelectPick
