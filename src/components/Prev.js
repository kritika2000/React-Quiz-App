import React from 'react';

function Prev({ onClick, disable }) {
  return (
    <button className="prev" onClick={onClick} disabled={disable}>
      Prev
    </button>
  );
}

export default Prev;
