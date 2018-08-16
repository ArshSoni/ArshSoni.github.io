import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';

const items = [
  {
    name: 'Home',
    icon: 'fa-user',
    image: false,
    link: '/'
  }, {
    name: 'Experience',
    icon: 'fa-briefcase',
    image: false,
    link: '/experience'
  }, {
    name: 'Skills',
    icon: 'fa-trophy',
    image: false,
    link: '/skills'
  }, {
    name: 'Hobbies',
    icon: 'fa-futbol-o',
    image: false,
    link: '/hobbies'
  }
]

const renderIcon = item => {
  let isImage = item.image;
  let iconClass = isImage ? <img src="" /> : `fa ${item.icon}`;

  return (
    <span className={iconClass}></span>
  )
}

const Nav = (props) => {

  return (
    <nav className="nav">
      <ul className="nav--list">
        {
          items.map(item => (
            <li className="nav--item" key={`nav-${item.name.toLowerCase()}`}>
              <IconButton>
                <Link to={item.link}>{ renderIcon(item) }</Link>
              </IconButton>
              <span className="nav--itemTooltip">{item.name}</span>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}

export default Nav;