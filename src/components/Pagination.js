import React from 'react';

const Pagination = ({ elementsPerPage, totalElements, paginate }) => {
    const pageNumbers = [];

    let i = 1;
    while (i <= Math.ceil(totalElements / elementsPerPage)) {
        pageNumbers.push(i);
        i++;
    }

    return (
        <div className="button-flex-container">
            {pageNumbers.map(number => (
                <div key={number}>
                    <button className="button" onClick={() => paginate(number)}>
                        {number}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Pagination;
