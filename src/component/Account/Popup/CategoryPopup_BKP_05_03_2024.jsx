import React, { useState } from 'react';

const CategoryPopup = ({ filterConfigurations, filters, onHide, toggleMultiFilterOptions, clearFilters }) => {
  console.log('filterConfigurations-------->', filterConfigurations);
  const [selectedCategory, setSelectedCategory] = useState(filterConfigurations[0].title); // Initialize with the first category
  const [count, setCount] = useState(5);

  const onShowMore = () => {
    // Calculate the new count by adding 5 to the current count
    const newCount = count + 10;

    // Set the new count
    setCount(newCount);
  };
  const onLessMore = () => {
    setCount(5);
  };
  const handleShowResults = () => {
    onHide();
  };
  const selectedCategoryItems = filterConfigurations.find(category => category.title === selectedCategory)?.items || [];
  // Access filterType like this
  const selectedCategoryConfig = filterConfigurations.find(category => category.title === selectedCategory);
  const filterType = selectedCategoryConfig ? selectedCategoryConfig.filterType : null;
  return (
    <>
      <div className='p-fixed w-100 h-100 bg-white'>
        <div className='p-r bg-white h-100 w-100'>
          <div className="row bg-white h-100 w-100">
            <div className="col col-md-4 col-5 bg-white border h-100">
              {filterConfigurations.map((category, index) => (
                <div className='category-pop-btn' key={index} onClick={() => setSelectedCategory(category.title)}>
                  <p>{category.title}</p>
                </div>
              ))}
            </div>
            <div className="col col-md-8 col-7 h-100 pt-4">
              <div className='filter-wrap d-flex p-0' style={{ boxShadow: "none" }}>
                <div className="filter">
                  <div className="filter-body">
                    <div className="checkbox-wrap">
                      {filterConfigurations
                        .find(category => category.title === selectedCategory)
                        ?.items.slice(0, count)
                        .map((item, index) => (
                          <div className="checkbox-item justify-content-start gap-2" onClick={() => toggleMultiFilterOptions(filterType, item?.value)} key={index} >
                            {item.name && <input type="checkbox" value={item.value} checked={filters[filterType].includes(item.value)} onChange={() => { }} />}
                            <label className="heading-400-16">
                              {item?.name}&nbsp;&nbsp;
                              {item?.facetCount !== 0 ? `(${item?.facetCount})` : null}
                            </label>
                            {/* <label className="heading-400-16">{item.name}</label> */}
                          </div>
                        ))}
                    </div>
                  </div>
                  {selectedCategoryItems.length > 5 && (
                    <p className='heading-600-16 text-end pt-3' onClick={count === 5 ? onShowMore : onLessMore}>
                      {count === 5 ? "More Options" : "Less Options"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='p-f bg-white shadow1 w-100 fixed-category-bottom'>
        <div className='container-fluid h-100'>
          <p className='heading-600-14-12 m-0 curser-pointer' onClick={clearFilters} >Reset</p>
          <button className='button' onClick={handleShowResults}>Show Results</button>

        </div>
      </div>
    </>
  );
};

export default CategoryPopup;
