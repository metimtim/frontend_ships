import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar.tsx";
import Cookies from "js-cookie";
import { setCurrentParkingId, setCurrentCount } from "./redux/shipsSlice.ts";

const ParkingPage = () => {
    const { currentParkingId, currentCount } = useSelector((state) => state.ships);
    const { parkingId } = useParams();
    const [dateOfParking, setDateOfParking] = useState('');
    const [port, setPort] = useState('');
    const [currentShips, setCurrentShips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [newCaptain, setNewCaptain] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchParkingData = async () => {
        try {
            const response = await fetch(`/api/parking/${parkingId}/`);
            if (!response.ok) throw new Error("Ошибка загрузки данных!");
            const data = await response.json();
            setCurrentShips(data.ships);
            setDateOfParking(data.date_of_parking);
            setPort(data.port);
        } catch (error) {
            setErrorMessage("Заявка не найдена");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchParkingData();
    }, [parkingId]);

    const updateDatePort = async () => {
        try {
            const csrfToken = Cookies.get("csrftoken");
            const response = await fetch(`/api/parking/${parkingId}/`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    "X-CSRFToken": csrfToken,
                },
                body: JSON.stringify({ date_of_parking: dateOfParking, port: port }),
            });
            if (!response.ok) throw new Error("Ошибка при обновлении даты парковки и порта");
            alert("Дата парковки и порт успешно обновлены!");
        } catch (error) {
            alert("Не удалось обновить дату парковки и порт.");
            console.error("Ошибка:", error);
        }
    };

    const handleDelete = async () => {
        try {
            const csrfToken = Cookies.get("csrftoken");
            const response = await fetch(`/api/delete-parking/${parkingId}/`, {
                method: "DELETE",
                headers: {
                    "X-CSRFToken": csrfToken,
                },
            });
            if (response.ok) {
                dispatch(setCurrentParkingId(null));
                dispatch(setCurrentCount(0));
                navigate("/ships");
            } else {
                alert("Ошибка при удалении заявки");
            }
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    const handleDeleteShip = async (shipId) => {
        try {
            const csrfToken = Cookies.get("csrftoken");
            const response = await fetch(`/api/delete-from-parking/${parkingId}/ship/${shipId}/`, {
                method: "DELETE",
                headers: { "X-CSRFToken": csrfToken },
            });
            if (response.ok) {
                setCurrentShips(currentShips.filter((ship) => ship.id_ship !== shipId));
            } else {
                alert("Ошибка при удалении корабля");
            }
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    // const handleSaveCaptain = async (shipId) => {
    //     try {
    //         const csrfToken = Cookies.get("csrftoken");
    //         const response = await fetch(`/api/add-captain/${parkingId}/ship/${shipId}/`, {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "X-CSRFToken": csrfToken,
    //             },
    //             body: JSON.stringify({ captain: newCaptain }),
    //         });
    //         if (response.ok) {
    //             setCurrentShips((prev) =>
    //                 prev.map((ship) =>
    //                     ship.id_ship === shipId ? { ...ship, captain: newCaptain } : ship
    //                 )
    //             );
    //         } else {
    //             alert("Ошибка при обновлении капитана");
    //         }
    //     } catch (error) {
    //         console.error("Ошибка:", error);
    //     }
    // };

    const handleFormParking = async () => {
        try {
            const csrfToken = Cookies.get("csrftoken");
            const response = await fetch(`/api/form-parking/${parkingId}/`, {
                method: "PUT",
                headers: { "X-CSRFToken": csrfToken },
            });
            if (response.ok) {
                dispatch(setCurrentParkingId(null));
                dispatch(setCurrentCount(0));
                navigate("/ships");
            } else {
                alert("Ошибка при формировании заявки");
            }
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="bg-[#060F1E]">
                <Navbar />
            </div>

            {/* Заголовок */}
            <div className="text-center my-8">
                <h1 className="text-3xl font-bold text-blue-900">Моя заявка</h1>
            </div>

            {/* Поля для ввода даты парковки и порта */}
            <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="dateOfParking">
                        Дата парковки
                    </label>
                    <input
                        id="dateOfParking"
                        type="text"
                        value={dateOfParking}
                        onChange={(e) => setDateOfParking(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="port">
                        Порт
                    </label>
                    <input
                        id="port"
                        type="text"
                        value={port}
                        onChange={(e) => setPort(e.target.value)}
                        placeholder="Введите название порта"
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>
                <button
                    onClick={updateDatePort}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                >
                    Обновить
                </button>
            </div>

            {/* Карточки кораблей */}
            <div className="max-w-lg mx-auto mt-8 space-y-4">
                {currentShips.map((ship) => (
                    <div
                        key={ship.pk}
                        className="flex items-start p-4 bg-white rounded shadow-md space-x-4"
                        style={{ height: "130px" }}
                    >
                        {/* Картинка корабля */}
                        <img
                            src={ship.img_url || "https://via.placeholder.com/150"}
                            alt={ship.ship_name}
                            className="w-24 h-24 object-cover rounded-md"
                        />

                        {/* Информация о корабле */}
                        <div className="flex-1">
                            <h2 className="text-md font-bold text-gray-800">{ship.ship_name}</h2>
                            <p className="text-sm text-gray-600">Класс: {ship.class_name}</p>
                            <div className="flex items-center mt-2">
                                <span className="text-sm text-gray-600 mr-2">Капитан:</span>
                                <input
                                    type="text"
                                    value={ship.captain || ""}
                                    onChange={(e) =>
                                        setCurrentShips((prev) =>
                                            prev.map((s) =>
                                                s.id_ship === ship.id_ship
                                                    ? { ...s, captain: e.target.value }
                                                    : s
                                            )
                                        )
                                    }
                                    className="p-1 border rounded w-28"
                                />
                            </div>
                        </div>
                        {/* Кнопки действий */}
                        <div className="flex flex-col items-end space-y-2 mt-4">
                            <button
                                onClick={async () => {
                                    try {
                                        const csrfToken = Cookies.get("csrftoken");
                                        const response = await fetch(
                                            `/api/add-captain/${parkingId}/ship/${ship.id_ship}/`,
                                            {
                                                method: "PUT",
                                                headers: {
                                                    "Content-Type": "application/json",
                                                    "X-CSRFToken": csrfToken,
                                                },
                                                body: JSON.stringify({ captain: ship.captain }),
                                            }
                                        );
                                        if (!response.ok) throw new Error("Ошибка при обновлении капитана");
                                        alert("Капитан успешно обновлен");
                                    } catch (error) {
                                        console.error("Ошибка:", error);
                                        alert("Не удалось обновить капитана");
                                    }
                                }}
                                className="min-w-24 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                            >
                                Сохранить
                            </button>
                            <button
                                onClick={() => handleDeleteShip(ship.id_ship)}
                                className="min-w-24 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
                ))}

            </div>

            {/* Кнопки управления заявкой */}
            <div className="flex justify-center space-x-4 mt-8">
                <button
                    onClick={handleFormParking}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition mb-4"
                >
                    Сформировать заявку
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition mb-4"
                >
                    Удалить заявку
                </button>
            </div>

            {/* Сообщение об ошибке */}
            {errorMessage && (
                <div className="text-center text-red-500 font-medium mt-4">{errorMessage}</div>
            )}
        </div>
    );

};

export default ParkingPage;