import AkademikLandingPage from "@/Components/LandingPage/Akademik";
import FooterLandingPage from "@/Components/LandingPage/Footer";
import GaleryLandingPage from "@/Components/LandingPage/Galery";
import HeaderLandingPage from "@/Components/LandingPage/Header";
import HeroLandingPage from "@/Components/LandingPage/Hero";
import { Button } from "primereact/button";
import React from "react";

const LandingPage = () => {
    return (
        <div>
            <HeaderLandingPage />
            <HeroLandingPage />
            <AkademikLandingPage />
            <GaleryLandingPage />
            <FooterLandingPage />
        </div>
    );
};

export default LandingPage;
