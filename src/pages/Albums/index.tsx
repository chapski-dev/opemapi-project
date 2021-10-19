import { useContext, useEffect, useState } from "react";
import { getRequest } from '../../utils/index';
import { ALBUMS_ENDPOINT } from '../../constans/endpoints';
import PageWrapper from './../../components/pageWrapper/index';
import { Table, Button } from 'antd';
import { openNotification } from './../../utils/index';
import { UserContext } from "../../context/userContext";
import { useHistory } from 'react-router-dom';

// const { Column, ColumnGroup } = Table;

interface IAlbums {
  userId?: number,
  id?: number,
  title?: string
};
// interface INeededItems {
//   users: IAlbums[],
// };

const AlbumsPage = () => {
  
  const history =  useHistory();
  const { users } = useContext(UserContext)
  const [albumItems, setAlbumsItems] = useState<IAlbums[]>([]);

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
      dataIndex: 'userId',
      key: 'userId',
      render:(userId: any) => {
        const userName = users.find(item => item.id === userId)?.name
        return userName
      },
    },
    {
      title: 'Album Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Actions',
      dataIndex: 'id',
      key: 'id',
      render: (postsId: any) => {
        const postId = users.find(item => item.id === postsId)?.id
        return  <Button key="submit" type="primary" onClick={() => history.push(`${window.location.pathname}/${postId}`)}>Show Photos</Button>
      }
    },
  ];
  return (
    <PageWrapper>
      <>
        <h1>Album</h1>
        <Table columns={columns} dataSource={albumItems} />
      </>
    </PageWrapper>
  )
}

export default AlbumsPage;