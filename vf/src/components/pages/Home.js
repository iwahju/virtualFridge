import "./home.css";
import React from "react";

function Home() {
  return (
    <div className="home">
      <div className="storagebox-container">
        <div className="storagebox">
          <div className="storagebox-title">
            <p>My fridge</p>
          </div>
          <div className="storagebox-content"></div>
        </div>
        <div className="storagebox">
          <div className="storagebox">
            <div className="storagebox-title">
              <p>My Pantry</p>
            </div>
            <div className="storagebox-content"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
