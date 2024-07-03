import React from 'react'

const Popup1312 = () => {
  return (
    <>
    <div>Popup1312</div>
    <div className="bi-form-group" key={index}>
    <select className={`bi-form-field heading-600-14-12 ${(mObj.machine) ? "" : "empty"}`} onChange={(e) => onMachineChange(index,e.target.value)} placeholder="Which machine are you looking to sell?" autoCapitalize='off' value={mObj.machine}>
        <option disabled value=""></option>
        <option value="CNC">CNC OKuma</option>
        <option value="CNC1">CNC 1</option>
        <option value="CNC2">CNC 2</option>
    </select>
    <label className="bi-form-label">Which machine are you looking to sell?</label>
</div>
    </>
   
  )
}

export default Popup1312