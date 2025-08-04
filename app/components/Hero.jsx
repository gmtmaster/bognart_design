import React from 'react';

function Hero() {
    return (

        <section id="hero">
            <h1 className="text-8xl">Időtálló tervezés, harmonikus részletekkel</h1>

            <div className="flex h-screen justify-center items-center">

                <div className="flex justify-center items-center">
                    <h2 className="flex justify-center text-3xl bg-white/80 rounded-2xl py-10 px-10 max-w-[150vw] shadow-lg">
                        "The details are not the details. They make the design."
                        <span className="text-2xl flex justify-center"><br/>– Charles Eamess</span>
                    </h2>

                </div>
            </div>
        </section>
    );
}

export default Hero;