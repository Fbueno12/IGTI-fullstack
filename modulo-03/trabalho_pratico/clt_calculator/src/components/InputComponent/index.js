import React from "react";

function InputComponent({type, label, value, onChange, readOnly, disabled, name}) {
  let color = '#000';
  
  switch (name) {
    case 'd_inss':
      color = '#e67e22';
      break;
    case 'd_irpf':
      color = '#c0392b';
      break;
    case 's_liqd':
      color = '#16a085';
      break;  
    default:
      color = '#000';
      break;
  }

  return (
    <div className="form-input">
      <label htmlFor="sl_bruto">{label}</label><br />
      <input type={type} value={value || 0} 
      onChange={onChange} 
      disabled={disabled} 
      readOnly={readOnly}
      style={{color: color}}
      step='50' />
    </div>
  );
}

export default InputComponent;
