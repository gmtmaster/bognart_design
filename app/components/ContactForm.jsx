import React from 'react';

function ContactForm(props) {
    return (
        <section>

                <div>
                    <h3 className="mb-4">Teljes Név</h3>
                    <input type="text" className="input required:true w-full"/>
                </div>
                <div className="mt-4">
                    <h3 className="mb-2">Email</h3>
                    <input type="text" className="input required:true w-full"/>
                </div>
            <div className="mt-4">
                <h3 className="mb-4">Telefon</h3>
                <input type="text" className="input required:true w-full"/>
            </div>


            <div className="mt-4">
                <h3 className="mb-2">Üzenet</h3>
                <input type="text" className="input w-full min-h-[100px]"/>
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