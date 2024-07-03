import React, { useState } from 'react';
import { connectRefinementList } from "react-instantsearch-dom";

const CategoryPopup = ({ filterConfigurations, activeFilters, setIndustryCheckBoxValue, CategoryCheckBoxValue, setCategoryCheckBoxValue }) => {
  const [selectedCategory, setSelectedCategory] = useState(filterConfigurations[0].attribute); // Initialize with the first category
  const handleShowResults = () => {
    const dropdownElement = document.querySelector('.p-fixed');
    const dropdownElement1 = document.querySelector('.fixed-category-bottom');
    if (dropdownElement) {
        dropdownElement.classList.add('dropdownHidden');
        dropdownElement1.classList.add('dropdownHidden');
    }
  };
  return (
    <>
      <div className='p-fixed w-100 h-100 bg-white dropdownHidden'>
        <div className='p-r bg-white h-100 w-100'>
          <div className="row bg-white h-100 w-100">
            <div className="col col-md-4 col-5 bg-white border h-100">
              {filterConfigurations.map((category, index) => (
                <div className='category-pop-btn' key={index} onClick={() => setSelectedCategory(category.attribute)}>
                  <p>{category.title}</p>
                </div>
              ))}
            </div>
            <div className="col col-md-8 col-7 h-100 pt-4">
              <div className='filter-wrap d-flex p-0' style={{ boxShadow: "none" }}>
                <div className="filter">
                  <div className="filter-body">
                    <div className="checkbox-wrap">
                        <CustomRefinementList
                          attribute={selectedCategory}
                          limit={100}
                          searchable={true}
                          setIndustryCheckBoxValue={setIndustryCheckBoxValue}
                          CategoryCheckBoxValue={CategoryCheckBoxValue}
                          setCategoryCheckBoxValue={setCategoryCheckBoxValue}
                        />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='p-f bg-white shadow1 w-100 fixed-category-bottom dropdownHidden'>
        <div className='container-fluid h-100'>
          <button className='button' onClick={handleShowResults}>Show Results</button>

        </div>
      </div>
    </>
  );
};

export default CategoryPopup;





//--------------------------CheckBox Filter For Category,Sub-Category--------------(MULTI-SELECT INPUT)--------------------------------

const ConnectedCustomRefinementList = ({ attribute, items, refine, currentRefinement, setIndustryCheckBoxValue, CategoryCheckBoxValue, setCategoryCheckBoxValue }) => {
  //console.log('attribute---->', attribute);
  //console.log(' inside Mobile Response items :: ', items)
  const regex = /.*?>\s*/g;
  const [selectedValues, setSelectedValues] = useState([]);
  console.log('selectedValues=============>::::::::::::',selectedValues);
  const handleCheckboxChange = (event) => {
    //console.log('event.target.id=======>',event.target.id);
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
 



  return (
    <>
      {items.length === 0 ? (
        <p>No records found.</p>
      ) : (
        items.map((item) => (
          <div className="checkbox-item justify-content-start gap-2" key={item.id} >
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

const CustomRefinementList = connectRefinementList(ConnectedCustomRefinementList);