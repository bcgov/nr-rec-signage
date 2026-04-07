import React from 'react';
import logo from '../assets/BCID_H_rgb_pos.png';
interface FrontofficeLayoutProps {
  children: React.ReactNode;
}

const FrontofficeLayout: React.FC<FrontofficeLayoutProps> = ({ children }) => {
  return (
    <div className='frontoffice-main'>
      <div className="background-layer"></div>
      <header className='d-flex w-100 justify-content-between align-items-center header-front-office'>
        <div className="logo"><img src={logo} alt="BC Logo" /></div>
        <div className="buttons">
          <button className="btn btn-primary">Create new</button>
          <button className="btn btn-primary">Edit Existing Signs</button>
          <button className="btn btn-secondary">Logout</button>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default FrontofficeLayout;
