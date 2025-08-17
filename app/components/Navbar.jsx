'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { navLinks } from '@/constants';
import { motion, AnimatePresence } from 'framer-motion';
import { FiInstagram, FiFacebook, FiX, FiMenu } from 'react-icons/fi';
import { FaTiktok } from 'react-icons/fa';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContactForm from '@/app/components/ContactForm';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [contactFormOpen, setIsContactFormOpen] = useState(false);

    const closeContactForm = () => setIsContactFormOpen(false);
    const openContactForm = () => setIsContactFormOpen(true);
    const toggleMenu = () => setIsOpen(v => !v);
    const closeMenu = () => setIsOpen(false);

    // header bg on scroll
    const headerRef = useRef(null);
    useGSAP(() => {
        const el = headerRef.current;
        if (!el) return;
        gsap.fromTo(
            el,
            { backgroundColor: '#ffffff', backdropFilter: 'blur(0px)' },
            {
                backgroundColor: 'rgba(120,53,15,0.3)',
                backdropFilter: 'blur(10px)',
                duration: 0.6,
                ease: 'power1.inOut',
                scrollTrigger: {
                    trigger: el,
                    start: 'bottom top',
                    toggleActions: 'play none none reverse',
                },
            }
        );
    }, []);

    return (
        <main>
            <header
                ref={headerRef}
                className="navbar fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl rounded-2xl border-transparent shadow-md transition-all duration-300"
            >
                <div className="flex justify-between h-16 px-4 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <img src="/logo.png" alt="Logo" className="w-auto" />

                    {/* Desktop nav */}
                    <ul className="hidden lg:flex items-center gap-8">
                        {navLinks
                            .filter(link => link.id !== 'arajanlat') // keep /arajanlat separate
                            .map((link, index) => (
                                <li key={link.id}>
                                    <motion.a
                                        href={`/#${link.id}`}
                                        className="relative group text-gray-800 font-semibold hover:text-red-900 transition-colors duration-300"
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 100,
                                            damping: 25,
                                            delay: 0.7 + index * 0.2,
                                        }}
                                    >
                                        {link.title}
                                        <span className="absolute bottom-[-6px] left-0 w-0 h-0.5 bg-red-900 group-hover:w-full transition-all duration-300" />
                                    </motion.a>
                                </li>
                            ))}

                        {/* Árajánlat (separate route) — included in stagger */}
                        {(() => {
                            const baseIndex = navLinks.filter(l => l.id !== 'arajanlat').length;
                            return (
                                <motion.li
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 100,
                                        damping: 25,
                                        delay: 0.7 + baseIndex * 0.2, // comes right after the mapped links
                                    }}
                                >
                                    <Link
                                        href="/arajanlat"
                                        prefetch={false}
                                        className="relative group text-gray-800 font-semibold hover:text-red-900 transition-colors duration-300"
                                    >
                                        Árajánlatkérés
                                        <span className="absolute bottom-[-6px] left-0 w-0 h-0.5 bg-red-900 group-hover:w-full transition-all duration-300" />
                                    </Link>
                                </motion.li>
                            );
                        })()}


                        {/* Socials */}
                        <div className="flex space-x-5">
                            <a href="https://www.tiktok.com/@bognart.interior.design?lang=en" aria-label="TikTok">
                                <FaTiktok className="w-5 h-5 text-stone-500 hover:text-red-800 transition-colors duration-300" />
                            </a>
                            <a href="https://instagram.com/bognart_interior_design" aria-label="Instagram">
                                <FiInstagram className="w-5 h-5 text-stone-500 hover:text-red-800 transition-colors duration-300" />
                            </a>
                            <a href="https://www.facebook.com/share/1DHX4gkW35/?mibextid=wwXIfr" aria-label="Facebook">
                                <FiFacebook className="w-5 h-5 text-stone-500 hover:text-red-800 transition-colors duration-300" />
                            </a>
                        </div>

                        {/* Kapcsolat */}
                        <motion.button
                            type="button"
                            onClick={openContactForm}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                delay: 1.6,
                                duration: 0.8,
                                type: 'spring',
                                stiffness: 100,
                                damping: 50,
                            }}
                            className="button"
                        >
                            Kapcsolat
                        </motion.button>
                    </ul>

                    {/* Hamburger (mobile) */}
                    <div className="lg:hidden flex">
                        <motion.button
                            type="button"
                            whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-md text-gray-800 hover:bg-gray-100"
                            aria-label={isOpen ? 'Menü bezárása' : 'Menü megnyitása'}
                            onClick={toggleMenu}
                        >
                            {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                        </motion.button>
                    </div>
                </div>

                {/* Mobile dropdown */}
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
                    transition={{ duration: 0.3 }}
                    className="lg:hidden overflow-hidden"
                >
                    <nav className="px-4 pb-4 pt-2 bg-white/90 backdrop-blur-md rounded-b-2xl shadow-md">
                        {/* IMPORTANT: make it visible on mobile */}
                        <ul className="flex flex-col gap-2">
                            {navLinks
                                .filter(link => link.id !== 'arajanlat')
                                .map(link => (
                                    <li key={link.id}>
                                        <a
                                            href={`/#${link.id}`}
                                            onClick={closeMenu}
                                            className="block px-2 py-2 rounded-lg text-gray-800 font-semibold hover:text-red-900 hover:bg-red-50 transition"
                                        >
                                            {link.title}
                                        </a>
                                    </li>
                                ))}

                            {/* Separate Árajánlat (mobile) */}
                            <li>
                                <Link
                                    href="/arajanlat"
                                    prefetch={false}
                                    onClick={closeMenu}
                                    className="block px-2 py-2 rounded-lg text-gray-800 font-semibold hover:text-red-900 hover:bg-red-50 transition"
                                >
                                    Árajánlat
                                </Link>
                            </li>
                        </ul>

                        <div className="mt-4 pt-4 border-t border-stone-200">
                            <div className="flex items-center gap-5">
                                <a href="#" aria-label="TikTok" className="text-stone-500 hover:text-red-800 transition-colors">
                                    <FaTiktok className="w-5 h-5" />
                                </a>
                                <a href="https://instagram.com/bognart_interior_design" aria-label="Instagram" className="text-stone-500 hover:text-red-800 transition-colors">
                                    <FiInstagram className="w-5 h-5" />
                                </a>
                                <a href="#" aria-label="Facebook" className="text-stone-500 hover:text-red-800 transition-colors">
                                    <FiFacebook className="w-5 h-5" />
                                </a>

                                <button
                                    type="button"
                                    onClick={() => {
                                        closeMenu();
                                        openContactForm();
                                    }}
                                    className="button ml-auto"
                                >
                                    Kapcsolat
                                </button>
                            </div>
                        </div>
                    </nav>
                </motion.div>
            </header>

            {/* Contact Form modal */}
            <AnimatePresence>
                {contactFormOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: 'spring', damping: 30, stiffness: 200, duration: 0.3 }}
                            className="w-full max-w-lg rounded-xl border border-stone-200 bg-stone-50 p-6 shadow-xl max-h-[85vh] overflow-y-auto overscroll-contain"
                        >
                            <div className="mb-4 flex items-center justify-between bg-stone-50 pb-3 pt-1 -mt-1">
                                <h1 className="text-2xl font-bold text-stone-800">Kérdésed van?</h1>
                                <button type="button" onClick={closeContactForm}>
                                    <FiX className="h-6 w-6 text-stone-400" />
                                </button>
                            </div>
                            <ContactForm />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
