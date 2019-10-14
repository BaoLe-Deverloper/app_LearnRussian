import React, { Component } from "react";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import routes from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import { userActions } from "./Redux/Actions";
import { connect } from "react-redux";
import {ProtectedRoute} from "./auth/ProtectedRoute";
import Errors from "./views/Errors";
import "./../node_modules/video-react/dist/video-react.css";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import "./App.css";

class App extends Component {
  constructor(props){
    super();
    props.getProfileFetch();
  //  window.responsiveVoice.speak("Добро пожаловать в онлайн приложение для изучения русского языка.желаю вам эффективного обучения", "Russian Male", {pitch:0.75 ,rate: 1,volume:1.2});
  }
  render() {
  
    return (
      <Router basename={process.env.REACT_APP_BASENAME || ""}>
      
        <Switch>
          {routes.map((route, index) => {
            return route.private ? 
              <ProtectedRoute
                key={index}
                path={route.path}
                exact={route.exact}
                claim={route.claim}
                component={props => {
                  return (
                    <route.layout {...props}>
                    <ReactCSSTransitionGroup
                      transitionAppear={true}
                      transitionAppearTimeout={600}
                      transitionEnterTimeout={600}
                      transitionLeaveTimeout={200}
                      transitionName="SlideIn"
                    > 
                          <route.component {...props} />
                    </ReactCSSTransitionGroup>
                     
                    </route.layout>
                  );
                }}
              /> :<Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={props => {
                  return (
                    <route.layout {...props}>
                      <route.component {...props} />
                    </route.layout>
                  );
                }}
              />
            
          })}
          <Route path="*" component={Errors}/>
          </Switch>
      </Router>
    );

  }
}

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(userActions.getProfileFetch())
})
const mapStateTopProps = state=>({
  user:state.user
})
export default connect(mapStateTopProps, mapDispatchToProps)(App);