import { FC } from 'react'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Button from '../Button'

interface IProps {
    open: boolean
    setOpen: (open: boolean) => void
    title: string
    buttonTitle: string
    onSubmit?: () => void
    children: React.ReactNode
}
const Modal: FC<IProps> = ({
    open,
    setOpen,
    title,
    buttonTitle,
    onSubmit,
    children,
}) => {
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={setOpen}
            >
                <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                                <div className="w-full sm:flex sm:items-start">
                                    <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-2xl font-medium leading-6 text-gray-900"
                                        >
                                            {title}
                                        </Dialog.Title>
                                        {children}
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                                {onSubmit ? (
                                    <>
                                        <Button
                                            label={buttonTitle}
                                            type="primary"
                                            onClick={onSubmit}
                                            className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                        />
                                        <Button
                                            label="Close"
                                            type="outlined"
                                            onClick={() => setOpen(false)}
                                            className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                        />
                                    </>
                                ) : (
                                    <Button
                                        label="Close"
                                        type="primary"
                                        onClick={() => setOpen(false)}
                                        className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                    />
                                )}
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default Modal
