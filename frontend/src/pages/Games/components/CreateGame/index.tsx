import { FC, useState } from 'react'
import { Button, Input, Modal } from '@components'
import ActiveGames from '../ActiveGames'
import { useEvent } from 'effector-react'
import { createGameFx } from '@api'
import { toast } from 'react-toastify'

const CreateGame: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [code, setCode] = useState<string>()
    const [name, setName] = useState<string>()
    const createGame = useEvent(createGameFx)

    const handleCreateGame = () => {
        if (code && name) {
            const codeTest = /[0-9]{4}/.test(code) && !!Number(code)
            if (codeTest) {
                createGame({ code: code, name: name })
            } else {
                toast.error('Code needs to be 4 digit number')
            }
        } else {
            toast.error('Fill out all required fields')
        }
    }

    return (
        <div className="w-full h-full flex justify-center items-center flex-col">
            <Button
                type="outlined"
                label="Create Game"
                className="bg-white text-xl mt-8 hover:bg-white hover:bg-opacity-90"
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
            <h1 className="text-white py-8">Or</h1>
            <h1 className="text-white pb-8">Find a Game</h1>
            {/* <div className="bg-white p-12">
                <h1 className="">Create Game</h1>
            </div> */}
        </div>
    )
}

export default CreateGame
