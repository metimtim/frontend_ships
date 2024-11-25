import { Routes, Route, BrowserRouter} from 'react-router-dom';
import HomePage from './HomePage.tsx';
import ShipsPage from "./ShipsPage.tsx";
import ShipDescriptionPage from "./ShipDescriptionPage.tsx";
import {useEffect} from "react";



function App() {
    useEffect(() => {
        // Check if we're in a Tauri environment
        if (window.TAURI) {
            const { invoke } = window.TAURI.tauri;

            invoke('tauri', { cmd: 'create' })
                .then((response: any) => console.log(response))
                .catch((error: any) => console.log(error));

            return () => {
                invoke('tauri', { cmd: 'close' })
                    .then((response: any) => console.log(response))
                    .catch((error: any) => console.log(error));
            };
        }
    }, []);
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