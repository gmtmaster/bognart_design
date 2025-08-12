import React from 'react';
import ContactForm from "@/app/components/ContactForm";

function Footer() {
    return (
        <footer id="#footer" className="relative bg-amber-900/30 text-white px-10 py-20 md:py-32">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                {/* Left Column – Contact Info */}
                <div className="space-y-4">
                    <h2 className="mt-[70px] text-2xl md:text-3xl font-bold text-white/90">Székhely</h2>
                    <div className="mt-6 space-y-2 text-lg text-white/70">
                        <p>6200, Kiskőrös Petőfi Sándor út 101</p>
                    </div>
                    <h2 className="mt-[70px] text-2xl md:text-3xl font-bold text-white/90">Elérhetőség</h2>
                    <div className=" space-y-2 text-lg text-white/70">
                        <p><span className="font-semibold text-white">Bognár Csenge</span></p>
                        <p>Bognart Interior Design ügyvezető-belsőépítész</p>

                        <p className="mt-4">Tel: <a href="tel:+36703398484" className="hover:underline">+36 70 339 8484</a></p>
                        <p>Email: <a href="mailto:info@bognart.com" className="hover:underline">info@bognart.com</a></p>
                    </div>
                    <h2 className="mt-[70px] text-2xl md:text-3xl font-bold text-white/90">Nyitvatartás</h2>
                    <div className=" space-y-2 text-lg text-white/70">
                        <p>Hétfő - Péntek - 9:00 - 17:00</p>
                        <p>Hétvégén - Zárva</p>

                    </div>
                </div>

                {/* Right Column – Contact Form Placeholder */}
                <div className="space-y-4  text-black">
                    <img src="/footer_Cropped.jpg" alt="Bognart Design" className="w-full h-full object-cover rounded-2xl " loading="lazy" />
                </div>
            </div>

            {/* Optional Bottom Bar */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10" />
        </footer>
    );
}

export default Footer;
