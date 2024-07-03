import React from 'react';
import { filterArrowIcon } from "../../../../helpers/Icons";
import MultiRangeSliderComponent from "../../../SubComponent/MultiRangeSlider/MultiRangeSliderComponent_BKP_04_03_2024";

const FilterSection = ({ title, filterType, activeFilters, filters, toggleMultiFilterOptions, items, handleFilters }) => {
  const getMinName = (items) => {
    if (!items || items.length === 0) return '';
    return items.reduce((min, item) => (item.name < min ? item.name : min), items[0].name);
  };

  const getMaxName = (items) => {
    if (!items || items.length === 0) return '';
    return items.reduce((max, item) => (item.name > max ? item.name : max), items[0].name);
  };
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
      {activeFilters[filterType] ? (
        (title === 'Year' || title === 'Price') && items && items.length > 0 ? (
          <div className="filter-body">
            <div className="">
              <MultiRangeSliderComponent
                minName={getMinName(items)}
                maxName={getMaxName(items)}
              />
            </div>
          </div>
        ) : (
          <div className="filter-body">
            <div className="checkbox-wrap">
              {items && items.length > 0 ? (
                items.map((item) => (
                  <div className="checkbox-item" key={item.id} onClick={() => toggleMultiFilterOptions(filterType, item?.value)}>
                    <label className="heading-400-16">
                      {item.name}&nbsp;&nbsp;
                      {item.facetCount !== 0 ? `(${item.facetCount})` : null}
                    </label>
                    {item.name && <input type="checkbox" name={filterType} value={item.value} checked={filters[filterType]?.includes(item?.value)} onChange={() => { }} />}
                  </div>
                ))
              ) : (
                <div>No records found</div>
              )}
            </div>
          </div>
        )
      ) : null}
    </div>
  );
};


export default FilterSection