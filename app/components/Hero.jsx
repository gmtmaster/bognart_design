import React from 'react';

export default function Hero() {
    return (
        <section className="relative h-screen w-full flex justify-center items-center px-5 py-2.5">
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                style={{ backgroundImage: "url('/pr1.jpg')" }}
            />

            {/* Overlay Content */}
            <div className="relative z-10 flex flex-col justify-center items-center text-white h-full px-6 py-10">
                <div className="text-center max-w-7xl bg-white/30 rounded-2xl backdrop-blur-md p-6 shadow-2xl border border-white/50">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
                        Időtálló tervezés, harmonikus részletekkel
                    </h1>
                    <h2 className="text-2xl md:text-3xl bg-white/80 text-black rounded-2xl py-6 px-8 max-w-3xl mx-auto shadow-lg">
                        "The details are not the details. They make the design."
                        <br />
                        <span className="text-xl block mt-4">– Charles Eames</span>
                    </h2>
                </div>
            </div>
        </section>
    );
}
