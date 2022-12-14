import React, { useEffect, useState } from 'react'
import {
    Col,

} from 'antd';
import { CardStyles } from '../styles/CardStyles';
import { formatCurrency } from '../../utils/FormatCurrency';
import { Link } from 'react-router-dom';
const Card = ({ data, id }) => {
    return (
        <Col xs={24} sm={24} md={8} lg={10} xl={6} >
            <Link to={{ pathname: (data.url) ? data.url : "", search: `?${(data.footer.toLowerCase() == "today") ? "backUrl=today" : ""}` }} style={{ color: "black" }}>
                <CardStyles id={id}>
                    <header>
                        <h6>{data.title}</h6>
                        <i className={data.icon}></i>
                    </header>
                    <h4><span dangerouslySetInnerHTML={{ __html: data.currency }} /> {data.currency ? formatCurrency(data.value) : data.value} </h4>
                    <footer>
                        {data.footer}
                    </footer>
                </CardStyles>
            </Link>
        </Col>
    )
}

export default Card