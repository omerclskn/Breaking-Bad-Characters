import './Header.scss';

import React from "react";
import { PageHeader } from "antd";
import { Link } from "react-router-dom";
import Cube from "../Cube/Cube";

const Header = () => (
  <div className="page-header-wrapper">
    <Link to="/">
      <PageHeader title="Characters" />
    </Link>
    <Link to="/quotes">
      <PageHeader title="Quotes" />
    </Link>

    <Cube />
  </div>
);

export default Header;
