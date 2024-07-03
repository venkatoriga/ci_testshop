import { connectPagination } from "react-instantsearch-dom";
import React from "react";
import { leftArrowIcon, rightArrowIcon } from "../../../../helpers/Icons";

const CustomPagination = ({ currentRefinement, nbPages, refine }) => {
    const renderPageButtons = () => {
        const buttons = [];
        const minPage = Math.max(1, currentRefinement - 3); // Ensure minimum page is 1
        const maxPage = Math.min(nbPages, minPage + 6); // Ensure maximum page is within nbPages

        for (let i = minPage; i <= maxPage; i++) {
            buttons.push(
                <button
                    key={i}
                    className={currentRefinement === i ? "pagination-btn active" : "pagination-btn"}
                    onClick={() => refine(i)}
                >
                    {i}
                </button>
            );
        }
        return buttons;
    };


    return (
        <div className="bi-pagination-wrap">
            <div className="inner">
                <button
                    className="outer-btn"
                    onClick={() => refine(currentRefinement - 1)}
                    disabled={currentRefinement === 1} // Disable if currentRefinement is 1
                >
                    {leftArrowIcon({ width: 24, height: 24 })}
                </button>
                <div className="inner-btns">{renderPageButtons()}</div>
                <button
                    className="outer-btn"
                    onClick={() => refine(currentRefinement + 1)}
                    disabled={currentRefinement === renderPageButtons().length} // Disable if currentRefinement is at the maximum level
                >
                    {rightArrowIcon({ width: 24, height: 24 })}
                </button>
            </div>
        </div>
    );
};

export default connectPagination(CustomPagination);
