import { FC } from 'react'
import { Button } from '@components'
import { routes } from '@routes'
import { createStoreConsumer, useEvent } from 'effector-react'
import { $user } from '@store'
import { sessionDeleteFx } from '@api/user'

const HeaderStoreConsumer = createStoreConsumer($user)

const Header: FC = () => {
    const logout = useEvent(sessionDeleteFx)
    const userLogout = () => {
        logout()
    }

    return (
        <HeaderStoreConsumer>
            {(user) => (
                <>
                    <nav
                        className="relative
        w-full
        flex flex-wrap
        items-center
        p-4
        bg-gray-100
        shadow-xl
        "
                    >
                        <div className="flex justify-between w-full">
                            <h3 className="text-black">{user?.username}</h3>
                            <div className="grid-cols-4 gap-4 flex">
                                <div>
                                    <Button
                                        type="outlined"
                                        label="Home"
                                        redirectTo={routes.home}
                                    />
                                </div>
                                <div>
                                    <Button
                                        type="outlined"
                                        label="Groups"
                                        redirectTo={routes.groups}
                                    />
                                </div>
                                {user ? (
                                    <div>
                                        <Button
                                            type="primary"
                                            label="Logout"
                                            onClick={userLogout}
                                        />
                                    </div>
                                ) : (
                                    <>
                                        <div>
                                            <Button
                                                type="primary"
                                                label="Signup"
                                            />
                                        </div>
                                        <div>
                                            <Button
                                                type="primary"
                                                label="Login"
                                                redirectTo={routes.login}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </nav>
                </>
            )}
        </HeaderStoreConsumer>
    )
}

export default Header
