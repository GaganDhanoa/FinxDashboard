import React, { createContext, useState, useContext, useEffect } from 'react';

import { fetchAllUsers } from "/src/API/Api"



// Create a context for the user
const UserContext = createContext();

// Create a provider component
export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [allUsers, setAllUsers] = useState([]); 
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        setIsAdmin(user?.role === 'admin' || user?.role === 'manager' || user?.role === 'principal');
    }, [user]);
    

    useEffect(() => {
        const getData = async() => {
            try{
                const data =  await fetchAllUsers()                
                setAllUsers(data)                
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        getData()
    }, [])


    // Check localStorage for user data on app load
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
        setUser(storedUser);    
        }
    }, []);

    
    // Function to sign in the user
    const signIn = (userData) => {

        for(let i = 0; i < allUsers.length; i++) {
            if(allUsers[i].email === userData.email) {
                setUser(allUsers[i]);
                localStorage.setItem('user', JSON.stringify(allUsers[i])); // Persist user data
                                                                
                return;
            }
        }
        throw new Error('User with email: ' + userData.email + ' not found');
    };

    // Function to sign out the user
    const signOut = () => {
        setUser(null);
        localStorage.removeItem('user'); // Clear user data
    };

        return (
        <UserContext.Provider value={{ user, signIn, signOut, isAdmin, allUsers }}>
        {children}
        </UserContext.Provider>
    );
}

// Custom hook to use the UserContext
export function useUser() {
  return useContext(UserContext);
}
