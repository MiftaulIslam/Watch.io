import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./header.scss";

import ContentWrapper from "../contentwrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {

    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const controlScroll = () => {
        const scrollY = window.scrollY;

        if (scrollY > 200) {
            if (scrollY > lastScrollY && !mobileMenu) {
                setShow("hide");
            } else {
                setShow("show");
            }
            setLastScrollY(scrollY);
        }
    };
useEffect(() => {
  window.scrollTo(0,0)
}, [location]);
    useEffect(() => {
        window.addEventListener("scroll", controlScroll);
        return () => {
            window.removeEventListener("scroll", controlScroll);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastScrollY, mobileMenu]);

    const searchqueryHandler = () => {
        if (query.length > 0) {
            navigate(`/search/${query}`);
        }
    };

    const toggleMobileMenu = () => {
        setMobileMenu(!mobileMenu);
        setShow(mobileMenu ? "top" : "mobile");
    };
const navigationPage = (type) =>{
if (type === "movie"){
  navigate(`/explore/movie`)
  setMobileMenu(false)
}else{
  navigate('/explore/tv')
  setMobileMenu(false)
}
} 

    return (
        <>
            <header className={`header ${show}`}>
                <ContentWrapper>
                    <div className="logo"><h2 onClick={()=>navigate(`/`)} style={{color:"#ddd"}}>Watch.io</h2></div>
                    <ul className="menu_items">
                        <li className="menu_item" onClick={()=>navigationPage("movie")}>Movies</li>
                        <li className="menu_item" onClick={()=>navigationPage("tv")}>TV Shows</li>
                        <li className="menu_search" ><input type="text"    onChange={(e) => setQuery(e.target.value)} placeholder="Search Something" /> <button onClick={searchqueryHandler}><AiOutlineSearch/></button></li>
                    </ul>
                    <div className="mobile_responsive">
                        <div className="mobile_icon">
                            {mobileMenu ? (
                                <VscChromeClose onClick={toggleMobileMenu} />
                            ) : (
                                <SlMenu onClick={toggleMobileMenu} />
                            )}
                        </div>
                    </div>
                </ContentWrapper>
                <div className="mobile_view">
                    {mobileMenu && (
                        <Openmobilemenu query={query} setQuery={setQuery} searchqueryHandler={searchqueryHandler} navigatepage = {navigationPage}/>
                    )}
                </div>
            </header>
        </>
    );
};

// eslint-disable-next-line react/prop-types
const Openmobilemenu = ({ query, setQuery, searchqueryHandler, navigatepage }) => {
    return (
        <ul className="menu_items">
            <li className="menu_item" onClick={()=>navigatepage("movie")}>Movies</li>
            <li className="menu_item"  onClick={()=>navigatepage("tv")}>TV Shows</li>
            <li className="search_input">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for movies or tv shows..."
                />
            </li>
            <li className="search_input_button">
                <button onClick={searchqueryHandler}>Search</button>
            </li>
        </ul>
    );
};

export default Header;
