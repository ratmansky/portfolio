import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import Covo from './pages/Covo';
import Elli from './pages/Elli';
import RedesignOfTeacherDashboard from './pages/RedesignOfTeacherDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageTransition />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects/covo" element={<Covo />} />
          <Route path="/projects/elli" element={<Elli />} />
          <Route
            path="/projects/redesign-of-teacher-dashboard"
            element={<RedesignOfTeacherDashboard />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
