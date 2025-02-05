
import Dropdown from 'react-bootstrap/Dropdown';

import { useState, useEffect, useRef } from 'react';

export default function Sort(props) {
     
    const [currentSort, setCurrentSort] = useState("");

    function handleClick(event) {
        event.preventDefault();
        setCurrentSort(event.target.innerText);                
    }

    useEffect(() => {
        console.log(currentSort);
        switch(currentSort) {
            case "Price- Low to High": props.setSearchFilteredVehiclesIndexs((prev) => prev.sort((a,b) => props.allVehicles[a]["price"] - props.allVehicles[b]["price"])); break;
            case "Price- High to Low": props.setSearchFilteredVehiclesIndexs((prev) => prev.sort((a,b) => props.allVehicles[b]["price"] - props.allVehicles[a]["price"])); break;
            case "Year- Low to High": props.setSearchFilteredVehiclesIndexs((prev) => prev.sort((a,b) => props.allVehicles[a]["year"] - props.allVehicles[b]["year"])); break;
            case "Year- High to Low": props.setSearchFilteredVehiclesIndexs((prev) => prev.sort((a,b) => props.allVehicles[b]["year"] - props.allVehicles[a]["year"])); break;
            case "Mileage- Low to High": props.setSearchFilteredVehiclesIndexs((prev) => prev.sort((a,b) => props.allVehicles[a]["mileage"] - props.allVehicles[b]["mileage"])); break;
            case "Mileage- High to Low": props.setSearchFilteredVehiclesIndexs((prev) => prev.sort((a,b) => props.allVehicles[b]["mileage"] - props.allVehicles[a]["mileage"])); break;
        }        
        props.setSortToogle( prev => !prev );
        
    }, [currentSort, props.searchFilteredVehiclesIndexs]);

    const dropdownRef = useRef(null);
    const handleSelect = () => {
        // Blur the dropdown toggle button to remove focus
        dropdownRef.current.blur();
      };

    return (
        <section className="sort-section"> 
                        
            <Dropdown onSelect={handleSelect}>
                <Dropdown.Toggle className="sort-dropdown-button" ref={dropdownRef}>
                    {"Sort: " + currentSort}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                <Dropdown.Item className="sort-dropdown-button2" eventKey="1" onClick={handleClick}>Price- Low to High</Dropdown.Item>
                <Dropdown.Item className="sort-dropdown-button2" eventKey="2" onClick={handleClick}>Price- High to Low</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="sort-dropdown-button2" eventKey="3" onClick={handleClick}>Year- Low to High</Dropdown.Item>
                <Dropdown.Item className="sort-dropdown-button2" eventKey="4" onClick={handleClick}>Year- High to Low</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="sort-dropdown-button2" eventKey="5" onClick={handleClick}>Mileage- Low to High</Dropdown.Item>
                <Dropdown.Item className="sort-dropdown-button2" eventKey="6" onClick={handleClick}>Mileage- High to Low</Dropdown.Item>
                                
                </Dropdown.Menu>
            </Dropdown>
            
        </section>
    )
}