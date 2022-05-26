import React from "react";
import Text from "components/elements/bootstrap/Text";
import Email from "components/elements/bootstrap/Email";
import Textarea from "components/elements/bootstrap/Textarea";
import Password from "components/elements/bootstrap/Password";
import Select from "components/elements/bootstrap/Select";
import Radio from "components/elements/bootstrap/Radio";

const Element = ({ field: { type, id, label, placeholder, value, input, options, min, max, pattern, cols, rows, maxlength, step, width, create } }) => {
  switch (type) {
    case "text":
      return <Text id={id} label={label} placeholder={placeholder} value={value} create={create} />;
    case "select":
      return <Select id={id} label={label} placeholder={placeholder} value={value} options={options} width={width} />;
    // case "checkbox":
    //   return <Checkbox id={id} label={label} value={value} width={width} />;
    // case "color":
    //   return <Color id={id} label={label} value={value} width={width} />;

    // case "date":
    //   return <Date id={id} label={label} value={value} min={min} max={max} width={width} />;
    // case "datetime-local":
    //   return <Datetime id={id} label={label} value={value} min={min} max={max} width={width} />;
    // case "month":
    //   return <Month id={id} label={label} value={value} min={min} max={max} width={width} />;
    case "email":
      return <Email id={id} label={label} placeholder={placeholder} value={value} width={width} create={create} />;
    case "password":
      return <Password id={id} label={label} placeholder={placeholder} value={value} width={width} create={create} />;

    // case "file":
    //   return <File id={id} label={label} width={width} />;

    // case "number":
    //   return <Number id={id} label={label} value={value} min={min} max={max} width={width} />;
    case "tel":
      return <Text id={id} label={label} value={value} placeholder={placeholder} pattern={pattern} width={width} create={create} />;
    // case "range":
    //   return <Range id={id} label={label} value={value} min={min} max={max} step={step} width={width} />;
    case "textarea":
      return <Textarea id={id} label={label} value={value} placeholder={placeholder} cols={cols} rows={rows} maxlength={maxlength} width={width} create={create} />;
    // case "button":
    //   return <Button id={id} label={label} value={value} width={width} />;

    case "radio":
      return <Radio id={id} label={label} value={value} options={options} width={width} />;
    default:
      return null;
  }
};

export default Element;
