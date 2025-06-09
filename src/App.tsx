import React from 'react';
import { setupIonicReact } from '@ionic/react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Master from './Master';
import AdminDashboard from './components/admin/admindashboard';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/" component={Master} />
      </Switch>
    </Router>
  </Provider>
);

export default App;