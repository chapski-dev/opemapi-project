import { useContext, useEffect, useState } from "react";
import { getRequest } from '../../utils/index';
import { ALBUMS_ENDPOINT } from '../../constans/endpoints';
import PageWrapper from './../../components/pageWrapper/index';
import { Table, Button } from 'antd';
import { openNotification } from './../../utils/index';
import { UserContext } from "../../context/userContext";
import { useHistory } from 'react-router-dom';

// const { Column, ColumnGroup } = Table;

interface Albums {
  userId: number,
  id: number,
  title: string
};

const AlbumsPage = () => {
  
  const history =  useHistory();
  const { users } = useContext(UserContext)
  const [albumItems, setAlbumsItems] = useState<Albums[]>([]);

  
  const getAlbumsItems = () => {
    getRequest(ALBUMS_ENDPOINT)
    .then(res => setAlbumsItems(res.data))
    .catch(err => openNotification(err.response.data.error, err.response.data.message));
  };

  useEffect(() => {
    getAlbumsItems();
    // eslint-disable-next-lne react-hooks/exhaustive-deps
  }, [])

  
  const columns = [
    {
      title: 'User Name',
      render:(arr:any) => users.map((user) => {
        if (user.id === albumItems.find(item => item.userId === arr.id)?.userId) {
          return user.name
        }
      }),

    },
    {
      title: 'Album Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      // render: () => <Link to={`/albums/${albumItems.find}`}>Show Photos</Link>,
      render: () => <Button key="submit" type="primary" onClick={() => history.push(`${window.location.pathname}/${albumItems.find(item => item.userId)?.userId}`)}>Show Photos</Button>,
    },
  ];
  
  return (
    <PageWrapper>
      <>
        <h1>Album</h1>
        <Table columns={columns} dataSource={albumItems || users} />
      </>
    </PageWrapper>
  )
}

export default AlbumsPage;