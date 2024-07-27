import React, { useState } from 'react';
import './styles.css';
import { BsGrid3X3Gap } from "react-icons/bs";
import { IoGridOutline, IoFilter } from "react-icons/io5";

const ShowList = ({ totalItems, itemsToShow, setItemsToShow, sortOption, setSortOption }) => {
    const [isOpenDropDown, setisOpenDropDown] = useState(false);
    const [isOpenDropDown2, setisOpenDropDown2] = useState(false);

    return (
        <section className="showlist">
            <div className="topStrip d-flex align-items-center">
                <span className='ms-3'><BsGrid3X3Gap /></span>
                <p className="mb-0 ms-3 me-3">We Found <span className="text-success">{totalItems}</span> items for you!</p>
                <div className="ms-auto d-flex align-items-center">
                    <div className="tab_ position-relative">
                        <button className="btn_" onClick={() => setisOpenDropDown(!isOpenDropDown)}> <IoGridOutline /> Show: {itemsToShow}</button>
                        {isOpenDropDown && (
                            <ul className="dropdownMenu">
                                {[5, 10, 15, 20].map((num, index) => (
                                    <li key={index}>
                                        <button className="align-items-center" onClick={() => { 
                                            setItemsToShow(num); 
                                            setisOpenDropDown(false);
                                        }}>{num}</button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="tab_ ms-3 position-relative">
                        <button className="btn_" onClick={() => setisOpenDropDown2(!isOpenDropDown2)}> <IoFilter /> Sort by : {sortOption}</button>
                        {isOpenDropDown2 && (
                            <ul className="dropdownMenu">
                                {['Featured', 'Price: Low to High', 'Price: High to Low', 'Release Date', 'Avg Rating'].map((option, index) => (
                                    <li key={index}>
                                        <button className="align-items-center" onClick={() => { 
                                            setSortOption(option); 
                                            setisOpenDropDown2(false);
                                        }}>{option}</button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ShowList;
