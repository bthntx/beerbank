import React from 'react'

function NavMenu(props) {
    const [clickHome,clickFav]=props.clickHandlers;
    return (
        <div className="nav-buttons bg-orange">
            <a  href="#" onClick={clickHome}>HOME</a>
            <a  href="#" onClick={clickFav}>FAVOURITE</a>
        </div>
    )
}

export default NavMenu
