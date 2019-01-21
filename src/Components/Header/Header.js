import React from 'react'

function Header(props) {
    return (
        <header className="App-header">
            <h2 className="font-weight-bolder">The Beer Bank</h2>
            <p className="small">Find your favorite beer here</p>
            <input type="text" className="w-75 small" placeholder="Search for beer name"
                   onChange={(e) => props.clickHandler(e.target.value)}/>
        </header>
    )
}

export default Header
