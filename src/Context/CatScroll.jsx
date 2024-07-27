import React, { createContext, useContext, useRef, useState } from 'react';

const CatScrollContext = createContext();

export const useCatScroll = () => useContext(CatScrollContext);

export const CatScrollProvider = ({ children, externalRef = null }) => {
    const internalRef = useRef(null);
    const ref = externalRef || internalRef; // Use externalRef if provided, else use internalRef
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const startDragging = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - ref.current.offsetLeft);
        setScrollLeft(ref.current.scrollLeft);
        e.preventDefault();
    };

    const stopDragging = (event) => {
        if (!isDragging) return;
        setIsDragging(false);
        event.preventDefault();
    };

    const onDrag = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - ref.current.offsetLeft;
        const walk = (x - startX) * 1;
        ref.current.scrollLeft = scrollLeft - walk;
    };

    const value = { ref, startDragging, stopDragging, onDrag };

    return (
        <CatScrollContext.Provider value={value}>
            {children}
        </CatScrollContext.Provider>
    );
};
