import React from 'react';
import { shortIcon, heartIcon, leftArrowIcon, rightArrowIcon, filterIcon, filterArrowIcon, botIcon } from "../../../../helpers/Icons";

const FilterSection = ({ title, filterType, activeFilters, filters, toggleMultiFilterOptions, items, handleFilters }) => {

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
        <div className="filter-body">
          <div className="checkbox-wrap">
            {items.map((item) => (
              <div className="checkbox-item" key={item.id} onClick={() => toggleMultiFilterOptions(filterType, item.value)}>
                {/* <label className="heading-400-16">{item.name}</label> */}
                {/* <label className="heading-400-16">{item.name}&nbsp;&nbsp;({item?.facetCount})</label> */}
                <label className="heading-400-16">
                  {item?.name}&nbsp;&nbsp;
                  {item?.facetCount !== 0 ? `(${item?.facetCount})` : null}
                </label>
                {item.name && <input type="checkbox" name={filterType} value={item.value} checked={filters[filterType].includes(item.value)} onChange={() => { }} />}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};


export default FilterSection