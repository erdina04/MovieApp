import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const range = 3;
    const start = Math.max(1, currentPage - range);
    // Kujdes: këtu duhet + range për fundin e listës
    const end = Math.min(totalPages, currentPage + range);
    
    const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

    return (
        <div className="flex justify-center mt-4 flex-wrap gap-1">
            {/* Butoni për faqen e parë */}
            <button 
                className="btn" 
                disabled={currentPage === totalPages} 
                onClick={() => onPageChange(totalPages)}
            >
                ←
            </button>

            {start > 1 && <button className="btn btn-disabled" disabled>...</button>}

            {/* Listimi i faqeve */}
            {pages.map((page) => (
                <button
                    key={page}
                    className={`btn ${page === currentPage ? "btn-primary" : ""}`} 
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}

            {end < totalPages && <button className="btn btn-disabled" disabled>...</button>}

            {/* Butoni për faqen e fundit */}
            <button 
                className="btn" 
                disabled={currentPage === totalPages} 
                onClick={() => onPageChange(totalPages)}
            >
                →
            </button>
        </div>
    );
};

export default Pagination;