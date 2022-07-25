import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicLayout from "./components/layout/PublicLayout";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import Landing from "./pages/Landing";
import Models from "./pages/Models";
import MyCars from "./pages/MyCars";
import Rent from "./pages/Rent";
import Reserve from "./pages/Reserve";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<Landing />} />
          <Route path="sign-in" element={<Signin />} />
          <Route path="sign-up" element={<Signup />} />
          <Route path="admin" element={<Admin />} />
          <Route path="models" element={<Models />} />
          <Route path="rent/:id" element={<Rent />} />
          <Route path="reserve/:id" element={<Reserve />} />
          <Route path="my-cars" element={<MyCars />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
