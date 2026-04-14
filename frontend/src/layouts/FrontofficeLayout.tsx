import React from 'react';
import logo from '../assets/BCID_H_rgb_pos.png';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

const FrontofficeLayout = () => {
    const navigate = useNavigate();
    const { hasRole, isAuthenticated, logout } = useAuth();
  return (
    <>
    {isAuthenticated && <div className='frontoffice-main'>
      <div className="background-layer"></div>
      <header className='d-flex w-100 justify-content-between align-items-center header-front-office'>
        <div className="logo"><img src={logo} alt="BC Logo" /></div>
        <div className="buttons">
          <button onClick={() => {navigate('/new-sign')}} className="btn btn-primary">Create new</button>
          <button onClick={() => {navigate('/existing-signs')}}  className="btn btn-primary">Edit Existing Signs</button>
          {hasRole('admin') && (
            <button onClick={() => {navigate('/backoffice/pictograms')}} className="btn btn-primary">Administrator</button>
          )}
          <button onClick={() => {void logout()}} className="btn btn-secondary">Logout</button>
        </div>
      </header>
      <main><Outlet /></main>
    </div>}
    </>
  );
};

export default FrontofficeLayout;
