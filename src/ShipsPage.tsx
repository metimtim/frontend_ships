import {useEffect, useState} from "react";
import Navbar from "./components/Navbar.tsx";
import {setShips, setCurrentParkingId, setCurrentCount, setInputValue} from "./redux/shipsSlice.ts";
import {Link} from "react-router-dom";
import Breadcrumbs from "./components/Breadcrumbs.tsx";
import lirica from "./assets/LI.jpg";
import orchestra from "./assets/OR.jpeg";
import opera from "./assets/OP.jpg";
import korzina from "./assets/korzina2.png";
import {useDispatch, useSelector} from "react-redux";
import Cookies from "js-cookie";
import {api} from "./api";
import {data} from "autoprefixer";

// Определяем базовый URL для API запросо
interface Ship {
    id_ship: number;
    ship_name: string;
    class_name: string;
    description: string;
    img_url: string;
}

const isTauri = (): boolean => {
    return import.meta.env.VITE_TAURI_ENV === 'true';
};

const apiBaseUrl: string = isTauri() ? '/tauri-api' : '/api';

const mockShips = [
    { id_ship: 1, ship_name: 'LIRICA', class_name: 'Круизный лайнер', img_url: lirica },
    { id_ship: 2, ship_name: 'ORCHESTRA', class_name: 'Баржа', img_url: orchestra },
    { id_ship: 3, ship_name: 'OPERA', class_name: 'Круизный лайнер', img_url: opera },
];

const ShipsPage = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { ships, inputValue, currentParkingId, currentCount } = useSelector((state) => state.ships);
    const dispatch = useDispatch();
    // const [inputValue, setInputValue] = useState('');
    // const [ships, setShips] = useState(mockShips);
    // const [currentParkingId, setCurrentParkingId] = useState(null);
    // const [currentCount, setCurrentCount] = useState(0);

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const fetchShips = async () => {
        try {
            const response = await api.ships.shipsList();

            const shipsData = response.data.filter((item) => item.id_ship !== undefined);
            dispatch(setShips(shipsData));


            const parkingIdData = response.data.find((item) => item.draft_request_id);
            const parkingCountData = response.data.find((item) => item.count);
            console.log(shipsData, parkingIdData, parkingCountData);
            dispatch(setCurrentParkingId(parkingIdData?.draft_request_id || null));
            dispatch(setCurrentCount(parkingCountData?.count || 0));

            // Если данные содержат информацию об авторизованном пользователе
            setIsAuthenticated(!!parkingIdData);
        } catch (error) {
            console.error('Ошибка при загрузке данных МО:', error);
            dispatch(setShips([]));
        }
    };
    useEffect(() => {
        fetchShips();
    }, [dispatch]);

    const handleSearch = async (class_name: { preventDefault: () => void; }) => {
        class_name.preventDefault();
        try {
            const response = await api.ships.shipsList({
                class_name: inputValue,
            });
            const filteredShips = response.data.filter((item) => item.id_ship !== undefined);
            dispatch(setShips(filteredShips));
        } catch (error) {
            console.error('Ошибка при выполнении поиска:', error);

            const filteredMockShips = mockShips.filter((ship) => {
                const matchesClass = inputValue
                    ? ship.class_name.toLowerCase().includes(inputValue.toLowerCase())
                    : true;
                return matchesClass;
            });

            dispatch(setShips(filteredMockShips)); // Локальный поиск
        }
    };

    const handleAddShip = async (ship_id: number) => {
        try {
            const csrfToken = Cookies.get('csrftoken');
            const response = await api.ships.shipsAddCreate(ship_id, {}, {
                headers: {
                    'X-CSRFToken': csrfToken
                }
            });

            if (response.status === 201) {
                const updatedParkingId = response.data.draft_request_id;

                // Увеличиваем currentCount локально
                dispatch(setCurrentParkingId(updatedParkingId));
                dispatch(setCurrentCount(currentCount + 1));

                dispatch(setShips(ships.filter(ship => ship.id_ship !== ship_id)));
            } else {
                console.error('Ошибка при добавлении МО: неожиданный статус ответа', response.status);
            }
        } catch (error) {
            console.error('Ошибка при добавлении МО:', error);
        }
        fetchShips();
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
                    onChange={(ship_class) => dispatch(setInputValue(ship_class.target.value))}
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
                    {ships.map((ship: Ship) => (
                        <li
                            key={ship?.id_ship}
                            className="shadow-lg transition-all duration-300 rounded-md border m-5 bg-white relative"
                        >
                            <img
                                src={ship.img_url}
                                alt={ship.ship_name}
                                className="rounded-md w-full h-96 object-cover"
                            />

                            <div className="flex justify-center">
                                <Link
                                    to={`/ships/${ship?.id_ship}`}
                                    className="no-underline mt-2 text-black text-2xl"
                                >
                                    {ship.ship_name}
                                </Link>
                            </div>

                            <div className="flex justify-center">
                                <Link
                                    to={`/ships/${ship?.id_ship}`}
                                    className="no-underline mt-2 text-black text-2xl"
                                >
                                    Класс: {ship.class_name}
                                </Link>
                            </div>

                            <div className="mx-5 mb-3 p-0">
                                <button
                                    className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded mt-2
                                   transition-all duration-300 hover:bg-orange-700"
                                    onClick={() => handleAddShip(ship.id_ship)}
                                >
                                    Добавить
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="ml-16 fixed bottom-2.5 right-3">
                {currentCount > 0 ? (
                    <Link to={`/parking/${currentParkingId}`}>
                        <img
                            className="basket w-16 h-16 rounded-full bg-white transition-all duration-500 hover:bg-red-600"
                            src={korzina}
                            alt="store icon"
                        />
                        <div
                            className="absolute bottom-2 left-5 inline-block text-center w-6 h-6 rounded-full bg-red-600 border border-white"
                        >
                            <p className="top-0 w-5.5 h-4 font-roboto text-white font-bold text-md text-center justify-center">
                                {currentCount}
                            </p>
                        </div>
                    </Link>
                ) : (
                    <div className="cursor-not-allowed">
                        <img
                            className="basket w-16 h-16 rounded-full bg-gray-300"
                            src={korzina}
                            alt="store icon"
                        />
                        <div
                            className="absolute bottom-2 left-5 inline-block text-center w-6 h-6 rounded-full bg-gray-400 border border-gray-300"
                        >
                            <p className="top-0 w-5.5 h-4 font-roboto text-white font-bold text-md text-center justify-center">
                                {currentCount}
                            </p>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default ShipsPage;