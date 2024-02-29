import React from 'react'
import { IoEyeSharp } from "react-icons/io5";

const LogoIcon = ({size, color }) => {
  return (
    <IoEyeSharp size={size ?? 70} color={color ?? 'white'} />
  )
}

export default LogoIcon
