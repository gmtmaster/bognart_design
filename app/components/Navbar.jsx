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
            backgroundColor: "transparent",
        }, {
            backgroundColor: 'rgba(120, 53, 15, 0.3)',
            backgroundFilter: 'blur(10px)',
            duration: 1,
            ease: 'power1.inOut'
        });

    }, []);


    return (
        <nav className="nav">
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