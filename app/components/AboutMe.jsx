import React from 'react';

function AboutMe(props) {
    return (
        <section>
            <div className="grid grid-cols-2 gap-10">
                <div className="grid ml-8 bg-white/80 rounded-2xl p-10 shadow-lg min-h-[150vh]">
                    <h1 className="ml-12 mb-4 text-5xl">Rólam</h1>
                    <hr className="ml-12 mb-8 text-neutral-400"/>
                    <div className="text-lg">
                    <p className="ml-12">
                        Bognár Csenge vagyok, a BOGNART Belsőépítész Studio megálmodója. Már egészen fiatalon tudtam, hogy művészet területén szeretnék elhelyezkedni, hogy kreativitásom megoszthassam másokkal is. Így, mikor pályaválasztás előtt álltam, egyértelmű volt számomra, hogy Belsőépítész szakmában szeretnék elhelyezkedni, mivel mindig is fontos volt számomra a pontosság és a precizitás.
                    </p>
                    <br/>
                    <p className="ml-12">
                        Belsőépítészként segítek egy időtálló, részletekben rejlő harmonikus otthont létrehozni. Fontos számomra, hogy minden projektemnél a design és a funkcionalitás egyet alkosson. Projektjeim során segítek az ügyfeleimnek a döntéshozásban, és biztosítom, hogy minőségi és stílusos teret hozzunk létre együtt. Minden tervezés titka, hogy olyan helyiséget hozzunk létre, amely tükrözi az ügyfelem egyedi személyiségét és igényeit, miközben megőrzöm a funkcionalitás és esztétika harmóniáját.
                    </p>
                    <br/>
                    <p className="ml-12">
                        Az alkotómunka során inspirációt merítek a környezetből, a természetből, és a különböző kultúrákból, hogy egyedi és izgalmas belső tereket hozzak létre. Hiszem, hogy a környezet, amelyben élünk, jelentősen befolyásolja életmódunkat és hangulatunkat, ezért nagy hangsúlyt fektetek arra, hogy az általam tervezett terek nemcsak szépek legyenek, hanem kellemes életteret is nyújtsanak az embereknek.
                    </p>
                    <br/>
                    <p className="ml-12">
                        Munkám során együttműködök az ügyfelekkel, hogy megismerjem elképzeléseiket és igényeiket, majd ezek alapján tervezek és alkotok. Fontos számomra, hogy minden projekt egyedi legyen, hiszen minden otthon és minden ügyfél más és más. A kreativitásom és a szakértelmem segítségével olyan teret hozok létre, amely az ügyfeleimnek tökéletesen megfelel.
                    </p>
                    <br/>
                    <p className="ml-12">
                        Szenvedéllyel és odaadással végzem a munkámat, és büszke vagyok arra, hogy olyan otthonokat hozhatok létre, amelyekben az emberek boldogan élnek. Várom, hogy új kihívásokkal és projektekkel találkozhassak, és segíthessek újabb és újabb terek megtervezésében és megvalósításában.
                    </p>
                    <br/>
                    <p className="ml-12">
                        Ha Ön is álmodozik egy egyedi, harmonikus és stílusos otthont létrehozni, akkor keressen meg, és együtt dolgozva valóra válthatjuk az elképzeléseit!
                    </p>
                </div>
                    <div className="flex justify-center items-center" >
                        <button className="button mt-4 md:max-w-1/3" href="#kapcsolat" >
                            Kapcsolat
                        </button>
                    </div>


                </div>

                <div>

                </div>
            </div>
        </section>
    );
}

export default AboutMe;