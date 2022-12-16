import React, { useState } from 'react'
import Items from './Items';

const SidebarItems = ({ items }) => {

    return (
        <div>
            {items && items.map((item, index) => (<Items item={item} index={index} />))}
        </div>
    )
}

export default SidebarItems