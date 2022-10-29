import React from 'react';
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import PermisosContextProvider from '../context/PermisosContext';
import PermisoList from '../components/Permisos/List';

function PermisosScreen() {
    return (
        <div className='PermisosScreen'>
            <PermisosContextProvider>
                <PermisoList />
            </PermisosContextProvider>
        </div>
    );
}

export default PermisosScreen;