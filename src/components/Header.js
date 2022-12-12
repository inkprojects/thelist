import React from 'react'

const Header = (props) => {
    return(
        <div className='header'>
            <div className='container'>
                <h1 className='header_heading'>{props.title}</h1>
            </div>
        </div>
    ) 
}

Header.defaultProps = {
 title : 'the lista'
}

export default Header