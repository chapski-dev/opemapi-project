import { Avatar, Button, Card, Modal, List, Comment, Tooltip } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { COMMENTS_ENDPOINT, POSTS_ENDPOINT } from '../../constans/endpoints';
import { getRequest, openNotification } from './../../utils/index';
import { UserOutlined } from '@ant-design/icons';
import PageWrapper from './../../components/pageWrapper/index';
import { UserContext } from '../../context/userContext';
import './style.scss'

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
  const [previewPostId, setPreviewPostId] = useState(null);
  const [previewPostUserId, setPreviewPostUserId] = useState(null);
  const [previewPostComments, setPreviewPostComments] = useState<IComments[] | null>(null);


  const showModal = (id:any, userId: any) => {
    setPreviewPostUserId(userId);
    setPreviewPostId(id);
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
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
        {posts.map((post) => {
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
                <Button type="primary" onClick={() => showModal(post.id, post.userId)} >
                  Show Comments
                </Button>
              </Card>
          )
        })}
      </div>
        <Modal 
            onCancel={handleCancel}
          title={''} 
          visible={isModalVisible}
          footer={[ 
          <Button key="submit" type="primary" onClick={handleOk}>
            Close
          </Button>
          ]}
        >
            <div className="current-post">
              <Card
                key={posts.find(item => item.id === previewPostId)?.id} 
                hoverable
                title={users.map((user) => {
                  if (user.id === posts.find(item => item.userId === previewPostUserId)?.userId) {
                    return  user.name
                  }})}
                bordered={true} 
              >
                <Avatar icon={<UserOutlined />}/>
                <p className='post-title'>{posts.find(item => item.id === previewPostId)?.title}</p>
                <p>{posts.find(item => item.id === previewPostId)?.body}</p>
              </Card>
            </div>
            <div className='post-commets'>
              {comments.map((item) => {
                if (item.postId === previewPostId) {
                  return (
                    <Comment
                      author={item.name}
                      avatar={<Avatar icon={<UserOutlined />} />}
                      content={item.body}
                    />
                  )
                }
              })}
            </div>
        </Modal> 
      </>
    </PageWrapper>
    
  )
};

export default PostsPage;