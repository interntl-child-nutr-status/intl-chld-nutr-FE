import styled from 'styled-components';

export const DataDiv = styled.div`

    font-size: 2.4rem;

`;


export const DataHeaderDiv = styled.div`
    font-size: 2.4rem;
    display: flex;
    width: 100%;
`;

export const ColumnHeader = styled(DataHeaderDiv)`
    background: #7f9ac6;
    color: white;
    justify-content: space-around;
`;

export const DataSpan = styled.span`
    color: #7f9ac6;

`;

export const DateSpan = styled(DataSpan)`
    margin-left: 1%;
`;

export const HeightSpan = styled(DataSpan)`
    margin-left: 11%;
`;

export const WeightSpan = styled(DataSpan)`
    margin-left: 19%;
`;

export const IdSpan = styled(DataSpan)`
    margin-left: 25%;
`;