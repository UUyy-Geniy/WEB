import React, { useState, useEffect } from "react";
import { Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { AiOutlineBars } from 'react-icons/ai';
import { BiLogIn } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Input } from 'antd';

const { Search } = Input;

const Header = ({ setSearchTerm }) => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);

  const onClick = ({ key }) => {
    if (key === '13') {
      navigate('/', { state: { category_id: undefined } });
    } else {
      navigate('/', { state: { category_id: key } });
    }
  };

  const onclick_category = () => {
    const get_cat = async () => {
      try {
        const response = await axios.get('http://localhost:8000/getCategory/');
        setCategory(response.data);
      } catch (error) {
        alert('Error in get category');
      }
    };

    get_cat();
  };

  const items = category.map((item) => {
    return {
      label: item.category_name,
      key: item.category_id,
    };
  });

  return (
    <header>
      <div className="head">
        <div className="place">
          <div className="place_photo"></div>
          <p className="place_text">Санкт-Петербург</p>
        </div>
        <div className="logo"></div>
        <ul className="nav">
          <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
            <li>
              <BiLogIn size={50} />
              <p>Войти</p>
            </li>
          </Link>
          <li>
            <AiOutlineBars size={50} />
            <Dropdown menu={{ items, onClick }} trigger={['click']}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => {
                  e.preventDefault();
                  onclick_category();
                }}
              >
                Категории
              </a>
            </Dropdown>
          </li>
        </ul>
      </div>
      <div className="presentation">
        
      </div>
      <div className="welcome">
        Добро пожаловать на студенческий маркетплейс! Здесь вы можете покупать и продавать учебные материалы, конспекты, учебники, лабораторные работы и другие учебные услуги. У нас - сообщество студентов, готовых поддержать друг друга и облегчить обучение. Давайте учиться вместе!
        <Search
          placeholder="Поиск продукта"
          onSearch={(value) => setSearchTerm(value)}
        />
      </div>
    </header>
  );
};

export default Header;
