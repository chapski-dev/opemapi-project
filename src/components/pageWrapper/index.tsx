import { Layout, Menu, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { IProps } from './../../context/userContext';
import { CameraOutlined, CheckSquareOutlined, FormOutlined, UserOutlined } from '@ant-design/icons';
import './style.scss'

const { Header, Content, Footer } = Layout;


const PageWrapper = (props: IProps) => {
  return (
    <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="users" icon={<UserOutlined />}>
          <Link to='/users' >Users</Link>
        </Menu.Item>
        <Menu.Item key="todos" icon={<CheckSquareOutlined />}>
          <Link to='/todos'>Todos</Link>
        </Menu.Item>
        <Menu.Item key="albums" icon={<CameraOutlined />}>
          <Link to='/albums'>Albums</Link>
        </Menu.Item>
        <Menu.Item key="posts" icon={<FormOutlined />}>
          <Link to='/posts'>Posts</Link>
        </Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>

      <div className="site-layout-content">
        {props.children}
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
  )
}

export default PageWrapper;