import { createContext, useEffect, useState } from "react";
import { USERS_ENDPOINT } from "../constans/endpoints";
import { getRequest, openNotification } from './../utils/index';


export interface IProps {
  children: JSX.Element;
};

interface IUser {
  id: number,
  name: string,
  username: string,
  email: string,
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string,
    }
  }
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string,
  }
};

interface IUserContext {
  users: IUser[],
};

export const UserContext = createContext<IUserContext>({
  users: [], // начальное значение в контексте(как в useState)
});

export const UserContextProvider = (prosp: IProps) => {
  const [users, setUsers] = useState<IUser[]>([]);

  const getUsers = () => {
    getRequest(USERS_ENDPOINT)
    .then(res => setUsers(res.data))
    .catch(err => openNotification(err.response.data.error, err.response.data.message));
  };

  useEffect(() => {
    // getUsers();
    // () => {
      getRequest(USERS_ENDPOINT)
      .then(res => setUsers(res.data))
      .catch(err => openNotification(err.response.data.error, err.response.data.message));
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider value={{users: users}}>  
      {prosp.children}
    </UserContext.Provider>
  )
}

// <UserContext.Provider value={{ user: user }}>   --- value это то что мы передаем для видимости все что надо сделать видимым для детей компонентов
// получаем обратно через const {user} = useContext(необходимый компонент из контекста потипу UserContext)