import React from 'react';
import logo from '../assets/img/RST_logo-Yellow.svg';
import { Outlet, useNavigate } from 'react-router-dom';



const BackofficeLayout= () => {
        const navigate = useNavigate();
  return (
    <div className="backoffice-layout">
        <div className='col-2 backoffice-sidebar bg-primary'>
            <img src={logo} alt="Logo" className='backoffice-logo mb-4' width={'100%'} />
            <div className='menu-item'>
                <a onClick={() => navigate('backoffice/pictograms')} className='text-white'>Pictogram Library Management</a>
            </div>
            <div className='menu-item'>
                <a onClick={() => navigate('backoffice/categories')} className='text-white'>Sign Categories</a>
            </div>
            <div className='menu-item'>
                <a onClick={() => navigate('backoffice/signs')} className='text-white'>Sign Creation History</a>
            </div>

            <div className='menu-item no-border'>
                <a onClick={() => navigate('/')} className='text-white'>Go Back to App</a>
            </div>

        </div>
        <div className='main-container'>
            <main><Outlet /></main>
        </div>
    </div>
  );
};

export default BackofficeLayout;
