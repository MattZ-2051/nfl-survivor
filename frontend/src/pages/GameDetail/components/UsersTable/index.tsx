import { FC, useEffect, useState } from 'react'
import { Button, ListGroup, Modal, Table } from '@components'
import { GameProfile } from '@types'

interface IProps {
    gameUsers: GameProfile[]
}
const UsersTable: FC<IProps> = ({ gameUsers }) => {
    const [selectedPrevPick, setSelectedPrevPick] = useState<string>()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    useEffect(() => {
        if (gameUsers) {
            if (
                gameUsers?.[0]?.prev_picks?.[0]?.scrapy_id &&
                !selectedPrevPick
            ) {
                setSelectedPrevPick(gameUsers[0].prev_picks[0].scrapy_id)
            } else {
                setSelectedPrevPick('None')
            }
        }
    }, [])

    return (
        <div>
            <h1>Users</h1>
            <Table
                headers={['Username', 'Current Pick', 'Previous Picks']}
                body={[
                    ...gameUsers.map((item, index) => {
                        return [
                            item.user.user.username,
                            item.current_pick
                                ? item.current_pick?.scrapy_id
                                : 'None',
                            item.prev_picks ? (
                                <span key={index}>
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
                                            items={item.prev_picks.map(
                                                (team) => team.scrapy_id
                                            )}
                                        />
                                    </Modal>
                                </span>
                            ) : (
                                'None'
                            ),
                        ]
                    }),
                ]}
            />
        </div>
    )
}

// <span key={index}>
// <Dropdown
//     selectedItem={selectedPrevPick}
//     setSelectedItem={setSelectedPrevPick}
//     items={
//         item.prev_picks
//             ? item.prev_picks.map(
//                   (team) => team.scrapy_id
//               )
//             : ['None']
//     }
// />
// </span>

export default UsersTable
