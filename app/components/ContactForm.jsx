import React from 'react';

function ContactForm(props) {
    return (
        <section>
            <div className="grid grid-cols-2 gap-10">
                <div>
                    <h3>Teljes Név</h3>
                    <input type="text" className="input required:true"/>
                </div>
                <div>
                    <h3>Email</h3>
                    <input type="text" className="input required:true"/>
                </div>
            </div>

            <div className="mt-4">
                <h3>Üzenet</h3>
                <input type="text" className="input w-full min-h-[100px]"/>
            </div>
            <div className="mt-4 flex justify-center">
                <button className="button_send">
                    Küldés
                </button>
            </div>
        </section>
    );
}

export default ContactForm;