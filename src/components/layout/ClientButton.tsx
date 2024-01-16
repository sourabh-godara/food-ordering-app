"use client"
import { signIn, signOut } from 'next-auth/react'
import React from 'react'

export default function ClientButton({title}) {
 /*  if(title === 'SIGNUP'){
    const SIGNUP = "w-full py-3 text-lg font-bold text-gray-200 uppercase bg-primary disabled:bg-red-800 disabled:hover:bg-red-800 rounded-md lg:mt-7 mt-7 px-11 md:mt-7 hover:bg-red-600"
  } */
  const handleClick=async()=>{
    if(title === 'Logout'){
      await signOut();
    }else if(title === 'SIGNUP'){
      await signIn();
    }
  }
  return (
    <button className={title === 'SIGNUP'?'w-full py-3 text-lg font-bold text-gray-200 uppercase bg-primary disabled:bg-red-800 disabled:hover:bg-red-800 rounded-md lg:mt-7 mt-7 px-11 md:mt-7 hover:bg-red-600':''}  onClick={()=>handleClick()}>{title}</button>
  )
}
