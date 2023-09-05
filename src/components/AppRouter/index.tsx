import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import { Home } from "../../pages";
import { BookPage } from "../../pages/BookPage";

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="book/:id" element={<BookPage />} />
      </Route>
    </Routes>
  );
};
