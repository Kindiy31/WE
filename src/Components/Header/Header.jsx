import React, { useState, useEffect, useRef } from "react";
import { MenuButton } from "../MenuButton/MenuButton";
import { useClickOutside } from "../../Hooks/useClickOutside";
import axios from 'axios';
import "./Header.css";

export const Header = (props) => {
  const tg = window.Telegram.WebApp;
  const [isOpen, setOpen] = useState(false);
  const [categories, SetCategories] = useState([]);
  const menuRef = useRef(null);
  useClickOutside(menuRef, () => {
    if (isOpen) setTimeout(() => setOpen(false), 50);
  });

  useEffect(() => {
    let startTouchX = 0;
    let endTouchX = 0;
    let startTouchY = 0;
    let endTouchY = 0;

    document.addEventListener("touchstart", (event) => {
      startTouchX = event.changedTouches[0].pageX;
      startTouchY = event.changedTouches[0].pageY;
    });

    document.addEventListener("touchend", (event) => {
      endTouchX = event.changedTouches[0].pageX;
      endTouchY = event.changedTouches[0].pageY;
      if (
        startTouchX < 100 &&
        Math.abs(endTouchY - startTouchY) < 40 &&
        endTouchX > startTouchX
      )
        setOpen(true);
      if (
        startTouchX < 240 &&
        Math.abs(endTouchY - startTouchY) < 40 &&
        endTouchX < startTouchX
      )
        setOpen(false);
    });
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://192.168.0.6:5000/api/categories');
        console.log(response);
        SetCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories: ', error);
      }
    };
  
    fetchCategories();
  }, []);

  return (
    <header className="header">
      <span className="header__logo">We</span>
      <nav className={`header__nav ${isOpen ? "active" : ""}`} ref={menuRef}>
        <ul className="header__nav-list">
        <li className="header__nav-item">{tg?.initDataUnsafe?.user?.first_name}</li>
        <li className="header__nav-item"></li>
        {categories && categories.map((categorie) => (
          <li 
            className="header__nav-item"
            key={categorie.id}
            onClick={() => props.SetCategorie(categorie.id)}
          >{categorie.name}</li>
        ))}
        </ul>
      </nav>

      <MenuButton isActive={isOpen} onClick={() => setOpen(!isOpen)} />
    </header>
  );
};