import { useState, useEffect } from "react"

import loadingIcon from "/src/assets/images/loadingIcon.png"
import SearchBar from "./SearchBar"
import Sort from "./Sort"
import EditToggle from "./EditToggle"
import VehicleCard from "./VehicleCard"
import Modal from "/src/components/Modal/Modal"
import DivModal from "/src/components/Modal/DivModal"

import { useUser } from "/src/components/User/UserContext.jsx"
import { createVehicle } from "/src/API/Api"
import { use } from "react"

export default function InventoryDisplay(props) {

    const { isAdmin} = useUser(); 

    const [searchFilteredVehiclesIndexs, setSearchFilteredVehiclesIndexs] = useState([]);

    useEffect(() => {
        if (searchFilteredVehiclesIndexs.length === 0){            
            setSearchFilteredVehiclesIndexs(props.filteredVehiclesIndexs);
        }
    }, []);

    const [sortToogle, setSortToogle] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const [displayCards, setDisplayCards] = useState([]);    
    
    const [createVehicleModalOpen, setCreateVehicleModalOpen] = useState(false);
    const openCreateVehicleModal = () => setCreateVehicleModalOpen(true);;
    const closeCreateVehicleModal = () => setCreateVehicleModalOpen(false);;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        closeCreateVehicleModal();
        setIsModalOpen(false);
    }

    const [saveErrorMessage, setSaveErrorMessage] = useState("");
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);        
    const openErrorModal = () => setIsErrorModalOpen(true);
    const closeErrorModal = () =>setIsErrorModalOpen(false);    

    
    function handleAddVehicle(event) {        
        event.preventDefault();        
        const formData = new FormData(event.target);        
        
        const vehileData = {
            make: formData.get("make"),
            model: formData.get("model"),
            year: parseInt(formData.get("year")),
            mileage: parseInt(formData.get("mileage")),
            condition: formData.get("condition"),
            status: formData.get("status"),
            photo_url: formData.get("photo_url"),
            price: parseFloat(formData.get("price")),
            vin: formData.get("vin")
        }

        const createNewVehicle = async() => {            
            try{                
                const data =  await createVehicle(vehileData);                
                openModal();
                props.setRefresh(prev => !prev);
            } catch (error) {   
                setSaveErrorMessage(error.message);                       
                openErrorModal();                                                  
            }            
        }
        createNewVehicle();                             
    }
    
    
    useEffect(() => {        
        let displayVehicles = [];

        let soldSet = new Set();
        let saleID = {};
        for(let i=0; i< props.allSales.length; i++) {
            soldSet.add(props.allSales[i].vehicle.id);
            saleID[props.allSales[i].vehicle.id] = props.allSales[i].id;
        }

        for(let i = 0; i < searchFilteredVehiclesIndexs.length; i++) {
            const sold = soldSet.has(props.allVehicles[searchFilteredVehiclesIndexs[i]].id);
            displayVehicles.push(<VehicleCard 
                editMode={editMode} 
                vehicle={props.allVehicles[searchFilteredVehiclesIndexs[i]]}
                sold={sold}
                saleID={saleID[props.allVehicles[searchFilteredVehiclesIndexs[i]].id]}
                index = {searchFilteredVehiclesIndexs[i]}                
                setAllVehicles={props.setAllVehicles}
                setRefresh={props.setRefresh}
                key={props.allVehicles[searchFilteredVehiclesIndexs[i]].id}/>);
        }
        setDisplayCards(displayVehicles);
        console.log("setting display cards");
    }, [sortToogle, editMode]);


    switch(props.loadingState) {
        case 1: { 
        return (
        <section className="inventory-display-section"> 

            {}
            
            <div className="inventory-display-filters">
                <SearchBar 
                    allVehicles={props.allVehicles} filteredVehiclesIndexs={props.filteredVehiclesIndexs}
                    setSearchFilteredVehiclesIndexs={setSearchFilteredVehiclesIndexs}
                />
                <Sort 
                    allVehicles={props.allVehicles} 
                    searchFilteredVehiclesIndexs={searchFilteredVehiclesIndexs} setSearchFilteredVehiclesIndexs={setSearchFilteredVehiclesIndexs}
                    setSortToogle={setSortToogle}                    
                />
                { isAdmin &&
                <>

                <button onClick={openCreateVehicleModal} className="tile-link tile-link-create">Add Vehicle</button>

                <EditToggle setEditMode={setEditMode} editMode={editMode} />
                </>
                }
            </div>

            <div className="number-of-vehicles">
                <span className="number-of-vehicles-span">{searchFilteredVehiclesIndexs.length} vehicles found </span>
            </div>

            <div className="inventory-display-vehicles" id="inventory-display-vehicles">
                {displayCards}
                
            </div>

            <Modal isOpen={createVehicleModalOpen} onClose={closeCreateVehicleModal}>
                <div className="modal-content-success">
                    <h3>Add vehicle info:</h3>

                    <form onSubmit={handleAddVehicle} id="saveForm">

                    <div className="new-vehicle">

                        <div className="new-vehicle-row">
                            <div className="info-div">                                                        
                                <span className="input-span">Year: </span>
                                <input type="number" name="year" defaultValue="2022" className="edit-input" />                            
                            </div>
                            <div className="info-div">                                                        
                                <span className="input-span">Make: </span>
                                <input type="text" name="make" defaultValue="Honda" className="edit-input" />                            
                            </div>
                            <div className="info-div">                                                        
                                <span className="input-span">Model: </span>
                                <input type="text" name="model" defaultValue="Civic" className="edit-input" />                            
                            </div>
                        </div>
                        <div className="new-vehicle-row">
                            <div className="info-div">                                                        
                                <span className="input-span">Mileage: </span>
                                <input type="number" name="mileage" defaultValue="2000" className="edit-input" />                            
                            </div>
                            <div className="info-div">                                                        
                                <span className="input-span">Condition: </span>
                                <input type="text" name="condition" defaultValue="new" className="edit-input " />                            
                            </div>
                            <div className="info-div">                                                        
                                <span className="input-span">Status: </span>
                                <input type="text" name="status" defaultValue="in-stock" className="edit-input" />                            
                            </div>
                        </div>

                        <div className="new-vehicle-row">

                            <div className="info-div">                                                        
                                <span className="input-span">PhotoURL: </span>
                                <input type="text" name="photo_url" defaultValue="https://upload.wikimedia.org/wikipedia/commons/a/a4/2019_Toyota_Corolla_Icon_Tech_VVT-i_Hybrid_1.8.jpg" className="edit-input ei3" />                            
                            </div>
                            <div className="info-div">                                                        
                                <span className="input-span">Price: </span>
                                <input type="number" name="price" defaultValue="20000" className="edit-input" /> 
                            </div>
                        </div>

                        <div className="new-vehicle-row">

                            <div className="info-div">                                                        
                                <span className="input-span">VIN: </span>
                                <input type="text" name="vin" defaultValue="VIN0000201" className="edit-input ei3" />                            
                            </div>                            
                        </div>

                        <div className="new-vehicle-row-save">
                            <button type="submit" className="tile-link tile-link-save">Save</button> 
                        </div>
                        
                    </div>
                    
                    
                    </form>

                </div>    

                <DivModal isOpen={isModalOpen} onClose={closeModal}>
                    <div className="modal-content-success">
                        <h2>New vehicle added successfully </h2>
                        <div className="modal-success-button">
                            <a onClick={closeModal} className="tile-link tile-link-check">Close</a>    
                        </div>
                    </div>
                </DivModal>

                <DivModal isOpen={isErrorModalOpen} onClose={closeErrorModal}>
                    <div className="modal-content-success">
                        <h2>Error in adding new vehicle: </h2>
                        <p>{saveErrorMessage}</p>
                        <div className="modal-success-button">
                            <a onClick={closeErrorModal} className="tile-link tile-link-check">Close</a>    
                        </div>
                    </div>
                </DivModal>

            </Modal>
            
        </section>
    )
    }
    case 0: {
        return (
            <div className="inventroy-display-loading">
                <div className="inventroy-loading-image spinner">
                    
                </div>
            </div>
        )
    }
    case 2: {
        return (
            <div className="inventroy-display-loading">
                <div className="inventroy-loading-error">
                    <span className="error-icon">Server error. Try again later.</span>
                </div>
            </div>
        )
    }

}
}