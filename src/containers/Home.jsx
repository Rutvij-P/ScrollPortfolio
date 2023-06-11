import React, { useRef, useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { pageData } from "../data";
import ProjectItem from "../components/ProjectItem";
import CursorManager from "../components/CustomCursor/CursorManager";
import CustomCursor from "../components/CustomCursor";

export default function Home() {
  const menuItems = useRef(null);
  const [renderItems, setRenderItems] = useState(pageData);

  const cloneItems = () => {
    const itemHeight = menuItems.current.childNodes[0].offsetHeight;
    const fitMax = Math.ceil(menuItems.current.scrollHeight / itemHeight);
  
    const clonedItems = [...renderItems]
      .filter((_, index) => index < fitMax)
      .map((target) => target);
  
    setRenderItems([...clonedItems, ...renderItems, ...clonedItems]);
  
    return clonedItems.length * itemHeight;
  };
  

  const getScrollPos = () => {
    return (
      (menuItems.current.pageYOffset || menuItems.current.scrollTop) -
      (menuItems.current.clientTop || 0)
    );
  };

  const setScrollPos = (pos) => {
    menuItems.current.scrollTop = pos;
  };

  const initScroll = () => {
    const scrollPos = getScrollPos();
    if (scrollPos <= 0) {
      setScrollPos(1);
    }
  };

  useEffect(() => {
    let clonesHeight = 0;

    const scrollUpdate = () => {
        const scrollPos = getScrollPos();
        if (scrollPos <= 0) {
          setScrollPos(menuItems.current.scrollHeight - clonesHeight);
        } else if (scrollPos >= menuItems.current.scrollHeight - window.innerHeight) {
          const itemHeight = menuItems.current.childNodes[0].offsetHeight;
          const clonedItemsHeight = cloneItems();
          setScrollPos(scrollPos - clonedItemsHeight);
        }
      };      

    menuItems.current.style.scrollBehavior = "unset";

    const handleResize = () => {
      clonesHeight = cloneItems();
      initScroll();
    };

    window.addEventListener("resize", handleResize);

    clonesHeight = cloneItems();
    initScroll();

    menuItems.current.addEventListener("scroll", scrollUpdate);

    return () => {
      window.removeEventListener("resize", handleResize);
      menuItems.current.removeEventListener("scroll", scrollUpdate);
    };
  }, []);

  return (
    <CursorManager>
      <CustomCursor />
      <Header />
      <div className="main-container" id="main-container">
        <ul ref={menuItems}>
          {renderItems.map((project, index) => (
            <ProjectItem key={index} project={project} itemIndex={index} />
          ))}
        </ul>
      </div>
      <Footer />
    </CursorManager>
  );
}
