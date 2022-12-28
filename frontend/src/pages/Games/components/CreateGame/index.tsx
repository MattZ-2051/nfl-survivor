import { FC, useState } from 'react'
import { useEvent } from 'effector-react'
import { toast } from 'react-toastify'

import { Button, Input, Modal } from '@components'
import { createGameFx } from '@api'

const CreateGame: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [code, setCode] = useState<string>()
    const [name, setName] = useState<string>()
    const createGame = useEvent(createGameFx)

    const handleCreateGame = () => {
        if (code && name && name.length > 0) {
            const codeTest = /[0-9]{4}/.test(code) && !!Number(code)
            if (codeTest) {
                createGame({ code: code, name: name })
                setIsModalOpen(false)
            } else {
                toast.error('Code needs to be 4 digit number')
            }
        } else {
            toast.error('Fill out all required fields')
        }
    }

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <Button
                type="outlined"
                label="Create Game"
                className="mt-8 text-xl bg-white hover:bg-white hover:bg-opacity-90"
                onClick={() => setIsModalOpen(true)}
            />
            <Modal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                title="Create Game"
                buttonTitle="Create Game"
                onSubmit={handleCreateGame}
            >
                <div className="w-full">
                    <div className="mt-4">
                        <p className="text-sm text-gray-500">
                            Enter 4 digit game code and create a game name.
                        </p>
                    </div>
                    <div className="mt-8">
                        <Input
                            placeHolder="Game Code"
                            label="Game Code"
                            id="floatingGameCode"
                            onChange={setCode}
                            type="text"
                            maxLength={4}
                        />
                    </div>
                    <div className="mt-6 mb-10">
                        <Input
                            placeHolder="Game Name"
                            label="Game Name"
                            id="floatingGameName"
                            onChange={setName}
                            type="text"
                        />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default CreateGame
