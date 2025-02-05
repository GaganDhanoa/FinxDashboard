import { updateVehicle, deleteVehicle, makeSale, deleteSale } from "../../../API/Api";

import { useState, useRef, useEffect } from "react";
import DivModal from "/src/components/Modal/DivModal";
import Modal from "/src/components/Modal/Modal";
import {useUser} from "/src/components/User/UserContext.jsx"
import { useInView } from "react-intersection-observer";

import { ImageWithLoader } from "../../ImageLoader/ImageWithLoader";

export default function VehicleCard(props) {                
    
    const { user } = useUser();  
    const statusInputRef = useRef(null);

    const [isVisible, setIsVisible] = useState(false);
    

    const { lazyRef, inView } = useInView({
        
        triggerOnce: true, // Load only once
        threshold: 0.5, // Load when 10% of the div is visible
      });
    

    const [updatedVehicle, setUpdatedVehicle] = useState({});    

    const [modalContent, setModalContent] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        props.setAllVehicles(prev => {
            prev[parseInt(props.index)] = updatedVehicle
            return [...prev]
        });
        props.setRefresh(prev => !prev);
        setIsModalOpen(false)
    };
    

    const [markSoldModal, setMarkSoldModal] = useState(false);
    const openMarkSoldModal = () => setMarkSoldModal(true);
    const closeMarkSoldModal = () => setMarkSoldModal(false);

    const [confirmSoldModal, setConfirmSoldModal] = useState(false);
    const openConfirmSoldModal = () => setConfirmSoldModal(true);
    const closeConfirmSoldModal = () => {
        props.setAllVehicles(prev => {
            prev[parseInt(props.index)] = updatedVehicle
            return [...prev]
        });
        props.setRefresh(prev => !prev);
        setConfirmSoldModal(false);
    }

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const openDeleteModal = () => setIsDeleteModalOpen(true);    
    const closeDeleteModal = () => {                                     
        props.setRefresh(prev => !prev);
        setIsDeleteModalOpen(false);
    }

    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
    const openConfirmDeleteModal = () => setIsConfirmDeleteModalOpen(true);
    const closeConfirmDeleteModal = () => setIsConfirmDeleteModalOpen(false);


    const [saveErrorMessage, setSaveErrorMessage] = useState("");        
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const openErrorModal = () => setIsErrorModalOpen(true);
    const closeErrorModal = () => setIsErrorModalOpen(false);

    const [isContactSalesModalOpen, setIsContactSalesModalOpen] = useState(false);
    const openContactSalesModal = () => setIsContactSalesModalOpen(true);
    const closeContactSalesModal = () => setIsContactSalesModalOpen(false);

    function handleEditVehicle(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const make = formData.get("make");
        const model = formData.get("model");
        const year = formData.get("year");
        const mileage = formData.get("mileage");
        const price = formData.get("price");
        const status = formData.get("status");
        const id = props.vehicle.id        

        console.log(make, model, year, mileage, price, status);

        const tempupdatedVehicle = {
            ...props.vehicle,
            make: make,
            model: model,
            year: parseInt(year), // Convert to integer to handle non-numeric year,
            mileage: parseInt(mileage), // Convert to integer to handle non-numeric mileage,
            price: parseFloat(price), // Convert to float to handle non-numeric price,
            status: status            
        }        
        const updateData = async() => {
            try{
                const data =  await updateVehicle(id, tempupdatedVehicle)
                console.log(data);                   
                setModalContent("Update Successful");             
                openModal();                                
                setUpdatedVehicle(tempupdatedVehicle);                
            } catch (error) {
                console.error('Error updating vehicle:', error);
                openErrorModal();
                setSaveErrorMessage(error.message);               

            } 
        }
        updateData()             
    }

    function handleDeleteVehicle(event) {
        event.preventDefault();
        const id = props.vehicle.id        
        
        const deleteData = async() => {
            try{
                const data =  await deleteVehicle(id)                
                closeConfirmDeleteModal();
                openDeleteModal();  
                                                        
            } catch (error) {
                console.error('Error deleting vehicle:', error);
                closeConfirmDeleteModal();
                openErrorModal();
                setSaveErrorMessage(error.message);               

            } 
        }
        deleteData()
    }

    function handleMarkSold(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        
        const tempupdatedVehicle = {
            ...props.vehicle,            // Convert to float to handle non-numeric price,
            status: "sold"            
        }        
        const updateData = async() => {
            try{
                const data =  await updateVehicle(props.vehicle.id, tempupdatedVehicle)
                console.log(data);                                
                setUpdatedVehicle(tempupdatedVehicle); 
                if (statusInputRef.current) {
                    statusInputRef.current.value = "sold";
                }               
            } catch (error) {
                console.error('Error updating vehicle:', error);
                openErrorModal();
                setSaveErrorMessage(error.message);               

            } 
        }
        
        const data = {
            user: user.id,
            vehicle: parseInt(props.vehicle.id).toString(),
            selling_price: formData.get("selling_price"),
            date: formData.get("date")
        }
                
        const makeSaleData = async() => {
            try{
                const data2 =  await makeSale(data) 
                updateData() 
                closeMarkSoldModal();
                openConfirmSoldModal();                               
            } catch (error) {
                console.error('Error creating sale:', error);
                openErrorModal();
                setSaveErrorMessage(error.message);               

            }            
        }
        makeSaleData()
    }

    function handleDeleteSale(event) {
        event.preventDefault();
        const id = props.vehicle.id;

        const tempupdatedVehicle = {
            ...props.vehicle,
            status: "in-stock"            
        }        
        const updateData = async() => {
            try{
                const data =  await updateVehicle(props.vehicle.id, tempupdatedVehicle)
                console.log(data);                                
                setUpdatedVehicle(tempupdatedVehicle);                
                if (statusInputRef.current) {
                    statusInputRef.current.value = "in-stock";
                }
            } catch (error) {
                console.error('Error updating vehicle:', error);
                openErrorModal();
                setSaveErrorMessage(error.message);               

            } 
        }
        
        const deleteData = async() => {
            try{
                const data =  await deleteSale(props.saleID)                                
                setModalContent("Sale Deleted");
                updateData();
                openModal();                              
            } catch (error) {
                console.error('Error deleting sale:', error);                
                openErrorModal();
                setSaveErrorMessage(error.message);

            } 
        }
        deleteData()
    }

    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const today_date = `${year}-${month}-${day}`;


    return (

        <>                

        <div className="vehicle-card" ref={lazyRef}> 

            <ImageWithLoader src={props.vehicle.photo_url} alt={props.vehicle.make} />
            
            <div className="vehicle-card-info"> 
                <form onSubmit={handleEditVehicle} id="saveForm">
                <div className="vehicle-info">
                    <div className="info-div">
                    {!props.editMode ?
                        <span className="display-span"> {props.vehicle.year} {props.vehicle.make} {props.vehicle.model}</span>                        
                        :
                        <>
                        <input type="number" name="year" defaultValue={props.vehicle.year} className="edit-input" />
                        <input type="text" name="make" defaultValue={props.vehicle.make}  className="edit-input"/>
                        <input type="text" name="model" defaultValue={props.vehicle.model} className="edit-input"/>
                        </>
                    }
                    </div>
                </div>

                <div className="vehicle-info">
                    <div className="info-div">
                        {!props.editMode ?
                        <span className="display-span">{props.vehicle.mileage.toLocaleString()} Km </span>
                        :
                        <>                          
                        <input type="number" name="mileage" defaultValue={props.vehicle.mileage} className="edit-input ei2" /> 
                        <span className="input-span">Km </span>
                        </>
                        }
                    </div>
                    <div className="info-div">
                        {!props.editMode ?
                            <span className="display-span"> Condition: {props.vehicle.condition}</span>
                            :
                            <>  
                            <span className="input-span">Condition: </span>
                            <input type="text" name="condition" defaultValue={props.vehicle.condition} className="edit-input ei2" />
                            </>
                        }
                    </div>
                </div>

                <div className="vehicle-info vehicle-info2 ">
                    <div className="info-div">
                        {!props.editMode ?
                        <span className="display-span">Price: ${props.vehicle.price.toLocaleString()}</span>
                        :
                        <>  
                            <span className="input-span">Price: </span>                                                      
                            <input type="number" name="price" defaultValue={props.vehicle.price}  className="edit-input" />                            
                            
                        </>
                        }
                    </div>

                    {props.editMode ?
                        <div className="info-div">    
                            <span className="input-span">Status: </span>                   
                            <input type="text" name="status" defaultValue={props.vehicle.status} className="edit-input"
                            key={props.vehicle.id}
                            ref={statusInputRef}
                             />                    
                        </div>
                    :
                    <div className="info-div hover-container">
                        <div className="visible-info">
                            <span className="additional-info display-span">More Info </span>
                        </div>
                        <div className="hidden-info">
                            <div className="info-div info-div2">
                            <span className="display-span">Vin: {props.vehicle.vin}</span>
                            </div>
                            <div className="info-div info-div2">
                            <span className="display-span">Status: {props.vehicle.status}</span>
                            </div>
                            <div className="info-div info-div2">
                            <span className="display-span">ID: {props.vehicle.id}</span>
                            </div>
                        </div>
                    </div>
                    }
                </div>

                <div className="vehicle-info vehicle-info-check">   
                    {props.editMode ?
                        <>
                            {props.sold ?
                                <button type="button" onClick={handleDeleteSale} className="tile-link tile-link-delete">Delete Sale</button> 
                            :
                            <>
                                <button type="button" onClick={openConfirmDeleteModal} className="tile-link tile-link-delete">Delete</button> 
                                <button type="button" onClick={openMarkSoldModal} className="tile-link tile-link-delete">Sell</button> 
                            </>
                            }   
                            <button type="submit" className="tile-link tile-link-save">Save</button>                             
                        </>
                        :
                        <>
                        {props.sold ?
                                <div className="info-div">
                                    <span className="input-span">SOLD </span>    
                                </div>
                            :
                                <a onClick={openContactSalesModal} className="tile-link tile-link-check">Check Availability</a>
                        }
                        </>
                    }
                </div>
                </form>
            </div>

            <DivModal isOpen={isModalOpen} onClose={closeModal}>
                <div className="modal-content-success">
                    <h2>{modalContent} </h2>
                    <div className="modal-success-button">
                        <a onClick={closeModal} className="tile-link tile-link-check">Close</a>    
                    </div>
                </div>
            </DivModal>

            <DivModal isOpen={markSoldModal} onClose={closeMarkSoldModal}>
                <div className="modal-content-success">
                    <h3>Confirm Sale </h3>
                    <div className="modal-success-button">
                        <form onSubmit={handleMarkSold}>
                            <div className="new-vehicle-row">
                                <div className="info-div">                                                        
                                    <span className="input-span">Selling Price: </span>
                                    <input type="number" name="selling_price" defaultValue={props.vehicle.price} className="edit-input" />                            
                                </div>
                                
                            </div>
                            <div className="new-vehicle-row">
                                <div className="info-div">                                                        
                                    <span className="input-span">Date: </span>
                                    
                                    <input type="text" name="date" defaultValue={today_date} className="edit-input ei4" />                            
                                </div>                            
                            </div>
                            <div className="new-vehicle-row-save">
                                <a onClick={closeMarkSoldModal} className="tile-link tile-link-check">Close</a>    
                                <button type="submit" className="tile-link tile-link-save">Confirm</button>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </DivModal>

            <DivModal isOpen={confirmSoldModal} onClose={closeConfirmSoldModal}>
                <div className="modal-content-success">
                    <h2>Sale Successful </h2>
                    <div className="modal-success-button">
                        <a onClick={closeConfirmSoldModal} className="tile-link tile-link-check">Close</a>    
                    </div>
                </div>
            </DivModal> 

            <DivModal isOpen={isConfirmDeleteModalOpen} onClose={closeConfirmDeleteModal}>
                <div className="modal-content-success">
                    <h2>Confirm Delete </h2>
                    <div className="modal-success-button">                        
                        <a onClick={closeConfirmDeleteModal} className="tile-link tile-link-check">Close</a>    
                        <a onClick={handleDeleteVehicle} className="tile-link tile-link-delete">Delete</a>
                    </div>
                </div>
            </DivModal>

            <DivModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
                <div className="modal-content-success">
                    <h2>Delete Successful </h2>
                    <div className="modal-success-button">
                        <a onClick={closeDeleteModal} className="tile-link tile-link-check">Close</a>    
                    </div>
                </div>
            </DivModal>            

            <DivModal isOpen={isErrorModalOpen} onClose={closeErrorModal}>
                <div className="modal-content-success">
                    <h2>Error: </h2>
                    <p>{saveErrorMessage}</p>
                    <div className="modal-success-button">
                        <a onClick={closeErrorModal} className="tile-link tile-link-check">Close</a>    
                    </div>
                </div>
            </DivModal>
            
            <div className="contact-sales-modal">
            <Modal isOpen={isContactSalesModalOpen} onClose={closeContactSalesModal} params={{"width": "350px"}}>
                <div className="modal-content-success">
                    <h2>Contact Sales</h2>
                    
                    <div className="modal-success-button">
                        <a onClick={closeContactSalesModal} className="tile-link tile-link-check">Close</a>    
                    </div>
                </div>
            </Modal>
            </div>

        </div>
           
        </>

    )
}