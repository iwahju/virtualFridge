import "./home.css";
import React from "react";
import PlusButton from "../plusbutton/Plusbutton";
import Demo from "../../demo/demo";

function Home() {
  return (
    <div className="home">
      <div className="storagebox-container">
        <div className="storagebox">
          <div className="storagebox-title">
            My Fridge
          </div>
          <div className="storagebox-content">
            
          </div>
        </div>
        <div className="storagebox">
          <div className="storagebox">
            <div className="storagebox-title">
              My Pantry
            </div>
            <div className="storagebox-content"></div>
          </div>
        </div>
        <PlusButton />
      </div>
    </div>
  );
}

export default Home;
