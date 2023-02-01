import styled from "styled-components";
import img from "../../../assets/images/bar.jpg"
export const LoginStyles = styled.div`
    background-color: #f1f1f1  !important;
    height: 100vh;
    
    header{
        padding: 1rem 0rem 0rem 2rem;
        font-size: 30px;
        font-weight: 600;
        @media (max-width: 576px) {
               color: white;
        }
    }
    @media (max-width: 576px) {
        background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8) ), url(${img});
        background-size: cover;
        
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
            @media (max-width: 576px) {
                width: 100%;
                padding:  1rem;
                margin-top: 5rem;

            }

            // Medium devices (tablets, 768px and up)
            @media (min-width: 768px) {
            }

            // Large devices (desktops, 992px and up)
            @media (min-width: 992px) {
            }

            // X-Large devices (large desktops, 1200px and up)
            @media (min-width: 1200px) {
            }

            // XX-Large devices (larger desktops, 1400px and up)
            @media (min-width: 1400px) {
            }
        }
        .left{
            max-width: 50%;
            overflow: hidden;
            img{
                height: 100vh;
                object-fit: cover;
            }
            @media (max-width: 576px) {
                display: none;
                }

                // Medium devices (tablets, 768px and up)
                @media (min-width: 768px) {
                }

                // Large devices (desktops, 992px and up)
                @media (min-width: 992px) {
                }

                // X-Large devices (large desktops, 1200px and up)
                @media (min-width: 1200px) {
                }

                // XX-Large devices (larger desktops, 1400px and up)
                @media (min-width: 1400px) {
                }
        }
    }

`