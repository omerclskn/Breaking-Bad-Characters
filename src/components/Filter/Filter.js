import "./Filter.scss";

import React, { useState } from "react";
import Search from "antd/es/input/Search";
import { useDispatch, useSelector } from "react-redux";
import { setFilterName } from "../../redux/characterSlice";
import { UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useDebouncedCallback } from "use-debounce";

const Filter = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.characters.status);
  const filterName = useSelector((state) => state.characters.filterName);

  const [searchValue, setSearchValue] = useState(filterName);

  const debouncedOnChange = useDebouncedCallback((value) => {
    dispatch(setFilterName(value));
  }, 300);

  const handleFilter = (value = "") => {
    setSearchValue(value);
    debouncedOnChange(value);
  };

  return (
    <div className="filter-wrapper">
      <Search
        allowClear
        prefix={<UserOutlined />}
        placeholder="Search Characters"
        size="large"
        value={searchValue}
        onChange={(e) => handleFilter(e.target.value)}
        onSearch={(e) => handleFilter(e)}
        loading={status === "loading"}
      />
      <Button
        danger
        disabled={filterName === ""}
        size="large"
        type="primary"
        onClick={() => handleFilter()}
      >
        Reset
      </Button>
    </div>
  );
};

export default Filter;
