import { useState, useEffect } from "react"

export default function SearchBar(props) {

    const [searchTerm, setSearchTerm] = useState("")

    function handleChange(event) {
        setSearchTerm(event.target.value);        
    }

    useEffect(() => {
        console.log(searchTerm);        

        if(searchTerm === "") {
            props.setSearchFilteredVehiclesIndexs(props.filteredVehiclesIndexs);
            return;
        }

        let newFilteredVehiclesIndexs = new Set();
        let tempsearchTerms = searchTerm.toLocaleLowerCase().split(" ");

        let searchTerms = [];
        let hasYear = false;
        let hasName = false;
        let year = 0;
        let searchString = "";
        for(let i=0; i<tempsearchTerms.length; i++) {
            if(tempsearchTerms[i] !== "") {
                
                //check if the search term is a number
                if( !isNaN(tempsearchTerms[i]) && !hasYear) {
                    hasYear = true;
                    year = tempsearchTerms[i];
                }                
                //check if the search term is a string
                else {
                    hasName = true;
                    searchString += tempsearchTerms[i];
                    searchTerms.push(tempsearchTerms[i]);
                }
            }            
        }

        console.log(searchTerms)

        for(let i=0; i<props.filteredVehiclesIndexs.length; i++) {
            
            const makeModel = props.allVehicles[props.filteredVehiclesIndexs[i]]["make"] +  props.allVehicles[props.filteredVehiclesIndexs[i]]["model"];   
            const modelMake = props.allVehicles[props.filteredVehiclesIndexs[i]]["model"] +  props.allVehicles[props.filteredVehiclesIndexs[i]]["make"];

            if(hasYear){
                if(props.allVehicles[props.filteredVehiclesIndexs[i]]["year"].toString().toLowerCase().includes(year ) ){
                    if(searchTerms.length === 0) {
                        newFilteredVehiclesIndexs.add(props.filteredVehiclesIndexs[i]);
                    }
                    else{                        
                            if(makeModel.toLowerCase().includes(searchString) || modelMake.toLowerCase().includes(searchString) ){
                                newFilteredVehiclesIndexs.add(props.filteredVehiclesIndexs[i]);
                            }                        
                    }
                }
            }else{                
                if(makeModel.toLowerCase().includes(searchString) || modelMake.toLowerCase().includes(searchString) ){
                    newFilteredVehiclesIndexs.add(props.filteredVehiclesIndexs[i]);
                }                
            }
        }         

        props.setSearchFilteredVehiclesIndexs(Array.from(newFilteredVehiclesIndexs));
        console.log("setting search filtered vehicles indexs");

    },[searchTerm, props.filteredVehiclesIndexs]);



    return (
        <div className="search-bar">
            <div className="input-group">
                <input onChange={handleChange} value={searchTerm} type="text" className="search-bar-input form-control" placeholder="Search..." aria-label="Search" aria-describedby="search-addon"/>            
            </div>
        </div>
    )
}