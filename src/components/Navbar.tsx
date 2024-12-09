import {Link, useNavigate} from 'react-router-dom';
import logo from '../assets/logo.png';
import {useDispatch, useSelector} from "react-redux";
import Cookies from "js-cookie";
import axios from 'axios';
import {setCurrentCount, setCurrentParkingId, setInputValue, setShips} from "../redux/shipsSlice.ts";
import {logout} from "../redux/authSlice.ts";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, username } = useSelector((state) => state.auth); // Получаем данные о пользователе из Redux состояния

    // Функция для выхода
    const handleLogout = async (e) => {
        e.preventDefault();

        try {
            const csrfToken = Cookies.get('csrftoken'); // Получаем CSRF токен из cookies

            const response = await axios.post('/api/logout/', {}, {
                headers: {
                    'X-CSRFToken': csrfToken, // Подставляем CSRF токен в заголовок запроса
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 204) {
                Cookies.remove('sessionid');
                Cookies.remove('csrftoken');
                dispatch(setShips([]));
                dispatch(setInputValue(''));
                dispatch(setCurrentParkingId(null));
                dispatch(setCurrentCount(0));
                dispatch(logout()); // Вызываем экшен для логута в Redux
                navigate('/login'); // Перенаправляем на страницу логина
            }
        } catch (error) {
            console.error('Ошибка при выходе:', error);
            alert('Ошибка при выходе. Пожалуйста, попробуйте позже.');
        }
    };

    return (
        <header className="text-white py-4 px-6 flex justify-between items-center font-roboto">
            <div className="flex items-center space-x-4">
                <Link to="/" className="text-xl font-semibold flex items-center gap-2">
                    <div className="w-12 h-12">
                        <img className="border rounded-2xl" src={logo} alt="logo"/>
                    </div>
                    <p className="font-timoxa hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-gray-500 hover:to-gray-400 transition-all duration-500">
                        Tim Cruise
                    </p>
                </Link>
            </div>
            {/* Links */}
            <nav className="space-x-4">
                <Link to="/ships" className="hover:text-gray-300">
                    Корабли
                </Link>

                {!isAuthenticated ? (
                    <>
                        <Link to="/login" className="hover:text-gray-300">
                            Войти
                        </Link>
                        <Link to="/register" className="hover:text-gray-300">
                            Зарегистрироваться
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/parkings" className="hover:text-gray-300">
                            Заявки
                        </Link>
                        <Link to="/profile" className="hover:text-gray-300">
                            Личный кабинет ({username})
                        </Link>
                        <button onClick={handleLogout} className="hover:text-gray-300">
                            Выйти
                        </button>
                    </>
                )}
            </nav>
        </header>
    )
};

export default Navbar;
