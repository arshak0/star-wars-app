import React from 'react';
import PeopleList from "../../pageComponents/PeopleList/PeopleList";
import { Routes, Route, Link } from "react-router-dom";
import PersonComponent from "../../pageComponents/PersonComponent/PersonComponent";
import { Breadcrumb, Layout, Typography } from 'antd';

import classes from './homepage.module.scss';

const { Header, Content, Footer } = Layout;
const { Title} = Typography;

const breadcrumbItems = [
    {
        title: <Link to="/">Homepage</Link>,
        key: 'home',
    },
    {
        title: <Link to="/person/id=1">Person Page</Link>,
        key: 'person',
    },
]

export const HomePage = () => {
    return (
        <Layout className="layout" style={{ minHeight: '100vh' }}>
            <Header className={classes.header}>
                <Breadcrumb
                    className={classes.breadcrumb}
                    items={breadcrumbItems}
                    style={{ alignSelf: 'center', flexBasis: '50%' }}
                />
                <Typography className={classes.headline}>
                    <Title level={2} style={{ color: 'white', margin: 0 }}>Star Wars Characters App</Title>
                </Typography>
            </Header>
            <Content style={{ padding: '50px' }}>
                <div className="site-layout-content" style={{ background: 'none' }}>
                    <Routes>
                        <Route path="/">
                            <Route index element={<PeopleList />} />
                            <Route path="/person/:id" element={<PersonComponent />} />
                        </Route>
                    </Routes>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>©2023 Created by Arshak Ishkhanyan</Footer>
        </Layout>
    );
}

export default HomePage;
