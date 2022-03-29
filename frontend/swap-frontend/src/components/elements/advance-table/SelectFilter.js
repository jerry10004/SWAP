// import node module libraries
import React, { useState, Fragment } from "react";
import { useAsyncDebounce } from "react-table";
import { Form } from "react-bootstrap";

const SelectFilter = ({ filter, setFilter, placeholder, options }) => {
  //   console.log("options is ", options);
  const [filterValue, setSelectFilter] = useState(filter);
  const onChange = useAsyncDebounce((value) => {
    setSelectFilter(filterValue || undefined);
  }, 1000);
  return (
    <Fragment>
      <Form.Select
        className="text-muted"
        value={filterValue}
        onChange={(e) => {
          setSelectFilter(e.target.value || undefined);
        }}
      >
        {placeholder ? (
          <option value="" className="text-muted">
            {placeholder}
          </option>
        ) : (
          ""
        )}
        {options.map((item, index) => {
          return (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </Form.Select>
    </Fragment>
  );
};

export default SelectFilter;
