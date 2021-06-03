import React from "react";

// Core Components and Sections
import Header from "../../MyComponents/Header/Header";
import Session from "../../MyComponents/Session/Session";

export default function SessionPage() {
  return (
    <>
      <Header content={<Session/>} />
    </>
  );
}
