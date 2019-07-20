import React from 'react';
import { Link } from 'react-router-dom';
import { StyledDiv, StyledP, StyledHeader } from '../styled/ListItem';

const Country = props =>{
    console.log(props)
    return(
        <StyledDiv>
            <Link to={`/countries/${props.id}`}>
                <StyledHeader>{props.name}</StyledHeader>
                <StyledP>{props.communities} communities screening</StyledP>
            </Link>
        </StyledDiv>
    )
}

export default Country;