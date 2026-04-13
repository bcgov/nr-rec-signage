import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider';
import Welcome from './pages/Welcome';
import ActionChoice from './pages/ActionChoice';
import NewSign from './pages/NewSign';
import SignConfiguration from './pages/SignConfiguration';
import SignExport from './pages/SignExport';
import FrontofficeLayout from './layouts/FrontofficeLayout';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <FrontofficeLayout>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/action-choice" element={<ActionChoice />} />
          <Route path="/new-sign" element={<NewSign />} />
          <Route path="/sign-configuration/:id" element={<SignConfiguration />} />
          <Route path="/export/:id" element={<SignExport />} />
        </Routes>
      </FrontofficeLayout>
    </AuthProvider>
  );
};

export default App;
