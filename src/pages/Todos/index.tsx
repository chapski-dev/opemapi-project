
import { useContext, useEffect, useState } from 'react';
import PageWrapper from './../../components/pageWrapper/index';
import { Card, Popover, Checkbox, Avatar, Select, Space, Input, Button } from 'antd';
import { getRequest, openNotification } from './../../utils/index';
import { TODOS_ENDPOINT } from '../../constans/endpoints';
import './style.scss'
import { UserContext } from '../../context/userContext';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';

const { Search } = Input;
interface ITodos {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
  userName: string,
}

const TodosPage = () => {
  const { users } = useContext(UserContext)
  const [todos, setTodos] = useState<ITodos[]>([]);
  const [searchNameValue, setSearchNameValue] = useState<string>('');
  const [searchTitleValue, setSearchTitleValue] = useState<string>('');
  const [selectComplitedValue, setSelectComplitedValue] = useState<boolean>(true);

  const [filteredTodos, setFilteredTodos] = useState<any[]>([]);


  const getTodos = () => {
    getRequest(TODOS_ENDPOINT)
    .then((res: any) => setTodos(res.data))
    .catch(err => openNotification(err.response.data.error, err.response.data.message));
  }

  function onChange(e: any) {
    console.log(`checked = ${e.target.checked}`);
  }

  const { Option } = Select;

  const onSearch = () => {
    const renderSerchItems = todos.filter(todo => (
      todo.title.toLowerCase().includes(searchTitleValue.toLowerCase()) 
      && todo.userName.toLowerCase().includes(searchNameValue.toLowerCase()) 
      && selectComplitedValue ? todo.completed : !todo.completed
    )); 
      setTodos(renderSerchItems);
  };

  function handleChange(value:any) {
    setSelectComplitedValue(value === 'compleeted' ? true : false);
  }
  
  useEffect(() => {
    const items = todos.map((item: any) => ({...item, userName: `${users.find((user) => user.id === item.userId)?.name}`}))
    setTodos(items);
  }, [users.length]);
  useEffect(() => {
    getTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <PageWrapper>
      <>
      <Space>
        <Input value={searchNameValue} onChange={e => setSearchNameValue(e.target.value)} placeholder="Name" />
        <Input value={searchTitleValue} onChange={e => setSearchTitleValue(e.target.value)} placeholder="Title" />
        <Select defaultValue="compleeted" onChange={handleChange}>
          <Option value='compleeted'>compleeted</Option>
          <Option value='in-procces'>in procces</Option>
        </Select>
        <Button onClick={onSearch}><SearchOutlined /></Button>
      </Space >
        <h1>Todos Page</h1>
        <div className='todos-row'>
          {todos.map((item) => {
            return (
              <Card key={item.id} title={users.map((user) => {
                const content = (
                  <div>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                    <div>
                      Address:
                      <div>City: {user.address.city}</div>
                      <div>Street: {user.address.street}</div>
                      <div>Suite: {user.address.suite}</div>
                    </div>
                  </div>
                );
                if (user.id === item.userId) {
                  return (
                    <Popover content={content} title="User Info">
                      <Avatar icon={<UserOutlined />} />
                      <div className='user-name'>
                        {user.name}
                      </div>
                    </Popover>
                  )
                }
                })} bordered={true}>
                <h4>{item.title}</h4>
                <Checkbox 
                  defaultChecked = {item.completed}
                  onChange={onChange}>
                </Checkbox>
              </Card>
            )
          })}
        </div>

      </>
    </PageWrapper>
  )
}

export default TodosPage;