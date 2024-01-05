import AppHeader from "../AppHeader/AppHeader";
import ComicsPage from "../../pages/ComicsPage/ComicsPage";
import Homepage from "../../pages/Homepage/Homepage";
import Page404 from "../../pages/Page404/Page404";
import SingleComicPage from "../../pages/SingleComicPage/SingleComicPage";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path="/" element={<Homepage/>}/>
                        <Route path="/comics" element={<ComicsPage/>}/>
                        <Route path="/comics/:comicId" element={<SingleComicPage/>}/>
                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;