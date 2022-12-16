import React from 'react'
import { Layout } from 'antd';
import ManagerHeader from './components/ManagerHeader';
import Sidebar from './components/Sidebar';
import {
    Row,
    Col,

} from 'antd';
const ManagerLayout = (props) => {

    const { Header, Sider, Content } = Layout;

    return (
        <>
            <Layout>
                <Sider style={{
                    overflow: 'auto',
                    height: '100vh',
                    backgroundColor: "#031737",
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    paddingTop: "5rem",
                    zIndex: "1500"
                }}>
                    <Sidebar />
                </Sider>
                <Row>
                    <Header style={{
                        boxShadow: "0px 4px 5px 0px rgba(148,147,147,0.75)",
                        WebkitBoxShadow: "0px 4px 5px 0px rgba(148,147,147,0.75)",
                        MozBoxShadow: "0px 4px 5px 0px rgba(148,147,147,0.75)",
                        backgroundColor: "white",
                        position: "fixed", width: "100%", zIndex: "1000",
                        paddingLeft: "200px",
                        color: "black"
                    }}>
                        <ManagerHeader />
                    </Header>
                </Row>
                <Content className="site-layout" style={{ paddingTop: '5rem', height: "100vh" }}>
                    <Row position="relative">
                        <Col style={{ marginLeft: "200px", paddingLeft: "30px" }} md={{ offset: 0, span: 20 }} xs={{ offset: 0, span: 24 }} sm={{ offset: 4, span: 24 }}>
                            {props.children}
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </>

    )
}

export default ManagerLayout