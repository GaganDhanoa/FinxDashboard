import gtSign from "../../../assets/images/rightArrow.png"

import Select from "react-select";
import { useEffect, useState } from "react";
import { use } from "react";
export default function DropdownFilter(props) {

    
    const [show, setShow] = useState(false);   
    
    const [showClear, setShowClear] = useState(false);        
        
    
    function toogleShow(event) {        
        event.target.parentElement.classList.toggle("clicked");        
        setShow(prevShow => {return !prevShow});        
    }

    
    
    const [checkboxComponents, setCheckboxComponents] = useState([]);
       
    useEffect(() => {
        let temp = [];
        for (const [key, value] of Object.entries(props.makeList)) {                 
            temp.push(
                <div  key={key}>
                    <label key={key} className="dropdown-checkbox-container">
                        <input type="checkbox" value={key} name={key} checked={value} onChange={handleChange} />
                        {key}
                    </label>
                </div>
            );
            if(value) 
                setShowClear(true);
        }
        setCheckboxComponents(temp);
    },[props.makeList])
    

    function handleChange(event) {
        const {name, value} = event.currentTarget
        
        props.setMakeList(prevMakeList => {
            console.log(name, !prevMakeList[name]);

            const newObj = {
                ...prevMakeList,
                [name]: !prevMakeList[name]
            }
            let show = false;
            for (const [key, value] of Object.entries(newObj)) {                                               
                if(value) {
                    setShowClear(true);
                    show = true;
                    break;
                }
            }
            if(!show) 
                setShowClear(false);
            return newObj;
        })
          
    }

    function handleClearFilter() {
        setShowClear(false);

        let temp = {};
        Object.entries(props.initialState[props.name.toLowerCase()]).forEach(([key, value]) => {
            temp[key] = false;
        })

        props.setMakeList( prevMakeList => {            
            return temp;
    });
        
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
            <div className="dropdown-filter-container">                                 
                    {checkboxComponents}
                    
            </div>
            : undefined}

        </section>
    )
}