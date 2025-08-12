import React from 'react';
import Link from "next/link";

function ContactForm(props) {
    return (
        <section>

                <div>
                    <h3 className="mb-4">Teljes Név</h3>
                    <input type="text"
                           className="input required:true w-full"
                           placeholder="Írd be a neved"/>
                </div>
                <div className="mt-4">
                    <h3 className="mb-2">Email</h3>
                    <input type="text"
                           className="input required:true w-full"
                           placeholder="nev@email.hu"/>
                </div>
            <div className="mt-4">
                <h3 className="mb-4">Telefon</h3>
                <input type="text"
                       className="input required:true w-full"
                       placeholder="+36 …"/>
            </div>


            <div className="mt-4">
                <h3 className="mb-2">Üzenet</h3>
                <input type="text"
                       className="input w-full min-h-[100px]"
                       placeholder="Miben segíthetünk?"/>
            </div>
            {/* Consent */}
            <div className="mt-4 rounded-lg border border-stone-200 bg-stone-100/70 p-4">
                <label htmlFor="consent" className="flex items-start gap-3 text-sm text-stone-700">
                    <input
                        id="consent"
                        type="checkbox"
                        required
                        className="mt-0.5 h-4 w-4"
                    />
                    <span>
                        Elolvastam és elfogadom a{' '}
                        <Link href="/policies/terms" className="font-medium text-[#CA8A8A] hover:text-[#AD4949] underline">
                                    Felhasználási feltételeket
                                  </Link>{' '}
                        és az{' '}
                        <Link href="//policies/privacy" className="font-medium text-[#CA8A8A] hover:text-[#AD4949] underline">
                                    Adatvédelmi tájékoztatót
                                  </Link>.
                                </span>
                </label>
                <p className="mt-2 text-xs text-stone-500">
                    Az űrlap beküldésével hozzájárulsz az adataid kezeléséhez.
                </p>
            </div>

            <div className="mt-4 flex justify-center items-center">
                <button className="button_send">
                    Küldés
                </button>
            </div>

        </section>
    );
}

export default ContactForm;