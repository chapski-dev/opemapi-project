import { Redirect, Route, BrowserRouter as Router, useHistory, Switch } from 'react-router-dom';
import './App.scss';
import { UserContextProvider } from './context/userContext';
import AlbumsPage from './pages/Albums';
import PostsPage from './pages/Posts';
import TodosPage from './pages/Todos';
import UsersPage from './pages/Users/index';



const Routes = () => {
  return (
    <Switch>
      <Redirect exact path='/' to='posts' />
      <Route exact path='/albums' component={AlbumsPage} />
      <Route exact path='/posts' component={PostsPage} />
      {/* <Route exact path='/products/:id' component={} /> */}
      <Route exact path='/todos' component={TodosPage} />
      <Route exact path='/users' component={UsersPage} />
      <Route component={() => <> 404: Page not found </>} />
    </Switch>
  )
};


function App() {

  return (
    <div className="App">
    <UserContextProvider>
      <Router>
        <Routes />
      </Router>
    </UserContextProvider>
    </div>
  );
}

export default App;
