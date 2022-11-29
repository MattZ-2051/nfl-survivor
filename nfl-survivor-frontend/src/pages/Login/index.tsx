import { FC } from 'react'
import { Button, Form } from '@components'
import { loginFx } from '@api/user'
import { useEvent } from 'effector-react'
import { useState } from 'react'

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
            <div className="flex justify-center">
                <div>
                    <Form onSubmit={userLogin} method="post">
                        <p className="text-center text-5xl font-bold mb-8">
                            Login
                        </p>
                        <div className="form-floating mb-3 xl:w-96">
                            <input
                                type="text"
                                className="form-control
                                        block
                                        w-full
                                        px-3
                                        py-1.5
                                        text-base
                                        font-normal
                                        text-gray-700
                                        bg-white bg-clip-padding
                                        border border-solid border-gray-300
                                        rounded
                                        transition
                                        ease-in-out
                                        m-0
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                id="floatingInput"
                                placeholder="user123"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <label
                                htmlFor="floatingInput"
                                className="text-gray-700"
                            >
                                Username
                            </label>
                        </div>
                        <div className="form-floating mb-3 xl:w-96">
                            <input
                                type="password"
                                className="form-control
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                id="floatingPassword"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label
                                htmlFor="floatingPassword"
                                className="text-gray-700"
                            >
                                Password
                            </label>
                        </div>
                        <Button
                            label="Login"
                            type="primary"
                            form={true}
                            classes="w-full mt-4 text-base"
                        />
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login
