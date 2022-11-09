import { FC } from 'react'
import Button from '@components/Button'
import { routes } from '@routes'

const Header: FC = () => {
    return (
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
                <h3 className="text-black">LOGO</h3>
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
                    <div>
                        <Button type="primary" label="Signup" />
                    </div>
                    <div>
                        <Button type="primary" label="Login" />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header
