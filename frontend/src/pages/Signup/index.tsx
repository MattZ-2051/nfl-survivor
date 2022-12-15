import { FC } from 'react'
import { Button, Form, Input } from '@components'
import { signupFx } from '@api'
import { useEvent } from 'effector-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { routes } from '@routes'

const Signup: FC = () => {
    const signup = useEvent(signupFx)
    const [username, setUsername] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [confirmPassword, setConfirmPassword] = useState<string>()
    const userSignup = async () => {
        if (username && password && confirmPassword) {
            signup({
                username,
                password,
                confirmPassword,
            })
        }
    }
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="flex justify-center bg-white p-12 rounded-lg">
                <div>
                    <Form onSubmit={userSignup} method="post">
                        <p className="text-center text-5xl font-bold mb-16">
                            Signup
                        </p>
                        <div className="form-floating mb-4 xl:w-96">
                            <Input
                                id="floatingUsername"
                                placeHolder="Username"
                                type="text"
                                onChange={setUsername}
                                label="Username"
                            />
                        </div>
                        <div className="form-floating mb-4 xl:w-96">
                            <Input
                                id="floatingPassword"
                                placeHolder="Password"
                                type="password"
                                onChange={setPassword}
                                label="Password"
                            />
                        </div>
                        <div className="form-floating mb-2 xl:w-96">
                            <Input
                                id="floatingConfirm"
                                placeHolder="Confirm Password"
                                type="password"
                                onChange={setConfirmPassword}
                                label="Confirm Password"
                            />
                        </div>
                        <div className="w-full flex text-xs opacity-70 mb-4">
                            <p>{'Already have an account?'} </p>
                            <Link
                                className="ml-1 underline hover:text-blue-500"
                                to={routes.login}
                            >
                                Login
                            </Link>
                        </div>
                        <Button
                            label="Signup"
                            type="primary"
                            form={true}
                            className="w-full mt-6 text-base"
                        />
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Signup
