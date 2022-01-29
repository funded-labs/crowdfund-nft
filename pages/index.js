import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import HomePage from './home'

export default function Index() {
    return (
        <div>
        <Router>
            <div>                
                <Switch>
                    <Route path="/">
                        <HomePage />
                    </Route>
                </Switch>
            </div>
        </Router>
        </div>
    );
}
