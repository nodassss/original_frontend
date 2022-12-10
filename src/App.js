
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import login from './login'; //作成したlogin.jsを読み込んでいる
import register from './register';
import list from './list';
import clothes_register from './clothes_register';
import clothes_edit from './clothes_edit';


function App() {
  
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={login} />
          <Route exact path="/register" component={register} />
          <Route exact path="/list" component={list} />
          <Route exact path="/clothes_register" component={clothes_register} />
          <Route exact path="/clothes_edit" component={clothes_edit} />
        </Switch>
      </BrowserRouter>
    );
  
}

export default App;
