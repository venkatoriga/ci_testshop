import React, { useState, useEffect } from 'react';
import { connectRefinementList, connectRange } from "react-instantsearch-dom";
const CategoryPopup = ({ filterConfigurations, activeFilters, setIndustryCheckBoxValue, CategoryCheckBoxValue, setCategoryCheckBoxValue, MainFilters, setMainFilters }) => {
  console.log('filterConfigurations------>', filterConfigurations);
  const [selectedCategory, setSelectedCategory] = useState(filterConfigurations[0].attribute); // Initialize with the first category
  const [refinementListValues, setRefinementListValues] = useState({});
  const [ItemLength, setItemLength] = useState();
  const [count, setCount] = useState(5);
  useEffect(() => {
    setCount(5)
  }, [ItemLength]);

  const onShowMore = () => {
    // Calculate the new count by adding 5 to the current count
    const newCount = ItemLength;

    // Set the new count
    setCount(newCount);
  };
  const onLessMore = () => {
    setCount(5);
  };

  const [selectedValues, setSelectedValues] = useState([]);
  // Define static options for Price filter
  const priceOptions = [
    { name: "Below ₹50,000", value: "0 TO 50000" },
    { name: "₹50,001 - ₹100,000", value: "50001 TO 100000" },
    { name: "₹100,001 - ₹250,000", value: "100001 TO 250000" },
    { name: "₹250,001 - ₹500,000", value: "250001 TO 500000" },
    { name: "₹500,001 - ₹750,000", value: "500001 TO 750000" },
    { name: "₹750,001 - ₹1,000,000", value: "750001 TO 1000000" },
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

  const handleShowResults = () => {
    const dropdownElement = document.querySelector('.p-fixed');
    const dropdownElement1 = document.querySelector('.fixed-category-bottom');
    if (dropdownElement) {
      dropdownElement.classList.add('dropdownHidden');
      dropdownElement1.classList.add('dropdownHidden');
    }
  };

  const handleRefinementChange = (attribute, values) => {
    setRefinementListValues(prevValues => ({
      ...prevValues,
      [attribute]: values
    }));
  };
  const showOptionsText = count === 5 ? "More Options" : (ItemLength == count ? "Less Options" : "More Options");
  return (
    <>
      <div className='p-fixed w-100 h-100 bg-white dropdownHidden' style={{ 'margin-top': '-29%' }}>
        <div className='p-r bg-white h-100 w-100'>
          <div className="row bg-white h-100 w-100">
            <div className="col col-md-4 col-5 bg-white border h-100" style={{ overflow: 'auto' }}>
              {filterConfigurations.map((category, index) => (
                <div className='category-pop-btn' key={index} onClick={() => setSelectedCategory(category.attribute)}>
                  <p>{category.title}</p>
                </div>
              ))}
            </div>
            <div className="col col-md-8 col-7 h-75 pt-4" style={{ overflow: 'auto' }}>
              <div className='filter-wrap d-flex p-0' style={{ boxShadow: "none" }}>
                <div className="filter">
                  <div className="filter-body">
                    <div className="checkbox-wrap">
                      {selectedCategory === "grossPrice" ? (
                        <div className="checkbox-wrap">
                          {priceOptions.map((option, idx) => (
                            <div className="checkbox-item justify-content-start gap-2" key={idx}>
                              <input
                                type="checkbox"
                                value={option.value}
                                checked={selectedValues.includes(option.value)}
                                onChange={(e) => handlePrice(e)}
                              />
                              <label className="heading-400-16">{option.name}</label>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <>
                          {filterConfigurations.map((category, index) => (
                            <CustomRefinementList
                              key={index}
                              attribute={category.attribute}
                              limit={100}
                              searchable={true}
                              setIndustryCheckBoxValue={setIndustryCheckBoxValue}
                              CategoryCheckBoxValue={CategoryCheckBoxValue}
                              setCategoryCheckBoxValue={setCategoryCheckBoxValue}
                              onRefinementChange={handleRefinementChange}
                              selectedCategory={selectedCategory}
                              count={count}
                              setItemLength={setItemLength}
                            />
                          ))}
                        </>
                      )}

                    </div>
                  </div>
                  {selectedCategory !== "grossPrice" && ItemLength > 5 &&
                    (
                      <p className='heading-600-16 text-end pt-3' onClick={showOptionsText === "More Options" ? onShowMore : onLessMore}>
                        {showOptionsText}
                      </p>
                    )}

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

const ConnectedCustomRefinementList = ({ attribute, items, refine, currentRefinement, setIndustryCheckBoxValue, CategoryCheckBoxValue, setCategoryCheckBoxValue, selectedCategory, count, setItemLength }) => {
  console.log('attribute---->', attribute);
  // console.log(' inside Mobile Response items :: ', items)
  if (attribute === selectedCategory) {
    setItemLength(items.length)
  }
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




  return (
    <>
      {items.length > 0 && (
        <>
          {items
            .slice(0, count)
            .filter(item => item.label !== '0' && item.label !== '1900')
            .map((item) => (
              attribute === selectedCategory && (
                <div className="checkbox-item justify-content-start gap-2" key={item.id}>
                  <input
                    id={attribute}
                    type="checkbox"
                    name={item.name}
                    value={item.label}
                    checked={
                      attribute === "categories.lvl1"
                        ? CategoryCheckBoxValue.includes(item.label)
                        : selectedValues.includes(item.label)
                    }
                    onChange={handleCheckboxChange}
                  />
                  <label className="heading-400-16">{item.label.replace(regex, "")} ({item.count})</label>
                </div>
              )
            ))}
        </>
      )}
    </>

  );



};

const CustomRefinementList = connectRefinementList(ConnectedCustomRefinementList);