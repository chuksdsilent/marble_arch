import React, { useState } from 'react'
import { Layout } from 'antd';
import ManagerHeader from './components/ManagerHeader';
import Sidebar from './components/Sidebar';
import {
    Row,
    Col,

} from 'antd';
import { LayoutStyles } from './styles/LayoutStyles';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ManagerLayout = (props) => {

    const { Header, Sider, Content } = Layout;
    const { isSideBarOpen } = useSelector(state => state.user)

    return (
        <>
            <LayoutStyles>
                <Layout>
                    <Sider className={isSideBarOpen ? "show-side-bar" : "hide-side-bar"}>
                        <Sidebar />
                    </Sider>
                    <Row>
                        <Header className='manager-header'>
                            <ManagerHeader />
                        </Header>
                    </Row>
                    <Content className="site-layout">
                        <Row position="relative">
                            <Col className='layout-content' md={{ offset: 0, span: 20 }}>
                                {props.children}
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </LayoutStyles>
        </>

    )
}

export default ManagerLayout