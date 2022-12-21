import React, { useEffect, useState } from 'react'
import Card from '../../components/Card'
import {
    Row, Spin

} from 'antd';
import { DashboardServices } from '../../../services/DashboardServices';
const ManagerDashboard = () => {
    const [dataSource, setDataSource] = useState([]);
    useEffect(async () => {
        try {
            const response = await DashboardServices.all();
            setDataSource(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error);
        }
    }, []);
    return (
        <div>
            <h3>Overview</h3>
            <Row gutter={[16, 16]}>
                {dataSource ? dataSource.map((data, index) => (<Card data={data} id={index} />)) : <Spin size="large" />}
            </Row>

        </div >
    )
}

export default ManagerDashboard