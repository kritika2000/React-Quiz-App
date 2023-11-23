import React from 'react';

function Next({ onClick, disable }) {
  return (
    <button className="next" onClick={onClick} disabled={disable}>
      Next
    </button>
  );
}

export default Next;
