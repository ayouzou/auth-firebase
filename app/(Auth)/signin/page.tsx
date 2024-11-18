'use client'
import useClientAuth from "@/app/hooks/useClientAuth"
import { useState, ChangeEvent } from "react"
import * as Yup from 'yup'


interface FormData {
  email: string,
  password: string
}

const schema = Yup.object().shape({
  email: Yup.string().email('Format invalide').required('Email requis'),
  password: Yup.string().required('Password requis')

})
const SignInpage = () => {
  const { user, IsFetch, signIn, signUp, redirectIfAuthenticated, loginWithGoogle } = useClientAuth()
  const [isSignUpActive, setIsSignUpActive] = useState(false)
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const handleFormChange = () => {
    setIsSignUpActive(!isSignUpActive)
    setFormData({ email: '', password: '' })
    setErrors({})
  }
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }
  const handleSignUp = () => {
    schema.validate(formData, { abortEarly: false }).then(() => {
      signUp(formData.email, formData.password)
    }).catch((ValidationErrors: Yup.ValidationError) => {
      const formattedErrors: Partial<FormData> = {}
      ValidationErrors.inner.forEach(error => {
        formattedErrors[error.path as keyof FormData] = error.message
      })
      setErrors(formattedErrors)
    })
  }
  const handleSignIn = () => {
    schema.validate(formData, { abortEarly: false }).then(() => {
      signIn(formData.email, formData.password)
    }).catch((ValidationErrors: Yup.ValidationError) => {
      const formattedErrors: Partial<FormData> = {}
      ValidationErrors.inner.forEach(error => {
        formattedErrors[error.path as keyof FormData] = error.message
      })
      setErrors(formattedErrors)
    })
  }
  if (IsFetch) {
    return <h2>Currently logging in</h2>
  }
  redirectIfAuthenticated();
  return (
    <section className="h-screen w-full flex items-center justify-center flex-col gap-2">
      <form className="flex flex-col gap-2 bg-slate-50 p-3.5 rounded-md shadow-md w-96" >
        {isSignUpActive ? (
          <h1 className="text-gray-900 text-center text-4xl mb-3 font-bold">
            Registring
          </h1>
        ) : (
          <h1 className="text-gray-900 text-center text-4xl mb-3 font-bold">
            connection
          </h1>
        )}
        <label className="text-slate-900">Email</label>
        <input
          type="email"
          onChange={handleInputChange}
          value={formData.email}
          name="email"
          id="email"
          className="h-10 border border-slate-900 rounded-md p-4" />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
        <label className="text-slate-900">Password</label>
        <input
          type="password"
          onChange={handleInputChange}
          value={formData.password}
          name="password"
          id="password"
          className="h-10 border border-slate-900 rounded-md p-4" />
        {errors.password && <p className="text-red-500">{errors.password}</p>}
        {isSignUpActive ? <button type="button" onClick={handleSignUp} className="bg-gray-600 px-3 py-1.5
        text-white my-3 rounded-md hover:bg-gray-700">
          Register
        </button> :
          <button type="button" onClick={handleSignIn} className="bg-gray-600 px-3 py-1.5
        text-white my-3 rounded-md hover:bg-gray-700">
            Login
          </button>
        }
        <div className=" flex items-center justify-center">
          {isSignUpActive ? <a href="#" onClick={handleFormChange}>you already have an account ? Login</a>
            :
            <a href="#" onClick={handleFormChange}> create an account ? Register</a>
          }
        </div>
      </form>
      <button type="button" onClick={loginWithGoogle} className="bg-gray-600 px-3 py-1.5
        text-white my-3 rounded-md hover:bg-gray-700">
          {isSignUpActive ? 'Register with Google ' : 'Login with Google '}
      </button>
    </section>
  )
}
export default SignInpage