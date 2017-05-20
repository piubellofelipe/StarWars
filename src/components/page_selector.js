import React from 'react'
//component responsible for simply allowing the user to navigate through pages
const selector = (props) =>{
    var actualPg = props.page;
    var leftPg = actualPg;
    var rightPg = actualPg;
    if (actualPg > 1)
        leftPg = actualPg -1;
    if (actualPg < 9)
        rightPg = actualPg +1;
    return(
        <div className = "page-selector">
            <button className = "pgleft" onClick = {() => props.onPageSelect(leftPg)}> &lt;  </button>
            <button className = "pgright" onClick = {() => props.onPageSelect(rightPg)}> &gt;  </button>
        </div>
    );
}

export default selector;