import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const navIcons = [
    { src: "/assets/icons/search.svg", alt: 'search' },
    { src: "/assets/icons/black-heart.svg", alt: 'heart' },
    { src: "/assets/icons/user.svg", alt: 'user' }

  ]
  return (
    <header className="w-full">
      <nav className="nav">
        <Link href="/" className="flex items-center gap-1">
          <Image src="/assets/icons/logo.svg" width={27} height={27} alt="logo" />
          <p className="nav-logo">Tag<span className="text-red-900">Zen</span></p>
        </Link>

        <div className="flex items-center gap-5">
          {navIcons.map((icons) => (
            <Image key={icons.alt} src={icons.src} alt="logo" className="object-contain" width={28} height={28} />
          ))}
        </div>
      </nav>
    </header>
  )
}
export default Navbar
