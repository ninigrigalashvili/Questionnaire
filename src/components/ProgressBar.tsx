import React from "react";

interface Props {
    percentRange: number

}
const ProgressBar: React.FC<Props> = ({ percentRange }) => {


 
    return (
<div className="progress-bar-main-container">
     {   [
            ...Array(10),
          ].map((value: undefined, index: number) => {
            return <div className="progress-bar-container" key={index}>
                <div className="progress-bar">
                    <div className="progress-bar-range "  style={{ width: percentRange >= index+1 ? `${100}%` : `${0}%` }} />
                </div>
            </div>           
                })
}
          </div>    
    )

}

export default ProgressBar;