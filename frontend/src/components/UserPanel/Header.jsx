
import React from 'react'
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'

/*funkcionalnosti lampice i slike profila moramo napraviti*/

function Header({OpenSidebar}) {
  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            <BsSearch  className='icon'/>
            <input class="datatable-input" placeholder="Search..." type="search" title="Search">
            </input>
        </div>
        <div className='header-right'>
            
            <BsPersonCircle className='icon'/>
        </div>
    </header>
  )
}

export default Header
