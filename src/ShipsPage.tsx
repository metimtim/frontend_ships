import {useEffect, useState} from "react";
import Navbar from "./components/Navbar.tsx";
import {Link} from "react-router-dom";
import Breadcrumbs from "./components/Breadcrumbs.tsx";


const mockShips = [
    { id_ship: 1, ship_name: 'LIRICA', class_name: 'Круизный лайнер', img_url: 'http://127.0.0.1:9000/rip/LI.jpg' },
    { id_ship: 2, ship_name: 'ORCHESTRA', class_name: 'Баржа', img_url: 'http://127.0.0.1:9000/rip/OR.jpeg' },
    { id_ship: 3, ship_name: 'OPERA', class_name: 'Круизный лайнер', img_url: 'http://127.0.0.1:9000/rip/OP.jpg' },
];

const ShipsPage = () => {
    const [inputValue, setInputValue] = useState('');
    const [ships, setShips] = useState(mockShips);
    const [currentParkingId, setCurrentParkingId] = useState(null);
    const [currentCount, setCurrentCount] = useState(0);

    const fetchShips = async () => {
        try {
            const response = await fetch('/api/ships/');
            const shipsData = await response.json();
            const filteredData = shipsData.filter((item: { id_ship: undefined; }) => item.id_ship !== undefined);
            const parkingIdData = shipsData.find((item: { parking_id: undefined; }) => item.parking_id);
            const parkingCountData = shipsData.find((item: { count: undefined; }) => item.count);
            setShips(filteredData);
            setShips(filteredData);
            setCurrentParkingId(parkingIdData?.parking_id || null);
            setCurrentCount(parkingCountData?.count || 0);
        } catch (error) {
            console.error('Ошибка при загрузке данных кораблей:', error);
            setShips(mockShips);
            setShips(mockShips);
            setCurrentParkingId(null);
            setCurrentCount(0);
        }
    };
    useEffect(() => {
        fetchShips();
    }, []);

    const handleSearch = async (class_name: { preventDefault: () => void; }) => {
        class_name.preventDefault();
        try {
            const response = await fetch(`/api/ships/?class_name=${inputValue}`);
            const result = await response.json();
            const filteredResult = result.filter((item: { id_ship: undefined; }) => item.id_ship !== undefined);
            setShips(filteredResult);
        } catch (error) {
            console.error('Ошибка при выполнении поиска:', error);
            const filteredLocalShips = mockShips.filter(ship => {
                const matchesClassName = inputValue
                    ? ship.class_name.toLowerCase().includes(inputValue.toLowerCase())
                    : true;
                return matchesClassName;
            });
            setShips(filteredLocalShips);
        }
    };



    return (
        <div className="bg-slate-100 font-timoxa">
            <div className="bg-[#060F1E]">
                <Navbar/>
            </div>

            <Breadcrumbs path="/ships"/>
            <form onSubmit={handleSearch} className="flex justify-center mb-16 mt-12 space-x-2">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(ship_class) => setInputValue(ship_class.target.value)}
                    placeholder="Поиск..."
                    className="p-2 w-1/2 h-10 border rounded-md"
                />
                <button type="submit"
                        className="font-roboto h-10 w-28 rounded-md bg-orange-500 text-black hover:bg-white hover:text-orange-500 hover:border-orange-500 border transition-all duration-300">Поиск
                </button>
            </form>

            <div className="mt-12.5 text-center ml-5 mb-12.5 space-x-4">
                <h2 className="inline-block font-inknut text-5xl font-bold text-blue-900">Флот</h2>
                <h2 className="inline-block font-inknut text-5xl text-blue-900">TimCruise</h2>
            </div>
            <div className="ml-4">
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {ships.map(ship => (
                        <li key={ship.id_ship}
                            className="shadow-lg transition-all duration-300 rounded-md border
                             m-5 bg-white relative">
                            <img src={ship.img_url} alt={ship.ship_name}
                                 className="rounded-md w-full h-96 object-cover"
                            />

                            <div className="flex justify-center">
                                <Link to={`/ships/${ship.id_ship}`}
                                      className=" no-underline mt-2 text-black text-2xl">{ship.ship_name}</Link>
                            </div>

                            <div className="flex justify-center">
                                <Link to={`/ships/${ship.id_ship}`}
                                      className=" no-underline mt-2 text-black text-2xl">Класс: {ship.class_name}</Link>
                            </div>
                            <div className="m-0 p-0">
                                {/*<button*/}
                                {/*    className="pointer-events-none w-full bg-white text-blue-900 border rounded border-gray-300 mt-2 transition-all duration-500 hover:bg-blue-900 hover:text-white"*/}
                                {/*    onClick={*/}
                                {/*        (e) => {*/}
                                {/*            e.preventDefault();*/}

                                {/*        }}*/}
                                {/*>*/}
                                {/*    Добавить в заявку*/}
                                {/*</button>*/}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="ml-16 fixed bottom-2.5 right-3">
                <Link to={`#/parking/${currentParkingId}`} className="pointer-events-none">
                    <img
                        className="basket w-16 h-16 rounded-full bg-white transition-all duration-500 hover:bg-red-600"
                        src="http://127.0.0.1:9000/rip/korzina2.png" alt="store icon"/>
                    <div
                        className="absolute bottom-2 left-5 inline-block text-center w-6 h-6 rounded-full bg-red-600 border border-white">
                        <p className="top-0 w-5.5 h-4 font-roboto text-white font-bold text-md text-center justify-center">{currentCount}</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default ShipsPage;