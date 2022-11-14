import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

const Time = () => {
  const [count, setCount] = useState(0);
  const IncNum = () => {
    setCount(count + 1);
  };
  const DecNum = () => {
    if (count > 0) setCount(count - 1);
    else {
      setCount(0);
      alert("min limit reached");
    }
  };
  return (
    <>
      <div className="main_div">
        <div className="center_div">
          <h1>{count}</h1>
          <div className="btn_div">
            <Tooltip title="Delete">
              <Button onClick={IncNum}>
                <AddIcon />
              </Button>
            </Tooltip>

            <Button onClick={DecNum}>
              <RemoveIcon />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Time;
