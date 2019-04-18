import styled from 'styled-components';

export const StyledDivList = styled.div`
    width: 60%;
    margin: 20px auto;
    text-align: center;
    border-radius: 2px;
`;

export const StyledButton = styled.button`
    background: white;
    color: #7f9ac6;
    border: 2px solid #7f9ac6;
    border-radius: 5px;
    width: 50%;
    height: 40px;
    margin-bottom: 20px;
`;

export const DeleteButton = styled(StyledButton)`
    color: #c96868;
    border: 2px solid #c96868;
    width: 30%;

    &:hover{
        color: white;
        background: #c96868
    }
`;

export const NoDataP = styled.p`
    font-size: 2.4rem
    color: #7f9ac6;
`;

export const StyledForMultipleButtons = styled(StyledButton)`
    width: 30%;
    margin: 20px 5px;
`;