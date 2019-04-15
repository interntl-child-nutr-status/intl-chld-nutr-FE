import React from 'react';

const Country = props =>{
    return(
        <div>
            <h2>{props.name}</h2>
            <p>{props.communities} communities screening</p>
        </div>
    )
}

export default Country;