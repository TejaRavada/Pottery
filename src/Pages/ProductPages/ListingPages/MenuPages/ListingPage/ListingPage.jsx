import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ProductPage from '../../../ProductPage';
import Filters from '../Comoponents/Filters';
import ShowList from '../../../Components/ShowList/ShowList';
import Breadcrumbs from '../../../Components/Breadecrubs/Breadcrubs';
import './styles.css';
import { useData } from '../../../../../Context/MyContext';
import SearchProductBar from '../../../SearchProductBar';

const ListingPage = () => {
    const { state: { products, loading, error } } = useData();
    const { catName, subCatName, brandName } = useParams();
    const location = useLocation();
    const [itemsToShow, setItemsToShow] = useState(10);
    const [sortOption, setSortOption] = useState('Featured');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(catName || null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(subCatName || null);
    const [selectedBrand, setSelectedBrand] = useState(brandName || null);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedDiscounts, setSelectedDiscounts] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const searchQuery = query.get('search');
        if (searchQuery) {
            setSearchInput(searchQuery);
            setIsSearching(true);
        } else {
            setIsSearching(false);
        }
    }, [location.search]);

    useEffect(() => {
        let updatedProducts = products.flatMap(category =>
            category.products.flatMap(product =>
                product.items.flatMap(item =>
                    item.sub_products || []
                )
            )
        );

        if (isSearching) {
            updatedProducts = updatedProducts.filter(subProduct =>
                subProduct.productName.toLowerCase().includes(searchInput.toLowerCase())
            );
        } else {
            if (selectedCategory) {
                updatedProducts = updatedProducts.filter(product => product.category === selectedCategory);
            }

            if (selectedSubCategory) {
                updatedProducts = updatedProducts.filter(product => product.subCategory === selectedSubCategory);
            }

            if (selectedBrand) {
                updatedProducts = updatedProducts.filter(product => product.brand === selectedBrand);
            }

            if (selectedPriceRanges.length > 0) {
                updatedProducts = updatedProducts.filter(product => {
                    return selectedPriceRanges.some(range => {
                        const [low, high] = range.split('-').map(Number);
                        return product.price >= low && product.price <= high;
                    });
                });
            }

            if (selectedColors.length > 0) {
                updatedProducts = updatedProducts.filter(product => selectedColors.includes(product.color));
            }

            if (selectedDiscounts.length > 0) {
                updatedProducts = updatedProducts.filter(product => {
                    const discount = product.discount ? parseInt(product.discount.replace('%', ''), 10) : 0;
                    return selectedDiscounts.some(range => {
                        const [low, high] = range.split('-').map(Number);
                        return discount >= low && discount <= high;
                    });
                });
            }
        }

        setFilteredProducts(updatedProducts);
    }, [selectedCategory, selectedSubCategory, selectedBrand, selectedPriceRanges, selectedColors, selectedDiscounts, products, isSearching, searchInput]);

    const handleFilterChange = (filters) => {
        setSelectedCategory(filters.categories[0] || null);
        setSelectedSubCategory(filters.subCategories[0] || null);
        setSelectedBrand(filters.brands[0] || null);
        setSelectedPriceRanges(filters.priceRanges);
        setSelectedColors(filters.colors);
        setSelectedDiscounts(filters.discounts);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading products: {error}</p>;

    return (
        <section className="listingPage">
            <div className="container">
                <Breadcrumbs />
                <hr />
                <br />
                <div className="listingData">
                    <div className="row">
                        <div className="col-md-3 sidebarWrapper me-0 pe-0">
                            <Filters onFilterChange={handleFilterChange} />
                        </div>
                        <div className="col-md-9 rightContent homeProducts ms-0 ps-0">
                            <ShowList
                                totalItems={filteredProducts.length}
                                itemsToShow={itemsToShow}
                                setItemsToShow={setItemsToShow}
                                sortOption={sortOption}
                                setSortOption={setSortOption}
                            />
                            <hr />
                            <div className="productRow ps-4 pr-3">
                                {isSearching ? (
                                    <SearchProductBar
                                        products={filteredProducts}
                                        selectedCategory={selectedCategory}
                                        selectedSubCategory={selectedSubCategory}
                                        selectedBrand={selectedBrand}
                                        selectedPriceRanges={selectedPriceRanges}
                                        selectedColors={selectedColors}
                                        selectedDiscounts={selectedDiscounts}
                                        initialItems={itemsToShow}
                                        sortOption={sortOption}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        isListingPage={true}
                                    />
                                ) : (
                                    <ProductPage
                                        selectedCategory={selectedCategory}
                                        selectedSubCategory={selectedSubCategory}
                                        selectedBrand={selectedBrand}
                                        selectedPriceRanges={selectedPriceRanges}
                                        selectedColors={selectedColors}
                                        selectedDiscounts={selectedDiscounts}
                                        initialItems={itemsToShow}
                                        sortOption={sortOption}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        isListingPage={true}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ListingPage;
