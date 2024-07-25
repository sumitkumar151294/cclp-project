import React from 'react';

const Dropdown = ({ field, form, options, onChange, ...props }) => {
  const handleChange = (event) => {
    form.setFieldValue(field.name, event.target.value);
    onChange && onChange(event.target.value); // Call onChange prop with selected value
  };

  return (
    <select {...field} {...props} onChange={handleChange}>
      <option value="">Select</option>
      {options?.map((option) => (
        <option key={option?.value} value={option?.value}>
          {option?.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
