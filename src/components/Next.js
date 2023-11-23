import React from 'react';

function Next({ onClick, children }) {
  return (
    <button className="next" onClick={onClick}>
      {children}
    </button>
  );
}

export default Next;
