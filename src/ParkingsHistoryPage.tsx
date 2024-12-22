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
                <Navbar/>
            </div>

            <Breadcrumbs path="/parkings"/>

            <div className="container mx-auto mt-10 px-4">
                <h2 className="text-2xl font-semibold mb-4">Мои заявки парковок</h2>

                {loading ? (
                    <div className="flex justify-center items-center h-72">
                        <div className="loader border-t-4 border-b-4 border-white w-12 h-12 rounded-full animate-spin"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-500 text-white p-4 rounded">{error}</div>
                ) : (
                    <div className="space-y-4">
                        {parkings.map((parking) => (
                            <div
                                key={parking.id_parking}
                                className="bg-[#1A1D2B] text-gray-300 rounded p-4 shadow-md hover:bg-[#333A4E] transition"
                            >
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                                    <div className="text-center">
                                        <span className="font-semibold block">Номер заявки</span>
                                        {parking.id_parking}
                                    </div>
                                    <div className="text-center">
                                        <span className="font-semibold block">Статус</span>
                                        {parking.status}
                                    </div>
                                    <div className="text-center">
                                        <span className="font-semibold block">Дата создания</span>
                                        {new Date(parking.created_at).toLocaleString()}
                                    </div>
                                    <div className="text-center">
                                        <span className="font-semibold block">Дата формирования</span>
                                        {parking.formed_at
                                            ? new Date(parking.formed_at).toLocaleString()
                                            : '-'}
                                    </div>
                                    <div className="text-center">
                                        <span className="font-semibold block">Дата завершения</span>
                                        {parking.ended_at
                                            ? new Date(parking.ended_at).toLocaleString()
                                            : '-'}
                                    </div>
                                    <div className="text-center">
                                        <span className="font-semibold block">Модератор</span>
                                        {parking.moderator || '-'}
                                    </div>
                                    <div className="text-center">
                                        <span className="font-semibold block">Траты команды</span>
                                        {parking.spendings_of_crew || 0} ₽
                                    </div>
                                    <div className="text-center">
                                        <Link
                                            to={`/parking/${parking.id_parking}`}
                                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                        >
                                            Просмотр
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ParkingsHistoryPage;