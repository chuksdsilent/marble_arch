import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../noautharea/redux/UserSlice"
import { UserServices } from '../../services/UserService';

const Items = ({ item, index }) => {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user)
    const logoutNow = async () => {
        try {
            const response = await UserServices.logout();
            dispatch(logout())
            // if (!currentUser) navigate("/manager/login");
        } catch (error) {
            console.log(error.response.data)
        }
    }
    if (item.children) {

        return (
            <div key={index}>
                <li>
                    <div className="nav-items nav-items-open" onClick={() => setOpen(!open)}>
                        <span>
                            <i className={item.icon} />
                            {item.title}
                        </span>
                        <i className="bi-chevron-down" />
                    </div>
                </li>

                <div className={open ? 'sub-menu sub-menu-open' : "sub-menu"} >
                    {item.children && item.children.map((sub_menu, sub_index) => {
                        return (
                            <div key={sub_index}>
                                <Link to={sub_menu.path}>
                                    <span>
                                        <i className={sub_menu.icon} />
                                        {sub_menu.title}
                                    </span>
                                </Link>

                            </div>
                        )
                    })}

                </div>

            </div>
        )
    } else {
        return (
            <div key={index} >
                <li>
                    <div className='nav-items'>
                        {item.path == "/logout" ? (
                            <div onClick={logoutNow} >
                                <span>
                                    <i className={item.icon} />
                                    {item.title}
                                </span>
                            </div>
                        ) : (

                            <Link to={item.path} >
                                <span>
                                    <i className={item.icon} />
                                    {item.title}
                                </span>
                            </Link>
                        )}

                    </div>
                </li>

            </div>
        )
    }
}

export default Items