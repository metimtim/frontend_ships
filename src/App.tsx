import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage.tsx';
import ShipsPage from "./ShipsPage.tsx";
import ShipDescriptionPage from "./ShipDescriptionPage.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/ships" element={<ShipsPage />} />
                <Route path="/ships/:shipId" element={<ShipDescriptionPage />} />
                {/*<Route path="/parking/:parkingId" element={<ParkingPage />} />*/}
            </Routes>
        </Router>
    );
}

export default App;