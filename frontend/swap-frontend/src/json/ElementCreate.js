import React from "react";
import Text from "components/elements/bootstrap/Text";
import Email from "components/elements/bootstrap/Email";
import Textarea from "components/elements/bootstrap/Textarea";
import Password from "components/elements/bootstrap/Password";
import Select from "components/elements/bootstrap/Select";
import Radio from "components/elements/bootstrap/Radio";

const ElementCreate = ({ field: { type, id, label, placeholder, value, input, options, min, max, pattern, cols, rows, maxlength, step, width } }) => {
  switch (type) {
    case "text":
      return <Text id={id} label={label} placeholder={placeholder} value={value} create="1" />;
    case "select":
      return <Select id={id} label={label} placeholder={placeholder} value={value} options={options} width={width} create="1" />;
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
      return <Email id={id} label={label} placeholder={placeholder} value={value} width={width} create="1" />;
    case "password":
      return <Password id={id} label={label} placeholder={placeholder} value={value} width={width} create="1" />;

    // case "file":
    //   return <File id={id} label={label} width={width} />;

    // case "number":
    //   return <Number id={id} label={label} value={value} min={min} max={max} width={width} />;
    case "tel":
      return <Text id={id} label={label} value={value} placeholder={placeholder} pattern={pattern} width={width} create="1" />;
    // case "range":
    //   return <Range id={id} label={label} value={value} min={min} max={max} step={step} width={width} />;
    case "textarea":
      return <Textarea id={id} label={label} value={value} placeholder={placeholder} cols={cols} rows={rows} maxlength={maxlength} width={width} create="1" />;
    // case "button":
    //   return <Button id={id} label={label} value={value} width={width} />;

    case "radio":
      return <Radio id={id} label={label} value={value} options={options} width={width} create="1" />;
    default:
      return null;
  }
};

export default ElementCreate;
