'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { navLinks} from "@/constants";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";





function Navbar() {

    useGSAP(() => {
        const navTween = gsap.timeline({
            scrollTrigger: {
                trigger: "nav",
                start: "bottom top",
            }
        });

        navTween.fromTo(".nav", {
            backgroundColor: 'rgba(99, 107, 47, 0.8)',
        }, {
            backgroundColor: 'rgba(120, 53, 15, 0.3)',
            backgroundFilter: 'blur(10px)',
            duration: 1,
            ease: 'power1.inOut'
        });

    }, []);


    return (
        <nav className="nav text-white fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl rounded-full bg-white transition-all duration-300 border border-transparent shadow-md px-4 sm:px-6 md:px-10 py-1">
            <div>
                <Link href="/" className="flex items-center gap-2">
                    BOGNART
                </Link>

                <ul>

                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <a href={`#${link.id}`}>{link.title}</a>
                        </li>
                    ))};

                </ul>

            </div>
        </nav>
    );
}

export default Navbar;