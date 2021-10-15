import { Avatar, Button, Card, Modal } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { COMMENTS_ENDPOINT, POSTS_ENDPOINT } from '../../constans/endpoints';
import { getRequest, openNotification } from './../../utils/index';
import { UserOutlined } from '@ant-design/icons';
import './style.scss'
import PageWrapper from './../../components/pageWrapper/index';
import { UserContext } from '../../context/userContext';


const { Meta } = Card;


interface IPost {
  userId: number,
  id: number,
  title: string,
  body: string,
};
interface IPostsList extends IPost {};

interface IComments {
  postId: number,
  id: number,
  name: string,
  email: string,
  body: string,
}

const PostsPage = () => {
  const { users } = useContext(UserContext)
  const [posts, setPosts] = useState<IPostsList[]>([])
  const [comments, setComments] = useState<IComments[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const getPosts = () => {
    getRequest(POSTS_ENDPOINT)
    .then(res => setPosts(res.data))
    .catch(err => openNotification(err.response.data.error, err.response.data.message));
  };
  const getComments = () => {
    getRequest(COMMENTS_ENDPOINT)
    .then(res => setComments(res.data))
    .catch(err => openNotification(err.response.data.error, err.response.data.message));
  }



  useEffect(() => {
    getPosts();
    getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <PageWrapper>
      <>
      <h1>Posts Page</h1>
      <div className='posts-row'>
        {posts.map((post, index) => {
          return (
              <Card
              key={post.id} 
                hoverable
                title={users.map((user) => {
                  if (user.id === post.userId) {
                    return (
                      user.name
                    )
                  }
                })}
                bordered={true} >
                <Avatar icon={<UserOutlined />} />
                <p>{post.title}</p>
                <p>{post.body}</p>
                <Button type="primary" onClick={showModal} >
                  Show Comments
                </Button>
              </Card>
          )
        })}
      </div>
        <Modal 
          title={"Test title"} 
          visible={isModalVisible}
          footer={[ 
          <Button key="submit" type="primary" onClick={handleOk}>
            Close
          </Button>
          ]}>
            <div className="current-post">
              <Avatar icon={<UserOutlined />} />
              <h5>{users.map((user) => user.name)}</h5>
              <p>{'Test'}</p>
              <p>{'Test'}</p>
            </div>
            <p>Some contents...</p>
        </Modal> 
      </>
    </PageWrapper>
    
  )
};

export default PostsPage;