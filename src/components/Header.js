import React from 'react';

function Header() {
  return (
    <header className="app__header">
      <img className="header__image" src="/logo512.png" alt="react-logo" />
      <h1 className="header__text">The React Quiz</h1>
    </header>
  );
}

export default Header;
