import { HashRouter, Route, Routes } from 'react-router-dom'
import Pokedex from './Components/Pokedex'
import PokemonDetail from './Components/PokemonDetail'
import UserInput from './Components/UserInput'
import ProtectedRoutes from './Components/ProtectedRoutes'
import './App.css'

function App() {

  return (

    <HashRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<UserInput />} />

          <Route element={<ProtectedRoutes />}>
            <Route path='/pokedex' element={<Pokedex />} />
            <Route path='/pokedex/:id' element={<PokemonDetail />} />
          </Route>

        </Routes>
      </div>
    </HashRouter>

  )
}

export default App
