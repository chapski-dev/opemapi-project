import { Image } from 'antd';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';

const AlbumImage = (props:any) => {
  const { users } = useContext(UserContext)
    return (
      <div className="photo-wrapper">
        <Image className="photo" width={250} src={props.url} />
      </div>
    )
}

export default AlbumImage;