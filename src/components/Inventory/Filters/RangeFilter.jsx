import gtSign from "../../../assets/images/rightArrow.png"

import { useState, useEffect } from "react";

export default function RangeFilter(props) {

    
    const [show, setShow] = useState(false);   
    const [showClear, setShowClear] = useState(false);
    
    function toogleShow(event) {
        console.log(event.target.parentElement) 
        event.target.parentElement.classList.toggle("clicked");        
        setShow(prevShow => {return !prevShow});        
    }

    function handleChange(event) {
        const {name, value} = event.currentTarget
        props.setRange(prevRange => {
            switch(name) {
                case "min": return [value, prevRange[1], 1 ];
                case "max": return [prevRange[0], value, 1 ];
            }
        })
        setShowClear(true);
        // console.log(event.currentTarget.value);        
    }

    function handleClearFilter() {        
        setShowClear(false);       
        props.setRange(props.initialState[props.name.toLowerCase()]);
    }

    return (
        <section className="filter-section"> 
            <span>{props.name}</span> 
            
            <div className="show-hide-filter">                
                <div className="arrow-container" >                
                    <img src={gtSign} alt=">" className="arrow" onClick={toogleShow}/> 
                </div>
                {showClear ? <a onClick={handleClearFilter} className="tile-link-clear">Clear</a> : undefined}                 
            </div>
            {show ? 
            <>
                <div className="range-filter"> 
                                    
                    <input type="number" value={props.range[0]} className="range-filter-input" name="min" onChange={handleChange}/>                    
                    <span className="range-filter-label"> - </span>
                    <input type="number" value={props.range[1]} className="range-filter-input" name="max" onChange={handleChange}/>
                </div>
                    
                <div className="range-filter-right">
                    {/* <span className="range-filter-label"> Max: </span> */}
                    
                </div> 
            </>
            : undefined}
        </section>

    )
}