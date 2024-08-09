
import React from 'react'
import ListItem from './ListItem'

function ServiceList({list}) {
  return (
    <div className='list-wrap '>
    {
        list.map(item=><ListItem key={item.id} item={item}/>)
    }
    </div>
  )
}

export default ServiceList