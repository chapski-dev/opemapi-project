
import { Avatar, Button, Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useState } from 'react';

const PostModals = (props: any) => {
  // const [isModalVisible, setIsModalVisible] = useState(false);
  // const showModal = () => {
  //   setIsModalVisible(true);
  // };
  // const handleOk = () => {
  //   setIsModalVisible(false);
  // };
  return (
    <Modal 
      visible={props.showModal}
      title={props.userName} 
      // visible={isModalVisible}
      footer={[ 
      <Button key="submit" type="primary" onClick={props.handleOk}>
        Close
      </Button>
      ]}>
        <div className="current-post">
          <Avatar icon={<UserOutlined />} />
          <h5>{props.userName}</h5>
          <p>{props.title}</p>
          <p>{props.body}</p>
        </div>
        <p>Some contents...</p>
    </Modal> 
  )
}

export default PostModals;