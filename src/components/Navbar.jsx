import finxLogo from "../assets/images/finx.png"

import { useState } from "react";
import Modal from "/src/components/Modal/Modal";

import {useUser} from "/src/components/User/UserContext.jsx"

export default function Navbar(props){

    const { user, signOut, signIn } = useUser();    

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false)
    };

    function loginUser(){
        console.log("Login")
        openModal();
    }

    function logOutUser(){
        signOut();
    }

     
    const [error, setError] = useState('');
    function handleSubmit(event){
        event.preventDefault()
        try{
            const formData = new FormData(event.target)
            console.log(formData.get("email"))
            signIn({email: formData.get("email")})
            setError('')
            closeModal()
        } catch (error) {
            setError(error.message)
        }

    }

    return(
        <header className="site-header">
            <nav className="nav-style">
                <div className="nav-logo"> 
                    <img className="logo-img" src={finxLogo} alt="FINX Logo" />
                    <span className="nav-text" > FINX Data Dashboard </span>
                </div>

                <div className="navbar-container">
                    <a onClick={() => props.setMainDisplay("Inventory")} className="tile-link">Inventory</a>
                    <a onClick={() => props.setMainDisplay("Team Members")} className="tile-link">Team Members</a>
                </div>

                <div className="navbar-user-container">
                    {user ?                     
                    <>
                    <div className="navbar-items-container">
                        <a href="#" className="profile-tile-link">
                            {user.first_name}
                            <img src={user.profile_picture_url} alt="Profile" className="navbar-user-avatar" />    

                        </a>
                        
                    </div>
                    <div className="navbar-items-container">
                        <a href="#" className="tile-link" onClick={logOutUser}>Logout</a>                        
                    </div>

                    </>
                    :
                    <div className="navbar-container">
                        <a href="#" className="tile-link" onClick={loginUser}>Login</a>
                    </div>                
                    }
                </div>

                
                    <Modal isOpen={isModalOpen} onClose={closeModal}  params={{"width": "400px"}}>
                        <h2>Login:</h2>
                        <form onSubmit={handleSubmit}>                        
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <div className="login-form-group">                        
                                <div className="search-bar">
                                    <div className="input-group">
                                        <input  type="email" name="email" className="form-control" placeholder="Email" aria-label="email" required/>            
                                    </div>
                                </div>
                                
                            </div>
                            
                            <div className="login-form-submit">
                            <button type="submit" href="#" className="tile-link" >Sign In</button>   
                            </div>
                        </form>
                        
                    </Modal>                

            </nav>
        </header>
    )
}


  