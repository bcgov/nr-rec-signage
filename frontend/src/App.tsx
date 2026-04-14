import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";

import Welcome from "./pages/Welcome";
import ActionChoice from "./pages/ActionChoice";
import NewSign from "./pages/NewSign";
import SignConfiguration from "./pages/SignConfiguration";
import SignExport from "./pages/SignExport";
import SignList from "./pages/backoffice/SignList";
import CategoryList from "./pages/backoffice/CategoryList";
import SignDetail from "./pages/backoffice/SignDetail";

import FrontofficeLayout from "./layouts/FrontofficeLayout";
import BackofficeLayout from "./layouts/BackofficeLayout";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* FRONT OFFICE */}
        <Route element={<FrontofficeLayout />}>
          <Route path="/" element={<Welcome />} />
          <Route path="/action-choice" element={<ActionChoice />} />
          <Route path="/new-sign" element={<NewSign />} />
          <Route path="/sign-configuration/:id" element={<SignConfiguration />} />
          <Route path="/export/:id" element={<SignExport />} />
        </Route>

        {/* BACK OFFICE */}
        <Route element={<BackofficeLayout />}>
          <Route path="/backoffice/pictograms" element={<SignList />} />
          <Route path="/backoffice/categories" element={<CategoryList />} />
          <Route path="/backoffice/categories/:id" element={<SignDetail />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
