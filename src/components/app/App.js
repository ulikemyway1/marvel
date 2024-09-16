import { MainPage, ComicsPage, PageNotFound, SingleComicPage } from "../pages";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppHeader from "../appHeader/AppHeader";


const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path='/' element={<MainPage />} />
                        <Route path='/comics' element={<ComicsPage />} />
                        <Route path='*' element={<PageNotFound />} />
                        <Route path='/comics/:id' element={<SingleComicPage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    )

}

export default App;