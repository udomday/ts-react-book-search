import React from "react";
import { Sort } from "../Sort";
import { useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <h1 onClick={() => navigate("/")}>Search for book</h1>
      <Sort />
    </header>
  );
};
