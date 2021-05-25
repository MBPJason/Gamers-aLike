import React from "react";

// Core Components and Sections
import Header from "../../MyComponents/Header/Header";
import HomeCardDisplay from "../../MyComponents/HomeCardDisplay/HomeCardDisplay";

export default function HomePage() {
  return (
    <>
      <Header content={<HomeCardDisplay desktop={true} />} />
    </>
  );
}
