import React from 'react';
import { Link } from 'react-router-dom';

const Country = props =>{
    return(
        <Link to={`/countries/${props.id}`}>
            <h2>{props.name}</h2>
            <p>{props.communities} communities screening</p>
        </Link>
    )
}

export default Country;