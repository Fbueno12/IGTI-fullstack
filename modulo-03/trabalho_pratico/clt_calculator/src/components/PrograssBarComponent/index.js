import React from "react";

function PrograssBarComponent({inss, irpf, salary}) {
  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      marginTop: '15px'
    },
    inssBar: {
      width: `${inss}%`,
      height: '20px',
      backgroundColor: '#e67e22'
    },
    irpfBar: {
      width: `${irpf}%`,
      height: '20px',
      backgroundColor: '#c0392b'
    },
    salaryBar: {
      width: `${salary || 100}%`,
      height: '20px',
      backgroundColor: '#16a085'
    }
  }

  const {container, inssBar, irpfBar, salaryBar} = styles;

  return (
    <div style={container}>
      <span style={inssBar}></span>
      <span style={irpfBar}></span>
      <span style={salaryBar}></span>
    </div>
  );
}


export default PrograssBarComponent;
