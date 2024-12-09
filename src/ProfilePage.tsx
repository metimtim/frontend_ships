import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from './redux/authSlice';
import Navbar from './components/Navbar';
import Breadcrumbs from './components/Breadcrumbs';
import axios from 'axios';
import Cookies from 'js-cookie';
import logo from './assets/logo2.png';
import userAvatar from './assets/user.png'; // Импортируем аватар пользователя

const ProfilePage = () => {
    const { username, isAuthenticated } = useSelector((state) => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();

        try {
            const csrfToken = Cookies.get('csrftoken');
            const data = {};

            if (email) data.email = email;
            if (password) data.password = password;

            if (Object.keys(data).length === 0) {
                setError('Необходимо ввести хотя бы один параметр для обновления.');
                setSuccess('');
                return;
            }

            const response = await axios.put('/api/profile/', data, {
                headers: {
                    'X-CSRFToken': csrfToken,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                setSuccess('Профиль обновлен успешно');
                setError('');
                dispatch(logout());
                navigate('/login'); // Перенаправляем на страницу логина после изменения данных
            }
        } catch (error) {
            console.error('Ошибка при обновлении профиля:', error);
            setError('Ошибка при обновлении данных профиля');
            setSuccess('');
        }
    };

    return (
        <div className="h-screen flex flex-col bg-slate-100 font-timox">
            <div className="bg-[#060F1E]">
                <Navbar/>
            </div>
            <Breadcrumbs path="Личный кабинет"/>
            <div className="flex flex-1 items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                    <div className="text-center mb-6">
                        <img src={userAvatar} alt="User Avatar" className="w-24 h-24 rounded-full mx-auto" />
                        <h2 className="text-2xl font-semibold mt-4">{username}</h2>
                        <p className="text-gray-500">Измените данные профиля</p>
                    </div>
                    {error && <div className="text-red-500 text-center mb-4">{error}</div>}
                    {success && <div className="text-green-500 text-center mb-4">{success}</div>}
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Введите новый email"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Пароль</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Введите новый пароль"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                            >
                                Обновить профиль
                            </button>
                        </div>
                    </form>
                    <div className="mt-6 text-center">
                        <Link to="/" className="text-blue-500 hover:underline">Вернуться на главную</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
