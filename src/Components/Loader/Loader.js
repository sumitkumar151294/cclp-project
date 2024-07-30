import React from 'react'
const Loader = ({classType}) => {
    return (
        <div className={classType} id="preloader">
            <div className="gooey">
                <span className="dot"></span>
                <div className="dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    )
}

export default Loader