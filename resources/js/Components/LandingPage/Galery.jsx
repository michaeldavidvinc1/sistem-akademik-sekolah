import React from "react";
import { motion } from "framer-motion";

const GaleryLandingPage = () => {
    const images = [
        { src: "assets/galeri1.jpg", alt: "Galery 1" },
        { src: "assets/galeri2.jpg", alt: "Galery 2" },
        { src: "assets/galeri3.jpg", alt: "Galery 3" },
        { src: "assets/galeri4.jpg", alt: "Galery 4" },
        { src: "assets/galeri5.jpg", alt: "Galery 5" },
        { src: "assets/galeri6.jpg", alt: "Galery 6" },
        { src: "assets/galeri7.jpg", alt: "Galery 7" },
        { src: "assets/galeri8.jpg", alt: "Galery 8" },
        { src: "assets/galeri9.jpg", alt: "Galery 9" },
    ];
    return (
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-bold text-center mb-8"
                >
                    Galeri SMK Negeri XYZ
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((image, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative overflow-hidden rounded-lg shadow-lg aspect-w-16 aspect-h-9"
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                                <p className="text-white p-4 text-sm">
                                    {image.alt}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GaleryLandingPage;
