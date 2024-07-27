import React, { useEffect, useState } from 'react';
import Header from './Header';
import ListingPage from './ListingPage';
import { useData } from '../../Context/MyContext';

const CommonParent = () => {
    const { state: { products }, dispatch } = useData();
    const [filters, setFilters] = useState({
        selectedCategory: null,
        selectedSubCategory: null,
        selectedBrand: null,
        selectedPriceRanges: [],
        selectedColors: [],
        selectedDiscounts: [],
    });

    const handleNavigationChange = (category) => {
        setFilters({
            selectedCategory: category,
            selectedSubCategory: null,
            selectedBrand: null,
            selectedPriceRanges: [],
            selectedColors: [],
            selectedDiscounts: [],
        });
    };

    const handleFilterChange = (newFilters) => {
        setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
    };

    return (
        <div>
            <Header onNavigationChange={handleNavigationChange} />
            <ListingPage filters={filters} onFilterChange={handleFilterChange} />
        </div>
    );
};

export default CommonParent;
