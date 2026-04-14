import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/BC-Logo-Square.png';
const Welcome: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/action-choice');
  };

  return (
    <div className="centered-container d-flex flex-column align-items-center justify-content-center w-30">
        <img src={logo} alt="BC Parks Logo" className="mb-4" style={{ width: '33%' }} />
      <p className="text-center text-big text-primary">Welcome to the RST Signage App. Complete the questionnaire below to generate a sign and download print-ready files.</p>
      <button className="mt-4 btn btn-primary" onClick={handleStart}>
        Begin <i className="bi bi-arrow-right"></i>
      </button>
    </div>
  );
};

export default Welcome;
