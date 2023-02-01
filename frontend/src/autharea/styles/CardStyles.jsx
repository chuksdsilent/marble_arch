import styled from "styled-components";

export const CardStyles = styled.div`
    
    border-radius: 10px;
    padding: 1rem;

    
    header{
        display: flex;
        justify-content: space-between;
        
        i{
            background-color: rgba(213,213,213, .5);
            border-radius: 50%;
            padding: .2rem .4rem;
        }
    }
    h4{
        margin-top: .5rem;
    }
    footer{
        font-weight: 600;

    }
`;
