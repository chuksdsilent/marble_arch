import styled from "styled-components";

export const LoginStyles = styled.div`
    background-color: #f1f1f1  !important;
    height: 100vh;
    
    header{
        padding: 1rem 0rem 0rem 2rem;
        font-size: 30px;
        font-weight: 600;
    }

    .main-content{
        display: flex;
        .right{
            width: 50%;
            padding:  7rem;
            form{
                input{
                    height: 3rem;
                    border-radius: 10px;
                }
                button{
                    width: 100%;
                    border-radius: 10px;
                    height: 2.5rem;
                    font-size: 18px;
                }
                .ant-input-affix-wrapper{
                    border-radius: 10px;
                }
            }
        }
        .left{
            max-width: 50%;
            overflow: hidden;
            img{
                height: 100vh;
                object-fit: cover;
            }
        }
    }

`