import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Principal from '../pages/Principal'
import Atualizar from '../pages/Atualizar'

const Routes: React.FC = () => (
  <Switch>
    <Route path='/' exact component={Principal} />
    <Route path='/cliente/:id' exact component={Atualizar} />
  </Switch>
)

export default Routes
