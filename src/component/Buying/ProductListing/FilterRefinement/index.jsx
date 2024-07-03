import { connectRefinementList } from "react-instantsearch-dom";
import React, { useState,useEffect } from "react";


//--------------------------CheckBox Filter For Category,Sub-Category--------------(MULTI-SELECT INPUT)--------------------------------

const ConnectedCustomRefinementList = ({ attribute, items, refine, currentRefinement, setIndustryCheckBoxValue, CategoryCheckBoxValue, setCategoryCheckBoxValue }) => {
    console.log('attribute---->', attribute);
    console.log('items :: ', items)
    const regex = /.*?>\s*/g;
    const [selectedValues, setSelectedValues] = useState([]);
    const handleCheckboxChange = (event) => {
        const value = event.currentTarget.value;
        const newSelectedValues = [...selectedValues];

        if (event.target.id === "categories.lvl0") {
            setIndustryCheckBoxValue(newSelectedValues);
        }

        if (event.target.id === "categories.lvl1") {
            if (event.currentTarget.checked) {
                setCategoryCheckBoxValue([value]); // Limit to one selection for "categories.lvl1"
                refine(value); // Perform refine action immediately for "categories.lvl1"
                return;
            }
            else {
                setCategoryCheckBoxValue([]);
                refine([]);
                return
            }

        }

        if (event.currentTarget.checked) {
            newSelectedValues.push(value);
        } else {
            const index = newSelectedValues.indexOf(value);
            newSelectedValues.splice(index, 1);
        }

        setSelectedValues(newSelectedValues);
        refine(newSelectedValues); // Perform refine for other checkboxes
    }
    const handleReset = () => {
        setSelectedValues([]);
        setIndustryCheckBoxValue([]);
        setCategoryCheckBoxValue([]);
        refine([])
    };
    useEffect(() => {
    
        // Get the Reset button element
        const resetBtn = document.getElementById('ResetBtn');

        if(selectedValues.length > 0 || CategoryCheckBoxValue.length > 0){
            resetBtn.style.display = 'block';
        }
        if(selectedValues.length === 0 && CategoryCheckBoxValue.length === 0){
            resetBtn.style.display = 'none';
        }

        // Add a click event listener to the Reset button
        resetBtn.addEventListener('click', handleReset);

        // Clean up: remove the event listener when the component unmounts
        return () => {
            resetBtn.removeEventListener('click', handleReset);
        };
    }, [selectedValues]);
    
    // const headDiv = document.querySelector('.head');
    // const existingResetButton = headDiv?.querySelector('.reset-button');

    // // Check if a Reset button already exists
    // if (!existingResetButton && currentRefinement.length > 0) {
    //     const resetButton = document.createElement('div');
    //     resetButton.classList.add('clear', 'heading-600-14', 'reset-button');
    //     resetButton.textContent = 'Reset';
    //     resetButton.addEventListener('click', handleReset);

    //     headDiv.appendChild(resetButton);
    // } else if (existingResetButton && currentRefinement.length === 0) {
    //     // Remove the existing Reset button if no refinement is applied
    //     existingResetButton.remove();
    // }



    return (
        <>
            {items.length === 0 ? (
                <p>No records found.</p>
            ) : (
                items
                    .filter(item => item.label !== '0' && item.label !== '1900')
                    .map((item) => (
                        <div className="checkbox-item" key={item.id} >
                            <label className="heading-400-16">{item.label.replace(regex, "")} ({item.count})</label>
                            <input id={attribute} type="checkbox" name={item.name} value={item.label}
                                checked={
                                    attribute === "categories.lvl1"
                                        ? CategoryCheckBoxValue.includes(item.label)
                                        : selectedValues.includes(item.label)
                                }
                                onChange={handleCheckboxChange} />
                        </div>

                    ))
            )}
        </>
    );

};

export default connectRefinementList(ConnectedCustomRefinementList);