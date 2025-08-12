'use client';

import React, {useEffect, useRef} from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

const GreenLineScroll = () => {

    const sectionRef = useRef(null);


    useGSAP(() => {
        const GreenLine = '.theGreenLine';
        const stops = gsap.utils.toArray('.stop');



        // Initial setup
        gsap.set(GreenLine, { strokeWidth: 10, drawSVG: '0%' });
        gsap.set(stops, { autoAlpha: 1, scale: 0, transformOrigin: 'center' });

        // Draw the main green line with a scroll-linked timeline
        gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 40%',
                end: '+=250%',
                scrub: true,
                markers: false,
            },
        })
            .to(GreenLine, {
                drawSVG: '0% 100%',
                strokeWidth: 20,
                ease: 'none',
            });

        // Animate each stop individually when it comes into view
        stops.forEach((stop) => {
            gsap.to(stop, {
                scale: 1,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: stop,
                    start: 'top center+=100',
                    toggleActions: 'play none none reverse',
                },
            });
        });

        // Animate final text appearance
        gsap.to('.end', {
            autoAlpha: 1,
            scrollTrigger: {
                trigger: '.stop05',
                start: 'top center+=100',
                toggleActions: 'play none none reverse',
            },
        });

        // Optional: refresh on resize
        const handleResize = () => ScrollTrigger.refresh();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };


    }, []);

    return (
        <section ref={sectionRef} className=" h-[2800px] text-white">
            <div>


            <svg className="mt-[30vh] w-full h-[2800px]" viewBox="0 0 600 2800">
                <defs>
                    <linearGradient id="amberGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#CA8A8A" />
                        <stop offset="50%" stopColor="#AD4949" />
                        <stop offset="100%" stopColor="#CA8A8A" />
                    </linearGradient>
                </defs>
                <path
                    className="theBlackLine"
                    d="M -5,0 Q 450 230 300 450 T 130 750 Q 100 850 300 1000 T 150 1400 Q -150 1600 250 2000 T 0 2500"
                    fill="none"
                    stroke="#676767"
                    strokeWidth="1px"
                />
                <path
                    className="theGreenLine"
                    d="M -5,0 Q 450 230 300 450 T 130 750 Q 100 850 300 1000 T 150 1400 Q -150 1600 250 2000 T 0 2500"
                    fill="none"
                    stroke="url(#amberGradient)"
                    strokeWidth="2px"
                />
                {/* STOP 01 (title in <text>, description in <foreignObject>) */}
                <g className="stop stop01">
                    <text x="300" y="50" fill="black">
                        <tspan className="text-3xl">1. Kapcsolat felvétel az ügyféllel</tspan>
                    </text>

                    {/* real HTML wrapping inside SVG */}
                    <foreignObject x="340" y="80" width="360" height="180">
                        <div
                            xmlns="http://www.w3.org/1999/xhtml"
                            className="max-w-xl text-[14px] leading-[1.4] text-black"
                            style={{ color: '#000' }}
                        >
                            Az első lépés a megfelelő szolgáltatási csomag kiválasztása vagy egyedi árajánlat kérése.
                            Ezt követően 48 órán belül felveszem Önnel a kapcsolatot emailben vagy telefonon, hogy egy rövid
                            beszélgetés keretében pontosítsuk a tervezési igényeket. Bemutatom a csomagok tartalmát és a
                            szolgáltatási díjak várható nagyságrendjét. Amennyiben ajánlatom megfelel, egyeztetjük a további lépéseket és az első
                            személyes konzultáció időpontját.
                        </div>
                    </foreignObject>
                </g>
                <g className="stop stop02">
                    <text x="310" y="500" fill="black">
                        <tspan className="text-3xl">2. Első személyes konzultáció</tspan>
                    </text>

                    {/* real HTML wrapping inside SVG */}
                    <foreignObject x="330" y="530" width="360" height="180">
                        <div
                            xmlns="http://www.w3.org/1999/xhtml"
                            className="text-[14px] leading-[1.4] text-black"
                            style={{ color: '#000' }}
                        >
                            A személyes találkozót előre egyeztetett időpontban, akár a tervezendő helyszínen tartjuk.
                            Itt részletesen átbeszéljük elképzeléseit, igényeit, valamint tisztázzuk a tervezési folyamat menetét és az ütemtervet.
                            Megosztjuk egymással az inspirációs anyagokat, és áttekintjük a konzultáció előtt kitöltött kérdőív válaszait, hogy minél pontosabban megérthessem elképzeléseit.
                            A kérdőívet legkésőbb a találkozó előtti napig szükséges visszaküldeni.
                        </div>
                    </foreignObject>
                </g>
                <g className="stop stop03">
                    <text x="180" y="800" fill="black">
                        <tspan className="text-3xl">3. Tervezési folyamat és költségvetés</tspan>
                    </text>

                    {/* real HTML wrapping inside SVG */}
                    <foreignObject x="220" y="830" width="360" height="180">
                        <div
                            xmlns="http://www.w3.org/1999/xhtml"
                            className="text-[14px] leading-[1.4] text-black"
                            style={{ color: '#000' }}
                        >
                            Az első konzultáció után részletesen áttekintjük a költségvetést és a választott tervezési csomag tartalmát.
                            Kiküldésre kerül a szerződés, melynek aláírását követően megkezdődik a tervezési munka az egyeztetett ütemterv szerint.
                        </div>
                    </foreignObject>
                </g>
                <g className="stop stop04">
                    <text x="-100" y="1100" fill="black">
                        <tspan className="text-3xl">4. Tervezési folyamat kezdete</tspan>
                    </text>

                    {/* real HTML wrapping inside SVG */}
                    <foreignObject x="-80" y="1130" width="360" height="180">
                        <div
                            xmlns="http://www.w3.org/1999/xhtml"
                            className="text-[14px] leading-[1.4] text-black"
                            style={{ color: '#000' }}
                        >
                            A szerződés aláírása után megkezdjük az első tervdokumentáció elkészítését, amely egy vázlatos, koncepcionális anyag.
                            Ebből az anyagból Ön könnyen kiválaszthatja a számára legmegfelelőbb irányt.
                        </div>
                    </foreignObject>
                </g>
                <g className="stop stop05">
                    <text x="250" y="1400" fill="black">
                        <tspan className="text-3xl">5. Második személyes konzultáció</tspan>
                    </text>

                    {/* real HTML wrapping inside SVG */}
                    <foreignObject x="290" y="1430" width="360" height="210">
                        <div
                            xmlns="http://www.w3.org/1999/xhtml"
                            className="text-[14px] leading-[1.4] text-black"
                            style={{ color: '#000' }}
                        >
                            A találkozón bemutatjuk az első tervdokumentációt, amely több berendezési és kialakítási opciót tartalmaz a felmérések és igények alapján.
                            Bemutatásra kerülnek a vázlatos konszignációs alaprajzok, falnézetek, valamint az első, még nem fotórealisztikus 3D látványtervek.
                            Ezen a ponton kerül sor a burkolatok, bútorok, szaniterek és egyéb design elemek kiválasztására.
                            Szükség esetén vállaljuk a beszerzés és rendelés lebonyolítását is.
                            A tervezési folyamat alatt a személyes konzultációkon kívül folyamatosan kapcsolatban állunk Önnel.
                        </div>
                    </foreignObject>
                </g>
                <g className="stop stop06">
                    <text x="200" y="1750" fill="black">
                        <tspan className="text-3xl">6. Második tervezési szakasz</tspan>
                    </text>

                    {/* real HTML wrapping inside SVG */}
                    <foreignObject x="250" y="1780" width="360" height="210">
                        <div
                            xmlns="http://www.w3.org/1999/xhtml"
                            className="text-[14px] leading-[1.4] text-black"
                            style={{ color: '#000' }}
                        >
                            A második konzultáció során egyeztetett módosításokat elvégezzük, véglegesítjük a konszignációs alaprajzokat és elkészítjük a részletes 3D látványterveket.
                            Elkészülnek a csomagban foglalt további műszaki és kivitelezési tervek is (pl. színes falnézetek, elektromos, világítási, bontási és falazási tervek).
                        </div>
                    </foreignObject>
                </g>
                <g className="stop stop07">
                    <text x="280" y="2000" fill="black">
                        <tspan className="text-3xl">7. Harmadik személyes konzultáció</tspan>
                    </text>

                    {/* real HTML wrapping inside SVG */}
                    <foreignObject x="410" y="2030" width="360" height="210">
                        <div
                            xmlns="http://www.w3.org/1999/xhtml"
                            className="text-[14px] leading-[1.4] text-black"
                            style={{ color: '#000' }}
                        >
                            A harmadik találkozón bemutatjuk a majdnem végleges tervdokumentációt, ahol átbeszéljük az utolsó módosítási igényeket.
                            Ezt követően elkészítjük a kivitelezéshez szükséges végleges terveket.
                            Ha szükséges, további konzultációkat is biztosítunk, amelyek igény szerint külön szolgáltatásként rendelhetők meg.
                        </div>
                    </foreignObject>
                </g>
                <g className="stop stop08">
                    <text x="-200" y="2300" fill="black">
                        <tspan className="text-3xl">8. Végleges tervdokumentáció átadása</tspan>
                    </text>

                    {/* real HTML wrapping inside SVG */}
                    <foreignObject x="-200" y="2330" width="360" height="210">
                        <div
                            xmlns="http://www.w3.org/1999/xhtml"
                            className="text-[14px] leading-[1.4] text-black"
                            style={{ color: '#000' }}
                        >
                            Az ütemtervnek megfelelően a tervezési folyamat végéhez érünk, és a kivitelezési terveket elektronikus formában átadjuk.
                            Igény esetén személyes konzultáció keretében is átbeszéljük a dokumentációt.
                            A végleges tervcsomag minden olyan tervet tartalmaz, amely a sikeres kivitelezéshez szükséges, az Ön által választott szolgáltatási csomag tartalmának megfelelően.
                        </div>
                    </foreignObject>
                </g>
                <g className="stop stop09">
                    <text x="330" y="2500" fill="black">
                        <tspan className="text-3xl">9. Kivitelezés támogatása</tspan>
                    </text>

                    {/* real HTML wrapping inside SVG */}
                    <foreignObject x="330" y="2530" width="360" height="210">
                        <div
                            xmlns="http://www.w3.org/1999/xhtml"
                            className="text-[14px] leading-[1.4] text-black"
                            style={{ color: '#000' }}
                        >
                            Minden csomag kiválasztása előtt egyeztetünk, hogy igényli-e a kivitelezés alatti támogatást.
                            Amennyiben ezt kéri, folyamatos kapcsolatot tartunk a kivitelező szakemberekkel, felügyeljük a munkálatok előrehaladását, és biztosítjuk, hogy minden a terv szerint valósuljon meg.
                            Ez a szolgáltatás időt és stresszt takarít meg Önnek, valamint díjazása kiszállási díj formájában történik.
                        </div>
                    </foreignObject>
                </g>


            </svg>
            </div>

            <div>

            </div>
        </section>
    );
};

export default GreenLineScroll;
