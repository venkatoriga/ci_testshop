import React, { useState }  from 'react';
import { filterArrowIcon } from "../../../../helpers/Icons";
import ConnectedCustomRefinementList from "../FilterRefinement";
const FilterSection = ({ title, attribute, filterType, activeFilters, setIndustryCheckBoxValue, CategoryCheckBoxValue, setCategoryCheckBoxValue, handleFilters, MainFilters, setMainFilters }) => {
  // Check if filterType is Price
  const isPriceFilter = filterType === "Price";
  const [selectedValues, setSelectedValues] = useState([]);
  // Define static options for Price filter
  const priceOptions = [
    { name: "Below ₹50,000", value: "0 TO 50000" },
    { name: "₹50,001 to ₹100,000", value: "50001 TO 100000" },
    { name: "₹100,001 to ₹250,000", value: "100001 TO 250000" },
    { name: "₹250,001 to ₹500,000", value: "250001 TO 500000" },
    { name: "₹500,001 to ₹750,000", value: "500001 TO 750000" },
    { name: "₹750,001 to ₹1,000,000", value: "750001 TO 1000000" },
    { name: "Above ₹1,000,001", value: "1000001 TO 10000000" }
  ];
  const handlePrice = (event) => {
    const value = event.currentTarget.value;
    const newSelectedValues = [...selectedValues];
    if (event.currentTarget.checked) {
      newSelectedValues.push(value);
  } else {
      const index = newSelectedValues.indexOf(value);
      newSelectedValues.splice(index, 1);
  }

  setSelectedValues(newSelectedValues);
    //setMainFilters('((grossPrice:1 TO 50000) OR (grossPrice:50001 TO 100000))')
    let mainFiltersString = "";
    if (newSelectedValues.length > 0) {
      mainFiltersString = newSelectedValues.map((val) => `grossPrice:${val}`).join(" OR ");
      mainFiltersString = `(${mainFiltersString})`;
    }
  
    setMainFilters(mainFiltersString);

  };

  // console.log('selectedValues=============>',selectedValues.length);

  return (
    <div className="filter">
      <div className="head">
        <span className="heading-600-16">{title}</span>
        {filterArrowIcon({
          width: 22,
          height: 10,
          className: activeFilters[filterType] ? "open" : "",
          onClick: () => handleFilters(filterType, !activeFilters[filterType]),
        })}
      </div>
      {/* {activeFilters[filterType] ? (
        <div className="filter-body">
          <div className="checkbox-wrap">
            <ConnectedCustomRefinementList
              attribute={attribute}
              limit={100}
              searchable={true}
              setIndustryCheckBoxValue={setIndustryCheckBoxValue}
              CategoryCheckBoxValue={CategoryCheckBoxValue}
              setCategoryCheckBoxValue={setCategoryCheckBoxValue}
            />
          </div>
        </div>
      ) : null} */}
      {activeFilters[filterType] ? (
        <div className="filter-body">
          {isPriceFilter ? (
            <div className="checkbox-wrap">
              {priceOptions.map((option, index) => (
                <div className="checkbox-item" key={index}>
                  <label className="heading-400-16">{option.name}</label>
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={
                      selectedValues.includes(option.value)
                    }
                    onChange={(e) => handlePrice(e)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="checkbox-wrap">
              <ConnectedCustomRefinementList
                attribute={attribute}
                limit={100}
                searchable={true}
                setIndustryCheckBoxValue={setIndustryCheckBoxValue}
                CategoryCheckBoxValue={CategoryCheckBoxValue}
                setCategoryCheckBoxValue={setCategoryCheckBoxValue}
              />
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};



export default FilterSection