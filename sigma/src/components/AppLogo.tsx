import React from 'react'
import Image from "next/image";

const AppLogo = () => {
  return (
     <Image
                src="/logo.svg"
                alt="logo"
                width={30}
                height={30}
                className="cursor-pointer hover:animate-slowspin"
              />
  )
}

export default AppLogo
