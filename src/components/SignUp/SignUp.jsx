import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup';

export default function Register() {
    const [errorMessage , setErrorMessage]=useState('')
    const [isLoading , setIsLoading] =useState(false)
    let  navigate = useNavigate()  

    async function callRegister(reqBody) {
        setIsLoading(true)
        try {
            const res = await axios.post('https://fb10b4b0-baad-476b-995c-8303930d406d-00-dres0smrwl7g.spock.replit.dev/users', reqBody)
            
            if (res.status === 201) {
                navigate('/home')
            }
            setIsLoading(false)
        } catch (error) {
            console.error("Error during registration:", error)
            setErrorMessage(error.response?.data || 'An error occurred during registration');
            setIsLoading(false)
        }
    }

    const validationSchema = yup.object({
        name: yup.string().min(3, 'name is too short').max(100, 'name is too long').required('name is required'),
        email: yup.string().email('email isnot valid').required('email is required'),
        password: yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/, '  INVALID PASSWORD').required('password is required'),
        repassword: yup.string().oneOf([yup.ref('password')], 'password and repassword do not match'),
        phone: yup.string().matches(/^01[0125][0-9]{8}$/, 'invalid number').required('phone is required')
    })

    const registerForm = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            repassword: '',
            phone: ''
        },
        validationSchema,
        onSubmit:callRegister
    })

    return (
        <>
            <div className="w-50 mx-auto my-5">
                {errorMessage ? <div className='alert alert-danger'>{errorMessage}</div>:''}
                <form onSubmit={registerForm.handleSubmit}>
                    <div className="form-group mb-2">
                        <label htmlFor="fullName" className='mb-1'>FullName</label>
                        <input type="text" id='fullName' name='name' value={registerForm.values.name} onBlur={registerForm.handleBlur} onChange={registerForm.handleChange} className='form-control' />
                        {registerForm.errors.name && registerForm.touched.name ? <div className='alert alert-danger'>{registerForm.errors.name}</div> : ''}
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="email" className='mb-1'>Email</label>
                        <input type="email" id='email' name='email' value={registerForm.values.email} onBlur={registerForm.handleBlur} onChange={registerForm.handleChange} className='form-control' />
                        {registerForm.errors.email && registerForm.touched.email ? <div className='alert alert-danger'>{registerForm.errors.email}</div> : ''}
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="password" className='mb-1'>Password</label>
                        <input type="password" id='password' name='password' value={registerForm.values.password} onBlur={registerForm.handleBlur} onChange={registerForm.handleChange} className='form-control' />
                        {registerForm.errors.password && registerForm.touched.password ? <div className='alert alert-danger'>{registerForm.errors.password}</div> : ''}
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="repassword" className='mb-1'>Repassword</label>
                        <input type="password" id='repassword' name='repassword' value={registerForm.values.repassword} onBlur={registerForm.handleBlur} onChange={registerForm.handleChange} className='form-control' />
                        {registerForm.errors.repassword && registerForm.touched.repassword ? <div className='alert alert-danger'>{registerForm.errors.repassword}</div> : ''}
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="phone" className='mb-1'>Phone</label>
                        <input type="tel" id='phone' name='phone' value={registerForm.values.phone} onBlur={registerForm.handleBlur} onChange={registerForm.handleChange} className='form-control' />
                        {registerForm.errors.phone && registerForm.touched.phone ? <div className='alert alert-danger'>{registerForm.errors.phone}</div> : ''}
                    </div>
                    <button type='submit' className='btn btn-outline-danger d-block rounded rounded-2 mx-auto'>
                    {isLoading ?<i className="fa-solid fa-spinner fa-spin"></i>:'Submit'}
                    </button>
                </form>
            </div>
        </>
    )
}
