import { useContext, useEffect, useState } from "react";
import { getRequest } from '../../utils/index';
import { ALBUMS_ENDPOINT } from '../../constans/endpoints';
import PageWrapper from './../../components/pageWrapper/index';
import { Table, Tag, Space } from 'antd';
import { openNotification } from './../../utils/index';
import { UserContext } from "../../context/userContext";

const { Column, ColumnGroup } = Table;

interface Albums {
  userId: number,
  id: number,
  title: string
};

const AlbumsPage = () => {

  const { users } = useContext(UserContext)
  const [AlbumItems, setAlbumsItems] = useState<Albums[]>([]);

  const getAlbumsItems = () => {
    getRequest(ALBUMS_ENDPOINT)
    .then(res => setAlbumsItems(res.data))
    .catch(err => openNotification(err.response.data.error, err.response.data.message));
  };

  useEffect(() => {
    getAlbumsItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  
  const columns = [
    {
      title: 'User Name',
      dataIndex: 'name',
      key: 'name',
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
    },
  ];
  
  return (
    <PageWrapper>
      <>

        <h1>Album</h1>
        <div> 
        <Table columns={columns} dataSource={AlbumItems} />
        </div>
      </>
    </PageWrapper>
  )
}

export default AlbumsPage;