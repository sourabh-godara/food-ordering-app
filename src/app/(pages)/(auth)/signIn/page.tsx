"use client"
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { redirect } from 'next/navigation';
import React, { useState } from 'react'

export default function Page() {
    const { status } = useSession();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    if(status === 'authenticated') {
        return redirect('/')
    }


    async function handleLogin(e:Event){
        e.preventDefault();
       await signIn('credentials',{email,password,callbackUrl:'/'})
       
    }
  return (
    <section className="flex items-center justify-center h-screen font-poppins">
    <div className="flex-1">
        <div className="px-2 mx-auto max-w-7xl lg:px-4">
            <div className="relative ">
                <div className="relative px-4 py-4 md:py-11 sm:px-8">
                    <div className="max-w-lg mx-auto text-center">
                      
                        <h2 className="mb-4 text-5xl font-bold  md:text-6xl">
                            F
                            <span className='text-primary'>oo</span>dy</h2>
                        <form onSubmit={handleLogin} className="mt-4 lg:mt-7 ">
                            <div className="">
                                <input type=""
                                 onChange={(e)=>setEmail(e.target.value)}
                                 value={email}
                                    className="w-full px-4 py-3 mt-2 bg-gray-200 rounded-lg lg:py-5"
                                    name="email" placeholder="Enter your email"/>
                            </div>
                            <div className="mt-4 lg:mt-7">
                                <div>
                                    <div className="relative flex items-center">
                                        <input type="password"
                                        onChange={(e)=>setPassword(e.target.value)}
                                        value={password}
                                            className="w-full px-4 py-3 bg-gray-200 rounded-lg lg:py-5 "
                                            name="password" placeholder="Enter password"/>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            className="absolute right-0 mr-3" fill="currentColor"
                                             viewBox="0 0 16 16">
                                            <path
                                                d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                            <path
                                                d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                            <path
                                                d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center justify-between mt-5 lg:mt-7">
                                <label className="flex">
                                    <input type="checkbox" className="mt-1 mr-4 bg-primary"/>
                                    <span className="text-sm ">Remember me</span>
                                </label>
                                <a href=" #"
                                    className="text-sm font-semibold text-primary lg:mt-0 hover:underline">
                                    Forgot Password? </a>
                            </div>
                            <button
                                className="w-full py-3 text-lg font-bold text-gray-200 uppercase bg-primary rounded-md lg:mt-7 mt-7 px-11 md:mt-7 hover:bg-blue-900 dark:hover:bg-red-600"
                                type="submit">LOGIN</button>
                                <button
                                onClick={()=>signIn('google',{callbackUrl:'/'})}
                                className="w-full py-3 text-lg font-bold rounded-md lg:mt-7 mt-7 px-11 md:mt-7 bg-gray-200"
                                type="submit">Sign in with Google</button>
                            <p className="mt-4 text-xs text-gray-700 lg:mt-7 dark:text-gray-400 lg:text-base">
                                Need an account? &nbsp;
                                <Link href="/register" className="font-semibold text-primary hover:text-red-600">
                                     Create an account</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}
