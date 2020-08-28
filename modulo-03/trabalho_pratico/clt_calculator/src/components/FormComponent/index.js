import React, { useState } from "react";
import InputComponent from "../InputComponent";

import {baseINSS, discountINSS, baseIRPF, discountIRPF, baseSalary} from '../../helpers/CalculationHelper';

import './style.css';
import PrograssBarComponent from "../PrograssBarComponent";

function FormComponent() {
  const [number, setNumber] = useState();

  const handleInputChange = (event) => {
    setNumber(event.target.value);
  }
  const discount_inss = discountINSS(number || 0);
  const discount_irpf = discountIRPF(number || 0);
  const liquid_salary = baseSalary(number || 0);
  return (
    <div className="content">
      <InputComponent type='number' label='Salário Bruto' value={number} onChange={handleInputChange}/>
      <div className="calculations">
        <InputComponent type='text' name="b_inss" label='Base INSS' value={baseINSS(number || 0)} readOnly disabled/>
        <InputComponent type='text' name="d_inss" label='Desconto INSS' value={discount_inss.formatted} readOnly disabled/>
        <InputComponent type='text' name="b_irpf" label='Base IRPF' value={baseIRPF(number || 0).formatted} readOnly disabled/>
        <InputComponent type='text' name="d_irpf" label='Desconto IRPF' value={discount_irpf.formatted} readOnly disabled/>
        <InputComponent type='text' name="s_liqd" label='Salário Liquido' value={liquid_salary.formatted} readOnly disabled/>
      </div>
      <PrograssBarComponent inss={discount_inss.percent} irpf={discount_irpf.percent} salary={liquid_salary.percent} />
    </div>
  );
}

export default FormComponent;
