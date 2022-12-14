import React, { useEffect, useState } from 'react'
import { UserServices } from '../../../services/UserService';
import { Space, Table, Tag, Divider, Skeleton, Switch } from 'antd';
const columns = [

    {
        title: 'surname',
        dataIndex: 'surname',
        key: 'surname',
    },
    {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName',
    },
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: 'role',
        dataIndex: 'role',
        key: 'role',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'Suspended',
        dataIndex: 'suspended',
        key: 'suspended',
        render: (status, suspended) => {
            return (
                <>

                    <Switch onChange={() => handleSwitchChange(status)} />
                </>
            )
        }

    },
]
const handleSwitchChange = (value) => {
    value = !value

}
const Staff = () => {

    const [dataSource, setDataSource] = useState([]);
    const [suspend, setSuspend] = useState(false);

    useEffect(async () => {
        try {
            const response = await UserServices.getStaff();
            setDataSource(response.data)
        } catch (error) {
            console.log(error);
        }
    }, []);
    console.log(suspend)
    return (
        <>
            <h3>Staffs</h3>
            <Divider />
            {dataSource ? <Table scroll={{ x: 400 }} className="table-striped-rows" columns={columns} dataSource={dataSource} /> : <Skeleton active />}
        </>
    )
}

export default Staff