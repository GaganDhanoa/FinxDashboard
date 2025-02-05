import { useState, useEffect } from "react"
import Filters from "./Filters/Filters"
import InventoryDisplay from "./InvertoryDisplay/InventoryDisplay"
import {fetchAllVehicles, fetchSales} from "/src/API/Api"

import "/src/Inventory.css"

export default function Inventory(props) {

    const [loadingState, setLoadingState] = useState(0);
    const [allVehicles, setAllVehicles] = useState([])
    const [allSales, setAllSales] = useState([])
    const [filteredVehiclesIndexs, setFilteredVehiclesIndexs] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {        
        
        const getData = async() => {
            try{
                const data =  await fetchAllVehicles()                
                setAllVehicles(data)     
                
                console.log("Setting all vehicles")
                
                //only set filteredVehiclesIndexs on first load
                if(filteredVehiclesIndexs.length === 0) 
                    setFilteredVehiclesIndexs(data.map((vehicle, index) => index))
                
            } catch (error) {
                console.error('Error fetching vehicles:', error);
                setLoadingState(2);
            } finally {
                setLoadingState(1);
            }
        }
        getData()

        const getSales = async() => {
            try{
                const data =  await fetchSales()                
                setAllSales(data)                
            } catch (error) {
                console.error('Error fetching sales:', error);
            }
        }
        getSales()

        
    }, [refresh])

    return (
        <section className="inventory-section"> 
            <div className="inventory-container"> 
                <Filters  allVehicles={allVehicles} filteredVehiclesIndexs={filteredVehiclesIndexs} setFilteredVehiclesIndexs={setFilteredVehiclesIndexs}/>
                <InventoryDisplay  
                    allVehicles={allVehicles} setAllVehicles={setAllVehicles}
                    filteredVehiclesIndexs={filteredVehiclesIndexs} setFilteredVehiclesIndexs={setFilteredVehiclesIndexs} 
                    loadingState={loadingState}
                    setRefresh={setRefresh}
                    allSales={allSales}
                    />

            </div>
            
        </section>
    )
}