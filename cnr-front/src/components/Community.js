import React from 'react'
import { StyledDiv, StyledP, StyledHeader } from '../styled/ListItem';

const Community = props =>{
    return(
        <StyledDiv>
            <StyledHeader>{props.name}</StyledHeader>
            <StyledP>{props.city}</StyledP>
        </StyledDiv>
    )
}

export default Community;