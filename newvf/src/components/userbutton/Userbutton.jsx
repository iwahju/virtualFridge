import React, { useState } from "react";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import "./userbutton.css";

function Userbutton() {
  const [Userbutton, setUserbutton] = useState(false);
  const showUserbutton = () => setUserbutton(!Userbutton);

  return (
    <div className="userbuttoncontainer">
      <div className="userbutton">
        <PeopleAltTwoToneIcon onClick={showUserbutton} />
      </div>
      {Userbutton && <Userbutton />}
    </div>
  );
}

export default Userbutton;
