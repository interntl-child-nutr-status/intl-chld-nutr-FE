import styled from 'styled-components';

export const StyledHeader = styled.h1`
    font-size: 5.6rem;
    text-align: center;
    color:#7f9ac6;
`;

export const StyledHeaderTwo = styled.h2`
    font-size: 4.2rem;
    text-align: center;
    margin-bottom: 20px;
    color:#7f9ac6;
`;

export const StyledForm = styled.form`
    background: #7f9ac6;
    display: flex;
    flex-direction: column;
    width: 60%;
    margin: auto;
    font-size: 4.8rem;
    border-radius: 10px;
`;

export const StyledNewChild = styled(StyledForm)`
    width: 80%;
`;

export const StyledLabel = styled.label`
    margin: 10px auto;
    display: flex;
    flex-direction: column;
    text-align: center;
    color: white;
`;

export const SmallerLabel = styled(StyledLabel)`
    font-size: 2.4rem;
`;

export const DropdownLabel = styled(SmallerLabel)`
  width: 75%;  
`;

export const StyledInput = styled.input`
    margin-top: 10px;
    border: none;
    border-radius: 5px;
    height: 50px;
    font-size: 3.2rem;
    color:#7f9ac6;
`;

export const SmallerInput = styled(StyledInput)`
    font-size: 2rem;
    height: 35px;
`;

export const StyledSubmit = styled.input`
    margin: 20px auto;
    background: white;
    border: none;
    border-radius: 10px;
    height: 50px;
    font-size: 3.2rem;
    color:#7f9ac6;
    width: 60%;

    &:hover{
        background: #7f9ac6;
        color: white;
        border: 2px solid white;
    }
`;

export const StyledSelect = styled.select`
    max-width: 80%;
    margin: auto;
    border: none;
    font-size: 2rem;
    border-radius: 5px;
    height: 35px;
    font-size: 2rem;
    color: #7f9ac6;
`;

export const DeletingP = styled.p`
    color: #7f9ac6;
    font-size: 2rem;
`;