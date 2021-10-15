import { useEffect, useState } from "react";
import { getRequest } from '../../utils/index';
import { ALBUMS_ENDPOINT } from '../../constans/endpoints';
import PageWrapper from './../../components/pageWrapper/index';
import { Table, Tag, Space } from 'antd';
import { openNotification } from './../../utils/index';

const { Column, ColumnGroup } = Table;

interface Albums {
  userId: number,
  id: number,
  title: string
};

const AlbumsPage = () => {
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
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Actions',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  
  return (
    <PageWrapper>
      <>

        <h1>Album</h1>
        <div> 
        {/* <Table dataSource={AlbumItems}>
          <Column title="Name" />
          <Column title="Age" dataIndex="age" key="age" />
          <Column title="Address" dataIndex="address" key="address" />
          <Column
            title="Tags"
            dataIndex="tags"
            key="tags"
            render={tags => (
              <>
                {tags.map((tag:any) => (
                  <Tag color="blue" key={tag}>
                    {tag}
                  </Tag>
                ))}
              </>
            )}
          />
          <Column
            title="Action"
            key="action"
            render={(text, record:any) => (
              <Space size="middle">
                <a>Invite {record.lastName}</a>
                <a>Delete</a>
              </Space>
            )}
          />
        </Table> */}
        </div>
      </>
    </PageWrapper>
  )
}

export default AlbumsPage;