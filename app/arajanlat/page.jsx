import React from 'react';
import PriceRequest from "@/app/components/PriceRequest";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

function Page(props) {
    return (
        <section className="min-h-screen">

                <Navbar />
                <PriceRequest />
                <Footer />
        </section>
    );
}

export default Page;