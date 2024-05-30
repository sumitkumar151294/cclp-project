import React, { useEffect, useState } from 'react'
import Percent from "../../Assets/rountp.webp"
import Logo from "../../Assets/logo.png"
import Logo2 from "../../Assets/logo2.png"

const Header = () => {
    const [scroll, setScroll] = useState(false)
    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 200)
        })
    }, [])
    return (
        <>
            {/* -----------Desktop Header Starts From Here - ------------------------------------------------------ */}
            <header className="header mobile-hide">
                <div className={`fixheader ${scroll && "sticky"}`}>
                    <h1>Header</h1>
                    </div>
                    </header>
        </>
    )
}

export default Header