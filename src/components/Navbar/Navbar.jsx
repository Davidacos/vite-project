import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import { FaFacebook } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { IoLogoWhatsapp } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiCircleRemove } from "react-icons/ci";

const navbarlinks = [
    { id: 1, name: 'Home', link: '/' },
    { id: 2, name: 'About', link: '/about' },
    { id: 3, name: 'Services', link: '/services' },
    { id: 4, name: 'Contact', link: '/contact' }
]

const navbarredes = [
    {
        id: 1,
        name: 'Facebook',
        link: 'https://www.facebook.com/',
        icon: <FaFacebook />,
        color: '#1877F2'

    },
    {
        id: 2,
        name: 'Instagram',
        link: 'https://www.instagram.com/',
        icon: <IoLogoInstagram />,
        color: '#E1306C'

    },
    {
        id: 3,
        name: 'Whatsapp',
        link: 'https://api.whatsapp.com/',
        icon: <IoLogoWhatsapp />,
        color: '#008f39'

    }
]
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        <nav className='bg-[#2f1a58]'>
            <div className='flex justify-between items-center p-4'>
                <div>
                    <a href="/">
                        <img src={logo} alt="Logo de la iglesia Iciledes" className='w-[80px]' />
                    </a>
                </div>
                <button onClick={toggleMenu} className='md:hidden text-white text-[25px]'>
                    {isOpen ? <CiCircleRemove /> : <RxHamburgerMenu />}
                </button>
                <div className='hidden md:block'>
                    <ul className='flex sm:space-x-8 space-x-4'>
                        {navbarlinks.map((link) => (
                            <li key={link.id}>
                                <a href={link.link} className='text-white sm:text-lg text-sm hover:text-sky-200
                                transition-transform hover:scale-110 transform inline-block duration-300'>{link.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='hidden md:block'>
                    <ul className='flex space-x-4'>
                        {navbarredes.map((social) => (
                            <li key={social.id} target='_blank' rel="noopener noreferrer" className={`hover:bg-[${social.color}] rounded-full p-2 transition-transform hover:scale-110 transform duration-300`}>
                                <a href={social.link} className={`text-white sm:text-lg text-sm ] hover:text-sky-400 
                                transition-transform hover:scale-110 transform inline-block duration-300`}>{social.icon}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* Menu Mobile */}
            <div className={`md:hidden absolute w-full bg-purple-950 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-all duration-300 ease-in-out`}>
                <ul className='flex flex-col px-4 py-2'>
                    {navbarlinks.map((link) => (
                        <li key={link.id} className='py-2 text-center'>
                            <a href={link.link} className='text-white hover:text-sky-200'>{link.name}</a>
                        </li>
                    ))}
                </ul>
                <ul className='flex space-x-4 justify-center py-4  border-t border-t-purple-800'>
                    {navbarredes.map((social) => (
                        <li key={social.id} target='_blank' rel="noopener noreferrer" className=''>
                            <a href={social.link} className='text-lg text-white'>{social.icon}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar