import { Routes, Route, BrowserRouter} from 'react-router-dom';
import HomePage from './HomePage.tsx';
import ShipsPage from "./ShipsPage.tsx";
import ShipDescriptionPage from "./ShipDescriptionPage.tsx";
import LoginPage from "./LoginPage.tsx";
import RegisterPage from "./RegisterPage.tsx";
import ProfilePage from "./ProfilePage.tsx";
import ParkingPage from "./ParkingPage.tsx";
import ParkingsHistoryPage from "./ParkingsHistoryPage.tsx";
import {useEffect} from "react";
import {invoke} from "@tauri-apps/api/core";




function App() {
    useEffect(()=>{
        invoke('tauri', {cmd:'create'})
            .then(() =>{console.log("Tauri launched")})
            .catch(() =>{console.log("Tauri not launched")})
        return () =>{
            invoke('tauri', {cmd:'close'})
                .then(() =>{console.log("Tauri launched")})
                .catch(() =>{console.log("Tauri not launched")})
        }
    }, [])
    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/ships" element={<ShipsPage />} />
                <Route path="/ships/:shipId" element={<ShipDescriptionPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/parking/:parkingId" element={<ParkingPage />} />
                <Route path="/parkings" element={<ParkingsHistoryPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;