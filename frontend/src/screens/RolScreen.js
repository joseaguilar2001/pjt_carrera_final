import React from 'react';
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import RolContextProvider from '../context/RolContext';
import List from '../components/Rol/RolList';

function RolScreen() {
    return (
        <div className='RolScreen'>
            <RolContextProvider>
                <List />
            </RolContextProvider>
        </div>
    );
}

export default RolScreen;