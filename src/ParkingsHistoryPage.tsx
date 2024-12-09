import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Breadcrumbs from "./components/Breadcrumbs";
import { api } from './api';

const ParkingsHistoryPage = () => {
    const [parkings, setParkings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { isAuthenticated } = useSelector((state) => state.auth);

    const fetchParkings = async () => {
        if (isAuthenticated) {
            setLoading(true);
            setError('');
            try {
                const response = await api.listParkings.listParkingsList();
                setParkings(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Ошибка при выполнении запроса:', error);
                setError('Ошибка при загрузке заявок');
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchParkings();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 font-timoxa">
            <div className="bg-[#060F1E]">
                <Navbar />
            </div>

            <Breadcrumbs path="/parkings" />

            <div className="container mx-auto mt-10 px-4">
                <h2 className="text-2xl font-semibold mb-4">Мои заявки</h2>

                {loading ? (
                    <div className="flex justify-center items-center h-72">
                        <div
                            className="loader border-t-4 border-b-4 border-gray-700 w-12 h-12 rounded-full animate-spin"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-500 text-white p-4 rounded">{error}</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto bg-white text-gray-800 border-collapse shadow-md rounded-lg">
                            <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="px-4 py-2 border">Номер заявки</th>
                                <th className="px-4 py-2 border">Статус</th>
                                <th className="px-4 py-2 border">Дата создания</th>
                                <th className="px-4 py-2 border">Дата формирования</th>
                                <th className="px-4 py-2 border">Дата завершения</th>
                                <th className="px-4 py-2 border">Модератор</th>
                                <th className="px-4 py-2 border">Траты команды</th>
                                <th className="px-4 py-2 border">Действия</th>
                            </tr>
                            </thead>
                            <tbody>
                            {parkings.map((parking) => (
                                <tr key={parking.id_parking} className="border-b hover:bg-gray-100">
                                    <td className="px-4 py-2 border text-center">{parking.id_parking}</td>
                                    <td className="px-4 py-2 border text-center">{parking.status}</td>
                                    <td className="px-4 py-2 border text-center">
                                        {new Date(parking.created_at).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-2 border text-center">
                                        {parking.formed_at ? new Date(parking.formed_at).toLocaleString() : '-'}
                                    </td>
                                    <td className="px-4 py-2 border text-center">
                                        {parking.ended_at ? new Date(parking.ended_at).toLocaleString() : '-'}
                                    </td>
                                    <td className="px-4 py-2 border text-center">{parking.moderator || '-'}</td>
                                    <td className="px-4 py-2 border text-center">{parking.spendings_of_crew || 0} ₽</td>
                                    <td className="px-4 py-2 border text-center">
                                        <Link
                                            to={`/parking/${parking.id_parking}`}
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                        >
                                            Просмотр
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ParkingsHistoryPage;
