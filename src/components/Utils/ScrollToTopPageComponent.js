import React, { useEffect, useState } from "react";

function ScrollToTopPage() {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scorlled upto given distance
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set the top cordinate to 0
    // make scrolling smooth
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <div className="scroll-to-top">
            {isVisible &&
                <div onClick={scrollToTop}>
                    <img 
                        style={{ width: "70px", height: "70px" }}
                        src='https://www.pngkey.com/png/full/355-3553692_jump-to-the-top-scroll-to-top-icon.png' 
                        alt='Go to top' />
                </div>}
        </div>
    );
}

export default ScrollToTopPage;