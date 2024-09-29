import React from "react";

const HeroLandingPage = () => {
    return (
        <div className="relative h-[92vh] w-full overflow-hidden">
            <img
                src="assets/hero.jpg"
                alt="hero"
                className=" absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                    Selamat Datang di Sekolah Kami
                </h1>
                <p className="text-xl md:text-2xl lg:text-3xl mb-8">
                    Membentuk Generasi Unggul, Berakhlak, dan Berprestasi
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-lg">
                    Jelajahi Lebih Lanjut
                </button>
            </div>
        </div>
    );
};

export default HeroLandingPage;
