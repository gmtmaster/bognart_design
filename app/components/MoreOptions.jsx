import Slider from './Slider';
import { pics, pics1 } from "@/constants";


export default function Example() {
    return (
        <section className="bg-[#f4f1ec] min-h-screen py-6">

            <div className="flex justify-center mb-10 items-center mx-auto text-center">
                <h1 className="text-xl md:text-3xl font-bold text-black">
                    Fedezd fel a látványtervek közötti különbséget.
                </h1>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto px-4">
                {/* First column */}
                <div className="flex flex-col items-center p-4">
                    <div className="w-full transition-transform duration-300 hover:scale-[1.01]">
                        <Slider
                            images={pics}
                            aspect="aspect-[4/3]"
                            interval={4000}
                            className="shadow-xl rounded-2xl"
                        />
                    </div>
                    <div className="mt-4 max-w-sm w-full text-center bg-white/30 rounded-2xl p-3 shadow-md backdrop-blur">
                        <p className="font-medium text-gray-800">Egyszerűsített látványterv</p>
                    </div>
                </div>

                {/* Second column */}
                <div className="flex flex-col items-center p-4">
                    <div className="w-full transition-transform duration-300 hover:scale-[1.01]">
                        <Slider
                            images={pics1}
                            aspect="aspect-[4/3]"
                            interval={4000}
                            className="shadow-xl rounded-2xl"
                        />
                    </div>
                    <div className="mt-4 max-w-sm w-full text-center bg-white/30 rounded-2xl p-3 shadow-md backdrop-blur">
                        <p className="font-medium text-gray-800">Fotórealisztikus látványterv</p>
                    </div>
                </div>
            </div>


            <div className="flex justify-center mb-10 items-center mx-auto text-center">
                <h3 className="mt-[30px] text-lg md:text-xl max-w-4xl text-black">
                    Nincs két ugyanolyan projekt, így nincs két azonos árképzés sem. A tervezési költség meghatározása számos tényezőtől függ, például a projektek jellegétől, méretétől, komplexitásától, az igényelt munka mennyiségétől és az időtartalmától.
                </h3>

            </div>
            <div className="flex justify-center mb-10 items-center mx-auto text-center bg-[#AD4949] rounded-2xl max-w-5xl py-2">
                <h3 className="text-lg md:text-2xl max-w-4xl text-white">
                    <span className="uppercase font-bold">Fontos!</span> <br/>

                    Az árak a kiszállítási díjat, valamint a helyszín felmérésének díját nem tartalmazzák.
                    Az árak nettó árak és egy tervezési négyzetméterre vonatkoznak.
                </h3>
            </div>

        </section>

    );
}
