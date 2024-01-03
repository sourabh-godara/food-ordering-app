import React from 'react'
import { z } from "zod";

export default function page() {

  const registerUser =async (formData:FormData) =>{
    "use server"
    const registerParsed = z.object({
        name:z.string().min(2),
        email:z.string().min(5).max(50).toLowerCase(),
        password:z.string().min(8,{ message: "Password must be 8 or more characters long" }).max(20)
    })
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const safeParsed = registerParsed.safeParse({name,email,password});
    console.log("SAFE PARSE",safeParsed?.success);
    if(safeParsed?.success){
        fetch('http://localhost:8080/api/register',{
      method: 'POST',
      cache: 'no-store',
      body: JSON.stringify(safeParsed.data),
    })
}
  }
  return (
    <section className="flex items-center justify-center h-screen font-poppins">
    <div className="flex-1">
        <div className="px-2 mx-auto max-w-7xl lg:px-4">
            <div className="relative ">
                <div className="relative px-4 py-4 md:py-11 sm:px-8">
                    <div className="max-w-lg mx-auto text-center">
                      
                        <h2 className="mb-4 text-4xl font-bold  md:text-6xl">
                            F
                            <span className='text-primary'>oo</span>dy</h2>
                           {/*  <h3 className='text-3xl'>Login</h3> */}
                        <form action={registerUser} className="mt-4 lg:mt-7 ">
                        <div className="">
                                <input type="text"
                                    className="w-full px-4 py-3 mt-2 bg-gray-200 rounded-lg lg:py-5"
                                    name="name" placeholder="Enter your Username"/>
                            </div>
                            <div className="mt-4">
                                <input type="email"
                                    className="w-full px-4 py-3 mt-2 bg-gray-200 rounded-lg lg:py-5"
                                    name="email" placeholder="Enter your email"/>
                            </div>
                            <div className="mt-4 lg:mt-7">
                                <div>
                                    <div className="relative flex items-center">
                                        <input type="password"
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
                            <div className="flex flex-wrap items-center justify-between mt-4 lg:mt-7">
                                <label className="flex">
                                    <input type="checkbox" className="mt-1 mr-4 bg-primary"/>
                                    <span className="text-sm ">Remember me</span>
                                </label>
                            </div>
                           <button type='submit' className='w-full py-3 text-lg font-bold text-gray-200 uppercase bg-primary disabled:bg-red-800 disabled:hover:bg-red-800 rounded-md lg:mt-7 mt-7 px-11 md:mt-7 hover:bg-red-600'>SIGNUP</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}
