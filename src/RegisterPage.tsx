import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './redux/authSlice'; // Импортируем экшн для авторизации
import { Link, useNavigate } from 'react-router-dom';
import logo from './assets/logo.png'; // Импортируем лого

const RegistrationPage = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Стейт для ошибок
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/register/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                dispatch(login({ username: data.username, is_staff: false })); // Авторизуем пользователя после регистрации
                navigate('/login'); // Перенаправляем на страницу входа
            } else {
                setError('Ошибка регистрации. Пожалуйста, проверьте введенные данные.');
                alert('Ошибка регистрации. Пожалуйста, проверьте введенные данные.');
            }
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
            alert('Ошибка при регистрации. Пожалуйста, попробуйте позже.');
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
                <h2 className="text-2xl font-semibold text-center mb-4">Регистрация</h2>
                {error && <div className="text-red-500 text-center mb-4">{error}</div>}
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
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
                            Зарегистрироваться
                        </button>
                    </div>
                </form>
                <div className="text-center mt-4">
                    <Link to="/login" className="text-blue-500 hover:underline">Уже есть аккаунт? Войти</Link>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;
