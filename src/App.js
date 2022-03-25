import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import BillPage from './Admin/pages/bills'
import Messenger from './Admin/pages/messenger/Messenger'
import Context from './Admin/Context/Context'
import Users from './Admin/pages/users'
import GlobalStyle from './Admin/GlobalStyle/GlobalStyle'
import Sidebar from './Common/Sidebar'
import BookAdmin from './Admin/pages/BookAdmin/BookAdmin'
function App() {
    return (
        <GlobalStyle>
            <Router>
                <div className='wrap'>
                    <div className='gird'>
                        <div className='row'>
                            <div className='col l-2'>
                                <Sidebar />
                            </div>
                            <div className='col l-10'>
                                <Context>
                                <Route exact path='/'>
                                        <Users />
                                    </Route>
                                    <Route exact path='/bill'>
                                        <BillPage />
                                    </Route>
                                    <Route exact path='/messenger'>
                                        <Messenger />
                                    </Route>
                                    <Route exact path='/users'>
                                        <Users />
                                    </Route>
                                    <Route exact path='/book'>
                                        <BookAdmin />
                                    </Route>
                                </Context>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        </GlobalStyle>
    )
}

export default App
