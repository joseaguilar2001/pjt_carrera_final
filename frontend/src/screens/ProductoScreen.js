import React from 'react';
import ProductoContextProvider from '../context/ProductoContext';
import ProductoList from '../components/Producto/ProductoList';

function ProductoScreen() {
    return (
        <div className='ProductoScreen'>
            <ProductoContextProvider>
                <ProductoList />
            </ProductoContextProvider>
        </div>
    );
}

export default ProductoScreen;