// import React, { Component } from 'react';
import { render } from 'react-dom';
import './test.css';
// import PropTypes from 'prop-types';
// import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
// import Home from './Home';
// import User from './User';
// import Search from './Search';
// import City from './City';
// import Detail from './Detail';
// import NotFound from './NotFound';
// 使用<Switch>组件来包裹一组<Route>。<Switch>会遍历自身的子元素（即路由）并对第一个匹配当前路径的元素进行渲染
//
// let Routes = (
//   <Switch>
//     <Route path='/' exact component={Home}/>
//     <Route path='/user'  component={User}/>
//     <Route path='/search'  component={Search}/>
//     <Route path='/detail'  component={Detail}/>
//     <Route path='/city'  component={City}/>
//     <Route component={NotFound}/>
//   </Switch>
// );

// /******************* 路由跳转 **************/
// class Lis extends Component {
//   constructor(props, context) {
//     super(props, context);
//   }

//   componentDidMount() {
//     // let unlisten = this.context.router.history.listen(function(location, action) {
//     //   console.log(location);
//     //   console.log(action);
//     // });
//     // let unblock = this.context.router.history.block(function(location, action) {
//     //   return '确认跳转';
//     // });

//   }

//   render() {
//     return (
//       <div>
//         {Routes}
//       </div>
//     );
//   }
// };
// Lis.contextTypes = {
//   router: PropTypes.object
// }

// const App = () => (
//   <BrowserRouter keyLength={8} >
//     <Lis></Lis>
//   </BrowserRouter>
// )

/******************* 路由参数 **************/
// const PrimaryLayout = props => {
//   return (
//     <div className="primary-layout">router:
//       <BrowserRouter><Switch>
//         <Route path="/" exact component={HomePage} />
//         <Route path="/user" component={UsersPage} />
//         {/*<Route path="/user/:userId" component={UserProfilePage} /> BrowseUsersPage*/}
//         <Route path="/products" exact component={BrowseProductsPage} />
//         <Route path="/products/:productId" component={ProductProfilePage} />
//         <Redirect to="/" />
//       </Switch>
//       </BrowserRouter>
//     </div>
//   );
// };

// const HomePage = () => (
//   <div className="home-page">
//     HomePage
//   </div>
// )

// const User2 = () => (
//   <div className="">
//     公用user
//   </div>
// )

// const UsersPage = (props) => (
//   <div className="user-sub-layout">
//     <User2/>
//     <Switch>
//       <Route path={props.match.path} exact component={BrowseUsersPage} />
//       <Route path="/user/:userId" component={UserProfilePage} />
//     </Switch>
//   </div>
// )

// const BrowseUsersPage = () => (
//   <div className="user-sub-layout">
//     {/*<User2/>*/}
//     user
//   </div>
// )

// const UserProfilePage = props => (
//   <div>
//     {/*<User2/>*/}
//     userId: {props.match.params.userId}
//   </div>
// )

// const BrowseProductsPage = () => (
//   <div className="user-sub-layout">
//     products
//   </div>
// )

// const ProductProfilePage = () => (
//   <div>productId: {props.match.params.productId}</div>
// )

/******************* 测试 **************/
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  NavLink,
  Prompt
} from 'react-router-dom'

////////////////////////////////////////////////////////////
// 1. Click the public page
// 2. Click the protected page
// 3. Log in
// 4. Click the back button, note the URL each time

const AuthExample = () => (
  <Router>
    <div>
      <AuthButton/>
      <ul>

        <li><Link to="/protected">Protected Page</Link></li>
        <li><NavLink exact to="/public">Public</NavLink></li>
        <Prompt when={false} message="Are you sure you want to leave?"/>
      </ul>
      <Route path="/public" exact component={Public}/>
      <Route path="/login" component={Login}/>
      <PrivateRoute path="/protected" component={Protected}/>
    </div>
  </Router>
)

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const AuthButton = withRouter(({ history }) => (

  fakeAuth.isAuthenticated ? (
    <p>
    ({console.log(history)})
      Welcome! <button onClick={() => {
        fakeAuth.signout(() => history.push('/'))
      }}>Sign out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
))

const PrivateRoute = ({ component: Component, ...rest }) => ( < Route {...rest }
  render = {
    props => (
      fakeAuth.isAuthenticated ? (
        <Component {...props}/>
      ) : ( < Redirect to = {
          {
            pathname: '/login',
            state: { from: props.location }
          }
        }
        />
      )
    )
  }
  />
)

const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>

class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}

export default AuthExample
/******************* 最终输出 **************/
render(<AuthExample/>, document.getElementById('root'))
