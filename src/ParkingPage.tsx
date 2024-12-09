import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar.tsx";
import Cookies from "js-cookie";
import Modal from "./components/Modal.tsx";
import { setCurrentParkingId, setCurrentCount } from "./redux/shipsSlice.ts";

const ParkingPage = () => {
    const { currentParkingId, currentCount } = useSelector((state) => state.ships);
    const { parkingId } = useParams();
    const [dateOfParking, setDateOfParking] = useState('');
    const [port, setPort] = useState('');
    const [currentShips, setCurrentShips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [editShip, setEditShip] = useState(null);
    const [newCaptain, setNewCaptain] = useState('');
    const [status, setStatus] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchParkingData = async () => {
        try {
            const response = await fetch(`/api/parking/${parkingId}/`);
            if (!response.ok) throw new Error("Ошибка загрузки данных!");
            const data = await response.json();
            setCurrentShips(data.ships);
            setStatus(data.status);
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

    const handleEditCaptain = (shipId, currentCaptain) => {
        setEditShip(shipId);
        setNewCaptain(currentCaptain);
        setModalOpen(true);
    };

    const handleSaveCaptain = async () => {
        try {
            const csrfToken = Cookies.get("csrftoken");
            const response = await fetch(`/api/add-captain/${parkingId}/ship/${editShip}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken,
                },
                body: JSON.stringify({ captain: newCaptain }),
            });
            if (response.ok) {
                setCurrentShips((prev) =>
                    prev.map((ship) =>
                        ship.id_ship === editShip ? { ...ship, captain: newCaptain } : ship
                    )
                );
                setModalOpen(false);
            } else {
                alert("Ошибка при обновлении капитана");
            }
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

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
                <Navbar/>
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
                        className="flex items-center p-4 bg-white rounded shadow-md space-x-4"
                    >
                        {/* Картинка корабля */}
                        <img
                            src={ship.img_url || "https://via.placeholder.com/150"}
                            alt={ship.ship_name}
                            className="w-36 h-32 object-cover rounded-md"
                        />

                        {/* Информация о корабле */}
                        <div className="flex-1">
                            <h2 className="text-lg font-bold text-gray-800">{ship.ship_name}</h2>
                            <p className="text-sm text-gray-600">Класс: {ship.class_name}</p>
                            <p className="text-sm text-gray-600">Капитан: {ship.captain || "Не назначен"}</p>

                            {/* Кнопки действий */}
                            <div className="flex space-x-2 mt-4">
                                <button
                                    onClick={() => handleEditCaptain(ship.id_ship, ship.captain || "")}
                                    className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
                                >
                                    Редактировать капитана
                                </button>
                                <button
                                    onClick={() => handleDeleteShip(ship.id_ship)}
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                >
                                    Удалить
                                </button>
                            </div>
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

            {/* Модалка для редактирования капитана */}
            {isModalOpen && (
                <Modal onClose={() => setModalOpen(false)}>
                    <h2 className="text-2xl font-bold mb-4">Редактирование капитана</h2>
                    <input
                        type="text"
                        value={newCaptain}
                        onChange={(e) => setNewCaptain(e.target.value)}
                        className="p-2 border rounded w-full mb-4"
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={handleSaveCaptain}
                    >
                        Сохранить
                    </button>
                </Modal>
            )}

            {/* Сообщение об ошибке */}
            {errorMessage && (
                <div className="text-center text-red-500 font-medium mt-4">{errorMessage}</div>
            )}
        </div>

    );
};

export default ParkingPage;
