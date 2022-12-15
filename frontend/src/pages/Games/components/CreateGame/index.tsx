import { FC, useState } from 'react'
import { Button, Modal } from '@components'
import ActiveGames from '../ActiveGames'

const CreateGame: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
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
                subText="testing sub test"
                buttonTitle="Create Game"
            />

            <h1 className="text-white py-8">Or</h1>
            <h1 className="text-white pb-8">Find a Game</h1>

            <ActiveGames />
            {/* <div className="bg-white p-12">
                <h1 className="">Create Game</h1>
            </div> */}
        </div>
    )
}

export default CreateGame
