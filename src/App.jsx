import './App.css'
import Body from './components/Body'
import { store } from './utils/appStore'
import { Provider } from 'react-redux'



function App() {

  return (
   
    <Provider store={store}>
       <Body/>
    </Provider>
   
    
  )
}

export default App
