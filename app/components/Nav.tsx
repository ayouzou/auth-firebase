'use client'
import { IoMdMail } from "react-icons/io";
import { IoHomeSharp } from "react-icons/io5";
import { RiTeamFill } from "react-icons/ri";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
const Nav = () => {
    const router = useRouter()
    const pathname = usePathname()
    const menuNav = [
        { name: 'Home', icon: IoHomeSharp, path: '/' },
        { name: 'About', icon: RiTeamFill, path: '/about' },
        { name: 'Contact', icon: IoMdMail, path: '/contact' },
    ]
    const handleClick = () => {
        router.push('/signin')
    }
    return (
        <nav className="fixed top-0 left-0 z-100 w-full h-[50px] p-3 shadow-md">
            <ul className="w-full h-full flex justify-between items-center">
                {/* <li className="flex items-center gap-5"> */}
                    {menuNav.map((item) => (
                        <li key={item.name}>
                            <Link href={item.path} className={`flex items-center gap-2 text-[14px] ${pathname === item.path ? 'text-red-700' : 'text-gray-700 hover:text-red-700'}`}>
                                <item.icon />
                                <span>
                                    {item.name}
                                </span>
                            </Link>
                        </li>
                    ))}
                {/* </li> */}
                {/* <li> */}
                    <button onClick={handleClick}>
                        <div className="bg-gray-200 hover:bg-gray-300 text-gray-700 cursor-pointer p-2 rounded-full flex items-center
                        justify-center ">
                            <FaUser />
                        </div>
                    </button>
                {/* </li> */}
            </ul>
        </nav>
    )
}
export default Nav