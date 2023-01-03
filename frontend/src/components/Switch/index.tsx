import { FC } from 'react'

const Switch: FC = () => {
    return (
        <>
            <div className="flex justify-center">
                <div>
                    <div className="form-check form-switch mb-7">
                        <input
                            className="float-left h-5 -ml-10 align-top bg-gray-300 bg-no-repeat bg-contain rounded-full shadow-sm appearance-none cursor-pointer form-check-input w-9 focus:outline-none"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault56"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Switch
