import React from 'react'
import { twMerge } from 'tailwind-merge'
const LogoSee = ({className}) => {
  return (
      <h1 className={twMerge("p-2 text-zinc-50 text-3xl font-bold", className)}>SEE</h1>
  )
}

export default LogoSee
