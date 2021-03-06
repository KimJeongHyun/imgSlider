import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  HashRouter
} from "react-router-dom"

import LandingPage from './component/views/LandingPage/LandingPage'
import FileUpload from './component/views/FileUpload/FileUpload'
import Slide from './component/views/Slide/Slide'
import ImgList from './component/views/ImgList/ImgList';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route path="/fileUpload" component={FileUpload}/>
        <Route path="/imgSlide" component={Slide}/>
        <Route path="/imgList" component={ImgList}/>
      </Switch>
    </Router>
  );
}

export default App;
