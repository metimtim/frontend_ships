import { Routes, Route, BrowserRouter} from 'react-router-dom';
import HomePage from './HomePage.tsx';
import ShipsPage from "./ShipsPage.tsx";
import ShipDescriptionPage from "./ShipDescriptionPage.tsx";

function App() {
    return (
        <BrowserRouter basename="/frontend_ships">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/ships" element={<ShipsPage />} />
                <Route path="/ships/:shipId" element={<ShipDescriptionPage />} />
                {/*<Route path="/parking/:parkingId" element={<ParkingPage />} />*/}
            </Routes>
        </BrowserRouter>
    );
}

export default App;