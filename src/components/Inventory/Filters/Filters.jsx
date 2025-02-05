import { useState, useEffect } from "react";
import DropdownFilter from "./DropdownFilter";
import RangeFilter from "./RangeFilter";


export default function Filters(props) {

    const [priceRange, setPriceRange] = useState([0,0,0]);
    const [yearRange, setYearRange] = useState([0,0,0]);
    const [mileageRange, setMileageRange] = useState([0,0,0]);
    const [makeList, setMakeList] = useState({});

    const [firstTime, setFirstTime] = useState(true);
    const [initialState, setInitialState] = useState({});
    
    //Initial state
    useEffect(() => {

        if(props.allVehicles.length === 0) {
            return;
        }

        let mSet = new Set();
        let pR = [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER,priceRange[2]];
        let yR = [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER,yearRange[2]];
        let mR = [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER,mileageRange[2]];
        for(let i = 0; i < props.allVehicles.length; i++) {
            pR[0] = Math.min(pR[0], props.allVehicles[i]["price"]);
            pR[1] = Math.max(pR[1], props.allVehicles[i]["price"]);
            yR[0] = Math.min(yR[0], props.allVehicles[i]["year"]);
            yR[1] = Math.max(yR[1], props.allVehicles[i]["year"]);
            mR[0] = Math.min(mR[0], props.allVehicles[i]["mileage"]);
            mR[1] = Math.max(mR[1], props.allVehicles[i]["mileage"]);
            mSet.add(props.allVehicles[i]["make"]);
        }

        let mList = Array.from(mSet).sort((a,b) => a.localeCompare(b))   
        let mObj = {}     
        mList.map((make) => { 
            if(make in  makeList)
                mObj[make] = makeList[make];
            else
                mObj[make] = false;  
        } )
        setMakeList(mObj);  
        
        if(firstTime){
            setPriceRange(pR);
            setYearRange(yR);
            setMileageRange(mR);            
            setFirstTime(false);
        }
                        
        setInitialState({'price':pR, 'year':yR, 'mileage':mR, 'make':mObj})   
        
        console.log("Setting initial state")

    }, [props.allVehicles])

    //Calculate filteredIndexs after each filter change
    useEffect(() => {

        let tempFilteredIndexs = [];        
       
        let makeSet = new Set();
        let allMakes = []
        for (const [key, value] of Object.entries(makeList)) {        
            allMakes.push(key);
            if(value) {
                makeSet.add(key);                 
            }
        }
        if(makeSet.size == 0) {
            makeSet = new Set(allMakes);
        }        

        for (let i=0; i < props.allVehicles.length; i++) {
            
            if( ( (priceRange[2] == 0) || (props.allVehicles[i]["price"] >= priceRange[0] && props.allVehicles[i]["price"] <= priceRange[1]) ) &&
                ( (yearRange[2] == 0) || (props.allVehicles[i]["year"] >= yearRange[0] && props.allVehicles[i]["year"] <= yearRange[1]) ) &&
                ( (mileageRange[2] == 0) || (props.allVehicles[i]["mileage"] >= mileageRange[0] && props.allVehicles[i]["mileage"] <= mileageRange[1]) )&&
                makeSet.has(props.allVehicles[i]["make"])){  
                    
                    tempFilteredIndexs.push(i)                                        
            }            
        }

        console.log("Setting filtered indexs")

        props.setFilteredVehiclesIndexs(tempFilteredIndexs)        
    }, [priceRange, yearRange, mileageRange, makeList])

    
    return (
        <section className="filters-section">             

            <div className="filters-container">
                <RangeFilter key="price" range={priceRange} setRange={setPriceRange} initialState={initialState} name="Price"/>
                <RangeFilter key="year" range={yearRange} setRange={setYearRange} initialState={initialState} name="Year"/>
                <RangeFilter key="mileage" range={mileageRange} setRange={setMileageRange} initialState={initialState} name="Mileage"/>
                <DropdownFilter key="make" makeList={makeList} setMakeList={setMakeList} 
                setInitialState={setInitialState} initialState={initialState}  name="Make"/>
                
            </div>

        </section>
    )
}