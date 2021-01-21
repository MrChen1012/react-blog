import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from '../pages/login'
import Admin from '../pages/Admin'

function PageRouter() {
  return (
    <Router>
      <Route path='/' exact component={Login} />
      <Route path='/index/' component={Admin} />
    </Router>
  )
}

export default PageRouter;