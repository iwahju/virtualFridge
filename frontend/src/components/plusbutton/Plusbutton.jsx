import React,{useState} from "react";
import * as AiIcons from "react-icons/ai";
import "./plusbutton.css";
import Plusmenu from '../plusmenu/Plusmenu';

function Plusbutton(props) {

  const [plus, setPlus] = useState(false) 
  const showPlus = () => setPlus(!plus)

    return (
        <div className="plusbuttoncontainer">
            <div className="plusbutton">
                <AiIcons.AiFillPlusCircle onClick={showPlus} />
        </div>
        {plus && <Plusmenu token={props.token} setPlus={setPlus} setProfileLoaded={props.setProfileLoaded}/>}
        </div>

    )
}

export default Plusbutton;