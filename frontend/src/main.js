import React from 'react'
import {Route, Switch} from 'react-router-dom'
import List from './pages/list'

export default class Main extends React.Component{
    render(){
        return(
            <Switch>
                <Route exact path="/" component={List} />
            </Switch>
        )
    }
}