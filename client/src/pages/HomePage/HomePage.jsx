import React, { useContext } from "react";
import ScreenSizeContext from "../../context/ScreenSizeContext";

// Core Components and Sections
import Header from "../../MyComponents/Header/Header";
import DesktopTablet from "../../MyComponents/HomeCardDisplay/HomeCardDisplay";

export default function HomePage() {
  // Screen Size Check
  const { bigScreens } = useContext(ScreenSizeContext);

  return (
    <>
      {/* Header component goes here */}
      <Header content={<DesktopTablet />} />
    </>
  );
}
