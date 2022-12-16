import { FC } from 'react'
import { Button, Form, Input } from '@components'
import { loginFx } from '@api'
import { useEvent } from 'effector-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { routes } from '@routes'

const Login: FC = () => {
    const login = useEvent(loginFx)
    const [username, setUsername] = useState<string>()
    const [password, setPassword] = useState<string>()
    const userLogin = async () => {
        if (username && password) {
            login({
                username,
                password,
            })
        }
    }
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="flex justify-center bg-white p-12 rounded-lg">
                <div>
                    <Form onSubmit={userLogin} method="post">
                        <p className="text-center text-5xl font-bold mb-16">
                            Login
                        </p>
                        <div className="mb-6 xl:w-96">
                            <Input
                                id="floatingUsername"
                                placeHolder="Username"
                                type="text"
                                onChange={setUsername}
                                label="Username"
                            />
                        </div>
                        <div className="mb-2 xl:w-96">
                            <Input
                                id="floatingPassword"
                                placeHolder="Password"
                                type="password"
                                onChange={setPassword}
                                label="Password"
                            />
                        </div>
                        <div className="w-full flex text-xs opacity-70 mb-4">
                            <p>{"Don't have an account?"} </p>
                            <Link
                                className="ml-1 underline hover:text-blue-500"
                                to={routes.signup}
                            >
                                Signup
                            </Link>
                        </div>
                        <Button
                            label="Login"
                            type="primary"
                            form={true}
                            className="w-full mt-12 text-base"
                        />
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login
