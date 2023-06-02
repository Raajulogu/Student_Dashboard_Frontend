import React from "react";
import Base from "../Base/base";
import { useHistory } from "react-router-dom";

function Nopage(){
    let history=useHistory();
    return(
        <Base
        title={"404 No Page content"}
        description={"Wrong url please click below button"}
        >
            <button
            onClick={()=>history.push("/")}
            >
                Go to Dashboard
            </button>
        </Base>
    );
}
export default Nopage;