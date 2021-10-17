import { Image } from 'antd';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';

const AlbumImage = (props:any) => {
  const { users } = useContext(UserContext)
  
  // if(users.find(user => user.id === Number(window.location.pathname.slice(-1)) === props.albumId)) {
  //   return (
  //     <Image width={250} src={props.url} />
  //   )
  // } else {
    return (
      <Image width={250} src={props.url} />
    )
  // }
}

export default AlbumImage;