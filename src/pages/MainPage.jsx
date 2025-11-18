import React from "react";
import Navbar from "../components/Navbar";
import CompaniesList from "../components/CompaniesList";
import Footer from "../components/Footer";

const MainPage = () => {
  return (
    <div>
      <Navbar />
      <CompaniesList />
      <Footer />
    </div>
  );
};

export default MainPage;
