import React, { useContext, useState } from 'react'
import { CursorContext } from '../CustomCursor/CursorManager';
import cn from 'classnames';
import { Hash } from "react-feather";
import "./styles.scss"

export default function Header() {
    const {setSize} = useContext(CursorContext);
    const [opened, setOpen] = useState(false);
    const handleMouseEnter = () => {
        setSize("medium");
    };
    const handleMouseLeave = () => {
       setSize("small");
    };
  return (
    <>
        <div className='overlay-nav'>
            <div className='header-container'>
                <h1 onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}><a href='https://www.linkedin.com/in/jivtur/' target="_blank">contact</a></h1>
                <h1 onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}><a href='https://jivturportfolio.vercel.app' target="_blank">madebyJivtur</a></h1>
            </div>
        </div>

        <div className={cn('overlay-burger-icon', {'as-opened': opened})}
            onClick={() => setOpen(!opened)}
        />

        <div className={cn("overlay-burger-menu", {'as-opened': opened})}>
                <div className='burger-menu-header'>
                    <Hash size={16} /> menu
                </div>

                <h1><a href='https://www.linkedin.com/in/jivtur/' target="_blank">contact</a></h1>
                <h1><a href='https://github.com/Rutvij-P' target="_blank">github</a></h1>
        </div>
    </>
  );
}
