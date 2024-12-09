import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './redux/authSlice'; // Импортируем экшен для авторизации
import Cookie from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import logo from './assets/logo.png'; // Импортируем лого

const LoginPage = () => {
    const [username, setUsername] = useState(''); // Стейт для имени пользователя
    const [password, setPassword] = useState(''); // Стейт для пароля
    const [error, setError] = useState(''); // Стейт для ошибок
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            Cookie.remove('csrftoken');
            Cookie.remove('sessionid');
            const response = await fetch('/api/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }), // Отправляем имя пользователя и пароль
            });

            if (response.ok) {
                const data = await response.json();
                let is_staff = false;
                if (data.staff === true) {
                    is_staff = true;
                }

                // После успешного логина передаем username в Redux
                dispatch(login({ username, is_staff }));
                navigate('/ships'); // Перенаправляем на страницу кораблей
            } else {
                setError('Неверное имя пользователя или пароль'); // Сообщение об ошибке
            }
        } catch (error) {
            console.error('Ошибка при входе:', error);
            alert('Ошибка при входе. Пожалуйста, попробуйте позже.');
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <div className="flex justify-center mb-6">
                    <Link to="/" className="flex items-center gap-2">
                        <img src={logo} alt="logo" className="w-16 h-16" />
                    </Link>
                </div>
                <h2 className="text-2xl font-semibold text-center mb-4">Войти</h2>
                {error && <div className="text-red-500 text-center mb-4">{error}</div>}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Имя пользователя</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Пароль</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Войти
                        </button>
                    </div>
                </form>
                <div className="text-center mt-4">
                    <Link to="/register" className="text-blue-500 hover:underline">Зарегистрироваться</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
