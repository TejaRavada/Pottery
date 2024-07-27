import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles.css';

const generateBreadcrumbs = (pathname) => {
    const pathnames = pathname.split('/').filter(x => x);
    return [{ path: "/", label: "Home" }, ...pathnames.map((value, index) => {
        const path = `/${pathnames.slice(0, index + 1).join('/')}`;
        const label = decodeURIComponent(value.charAt(0).toUpperCase() + value.slice(1));
        return { path, label };
    })];
};

const Breadcrumbs = () => {
    const location = useLocation();
    const [breadcrumbs, setBreadcrumbs] = useState([]);

    useEffect(() => {
        setBreadcrumbs(generateBreadcrumbs(location.pathname));
    }, [location.pathname]);

    return (
        <div className="breadcrumb flex-column">
            <ul className="list list-inline mb-0">
                {breadcrumbs.map((breadcrumb, index) => (
                    <li key={index} className="list-inline-item">
                        <Link to={breadcrumb.path}>{breadcrumb.label}</Link>
                        {index < breadcrumbs.length - 1 && ' / '}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Breadcrumbs;
