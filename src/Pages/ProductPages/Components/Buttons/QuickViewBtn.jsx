import React from 'react'
import { useData } from '../../../../Context/MyContext';

const QuickViewBtn = () => {

  const { show } = useData();

  return (
   <>
     <div>
      <button className="addBtn" onClick={show}>Quick View</button>
    </div>
   </>
  )
}

export default QuickViewBtn