import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import ListJokes from './pages/JokesList/JokesList';
import CreateJoke from './pages/CreateJoke/CreateJoke';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route element={<Home />} path="/" />
                <Route element={<ListJokes />} exact path="/piadas" />
                <Route element={<CreateJoke />} exact path="/criar-piada" />
            </Switch>
        </BrowserRouter>
    );
}