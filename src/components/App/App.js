import AppHeader from "../AppHeader/AppHeader";
import ComicsPage from "../../pages/ComicsPage/ComicsPage";
import Homepage from "../../pages/Homepage/Homepage";
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
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;