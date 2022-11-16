import { FC } from 'react'
import Form from '@components/Form'
import Button from '@components/Button'
import { sessionCreateFx } from '@api/user'
import { $user } from '@store/user'
import { useEvent, useStore } from 'effector-react'

const Login: FC = () => {
    const login = useEvent(sessionCreateFx)
    const userStore = useStore($user)
    const userLogin = async () => {
        login()
    }
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="flex justify-center">
                <div>
                    <Form onSubmit={userLogin}>
                        <p className="text-center text-5xl font-bold mb-8">
                            Login
                        </p>
                        <p>{userStore?.username}</p>
                        <div className="form-floating mb-3 xl:w-96">
                            <input
                                type="email"
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
                                placeholder="name@example.com"
                            />
                            <label
                                htmlFor="floatingInput"
                                className="text-gray-700"
                            >
                                Email address
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
