import React, { useState } from 'react'
import AuthLayout from '@/components/layouts/Auth'
import { register } from '@/services/auth'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

const Login = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleRegister = async (e) => {
        e.preventDefault()
        if (email.length < 1 && password.length < 1) {
            alert('ایمیل و رمزعبور اجباری می باشد')
            return false
        }
        const result = await register({ firstName, lastName, email, password })


        if (result) {
            router.push('/auth/login')
        } else {
            alert('در فرایند ثبت نام مشکلی رخ داده است. لطفا دوباره امتحان نمایید')
        }
    }

    return (
        <AuthLayout title="صفحه ثبت نام">
            <div className="w-dvw h-dvh overflow-hidden flex items-center justify-center">
                <div className="relative w-full h-full md:w-3/4 md:h-3/4 bg-white rounded-xl overflow-hidden shadow-xl shadow-blue-100 wave-complete">

                    <div className="relative z-30 flex items-center justify-between p-3 w-full h-full">
                        <div className="relative w-full h-full">
                            <Image
                                className="mb-lg-5 mb-4"
                                src="/assets/img/register.jpg"
                                fill
                                alt=""
                            />
                        </div>
                        <div className="h-full w-full p-8">
                            <h3 className='text-lg text-center my-6 leading-10'>برای استفاده از برنامه لطفا ثبت نام کنید</h3>
                            <form dir='rtl'>
                                <div className="border my-4 border-gray-300 rounded-lg py-2 px-4">
                                    <input
                                        type="text"
                                        className="w-full h-full outline-0"
                                        placeholder="نام"
                                    />
                                </div>
                                <div className="border my-4 border-gray-300 rounded-lg py-2 px-4">
                                    <input
                                        type="text"
                                        className="w-full h-full outline-0"
                                        placeholder="نام خانوادگی"
                                    />
                                </div>
                                <div className="border my-4 border-gray-300 rounded-lg py-2 px-4">
                                    <input
                                        type="text"
                                        className="w-full h-full outline-0"
                                        placeholder="موبایل"
                                    />
                                </div>
                                <div className="border my-4 border-gray-300 rounded-lg py-2 px-4">
                                    <input
                                        type="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full h-full outline-0"
                                        placeholder="آدرس ایمیل"
                                    />
                                </div>
                                <div className="border border-gray-300 rounded-lg py-2 px-4 my-4">
                                    <div className="relative">
                                        <input
                                            type="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full h-full outline-0"
                                            placeholder="رمز عبور"
                                        />
                                        <i className="fa fa-eye absolute left-1 top-1/2 -translate-y-1/2" />
                                    </div>
                                </div>
                                <div className="block text-md">
                                    <div className='flex items-center gap-2'>
                                        <button onClick={handleRegister} className="py-2 px-6 text-white bg-blue-400 hover:bg-blue-300 cursor-pointer block rounded-lg">
                                            ثبت نام
                                        </button>
                                        <Link href='/auth/register'>ورود</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
        // <AuthLayout title="صفحه ورود">
        //     <div className="section-gap bg-gray h-screen">
        //         <div className="container">
        //             <div className="row justify-content-center">
        //                 <div className="col-md-12">
        //                     <div className="card border-0 row no-gutters flex-column flex-md-row">
        //                         <div className="card-body d-flex align-items-center col-lg-5 p-md-5 p-3">
        //                             <div className="w-100">
        //                                 <img
        //                                     className="mb-lg-5 mb-4"
        //                                     src="/assets/img/logo-dark.png"
        //                                     srcSet="/assets/img/logo-dark@2x.png 2x"
        //                                     alt=""
        //                                 />
        //                                 <form>
        //                                     <div className="form-group">
        //                                         <input
        //                                             type="text"
        //                                             onChange={(e) => setFirstName(e.target.value)}
        //                                             className="form-control"
        //                                             placeholder="نام"
        //                                         />
        //                                     </div>
        //                                     <div className="form-group">
        //                                         <input
        //                                             type="text"
        //                                             onChange={(e) => setLastName(e.target.value)}
        //                                             className="form-control"
        //                                             placeholder="نام خانوادگی"
        //                                         />
        //                                     </div>
        //                                     <div className="form-group">
        //                                         <input
        //                                             type="email"
        //                                             onChange={(e) => setEmail(e.target.value)}
        //                                             className="form-control"
        //                                             placeholder="آدرس ایمیل"
        //                                         />
        //                                     </div>
        //                                     <div className="form-group">
        //                                         <div className="icon-field-right">
        //                                             <i className="fa fa-eye" />
        //                                             <input
        //                                                 type="password"
        //                                                 onChange={(e) => setPassword(e.target.value)}
        //                                                 className="form-control"
        //                                                 placeholder="رمز عبور"
        //                                             />
        //                                         </div>
        //                                     </div>
        //                                     <div className="form-group">
        //                                         <div className="custom-control custom-checkbox">
        //                                             <input
        //                                                 type="checkbox"
        //                                                 className="custom-control-input"
        //                                                 id="customCheck1"
        //                                             />
        //                                             <label
        //                                                 className="custom-control-label"
        //                                                 htmlFor="customCheck1"
        //                                             >
        //                                                 مرا به خاطر بسپار
        //                                             </label>
        //                                             <a href="#" className="text-dark float-right">
        //                                                 رمز عبور فراموش شده؟
        //                                             </a>
        //                                         </div>
        //                                     </div>
        //                                     <div className="form-group">
        //                                         <button onClick={handleRegister} className="btn btn-theme">
        //                                             ثبت نام
        //                                         </button>
        //                                     </div>
        //                                     <div className="form-group mt-lg-5">
        //                                         <Link href='/auth/login'>ورود</Link>
        //                                     </div>
        //                                 </form>
        //                             </div>
        //                         </div>
        //                         <div className="flex-column col-lg-7">
        //                             <div className="position-relative">
        //                                 <img
        //                                     className="card-img-right flex-grow-1 "
        //                                     src="/assets/img/cards/29a.jpg"
        //                                     alt=""
        //                                 />
        //                                 <div className="login-content">
        //                                     <div className="h1 login-circle-logo font-weight-800 text-primary mb-4">
        //                                         ک
        //                                     </div>
        //                                     <h2 className="">آن را بهتر و سریعتر کنید</h2>
        //                                     <p>کلاب بهترین است از نگاه مشتریان تم فارست</p>
        //                                     <div className="row justify-content-center mt-lg-5">
        //                                         <div className="col-md-8">
        //                                             <ul className="list-group text-left">
        //                                                 <li className="list-group-item">
        //                                                     <i className="fa fa-check pr-3 text-primary font-size-12" />
        //                                                     برنامه ریزی ایده نوآوری و نسل
        //                                                 </li>
        //                                                 <li className="list-group-item">
        //                                                     <i className="fa fa-check pr-3 text-primary font-size-12" />{" "}
        //                                                     بزرگ ارزش برند جهانی محصول است
        //                                                 </li>
        //                                             </ul>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </AuthLayout>
    )
}

export default Login