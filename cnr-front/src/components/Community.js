import React from 'react'

const Community = props =>{
    return(
        <div>
            <h2>{props.name}</h2>
            <p>{props.children} {props.children > 1 ? 'children' : 'child'}</p>
        </div>
    )
}

export default Community;