import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Navbar from "./components/Navbar.tsx";
import Breadcrumbs from "./components/Breadcrumbs.tsx";
import lirica from "./assets/LI.jpg";
import orchestra from "./assets/OR.jpeg";
import opera from "./assets/OP.jpg";
import { getApiBaseUrl } from './api.tsx';

interface Ship {
    id_ship: number;
    ship_name: string;
    class_name: string;
    description: string;
    img_url: string;
}




const mockShips: Ship[] = [
    {
        id_ship: 1, ship_name: 'LIRICA', class_name: 'Круизный лайнер',
        description: 'Круизный лайнер Lirica — современное судно на 2 000 пассажиров с 700 каютами, включая люксы и номера с балконами. На борту: рестораны с интернациональной и средиземноморской кухней, бассейны, фитнес-центр, спа и вечерние шоу. Лайнер длиной 251 метр развивает скорость до 21 узла и предлагает круизы по Средиземному морю и другим направлениям.',
        img_url: lirica
    },
    {
        id_ship: 2, ship_name: 'ORCHESTRA', class_name: 'Баржа',
        description: 'Баржа Orchestra — современное судно для грузоперевозок, рассчитанное на эффективное и безопасное перемещение товаров. С длиной 135 метров, она способна перевозить крупногабаритные грузы и контейнеры. На борту предусмотрены все необходимые условия для быстрой погрузки и разгрузки, а современные навигационные системы обеспечивают высокую точность маршрута. Orchestra идеально подходит для транспортировки по рекам и каналам, предлагая надежность и эффективность на каждом этапе пути.',
        img_url: orchestra
    },
    {
        id_ship: 3, ship_name: 'OPERA', class_name: 'Круизный лайнер',
        description: 'Круизный лайнер Opera — это элегантное судно, рассчитанное на 2 500 пассажиров и предлагающее более 850 кают, включая люксы и номера с балконами. На борту доступны рестораны с интернациональной и местной кухней, спа-салон, бассейны и спортивные зоны для активного отдыха. Гостям предлагается насыщенная развлекательная программа, включая живые выступления и вечерние шоу. Лайнер длиной 275 метров развивает скорость до 22 узлов и совершает круизы по популярным туристическим направлениям, таким как Средиземное море и Карибы',
        img_url: opera
    },
];


const ShipDescriptionPage = () => {
    const {shipId} = useParams();
    const [ship, setShip] = useState<Ship | null>(null);
    const [loading, setLoading] = useState(true); // Для отображения состояния загрузки
    const [error, setError] = useState(""); // Для обработки ошибок

    const fetchShip = async () => {
        try {


// Определяем базовый URL для API запросов

            const baseUrl = getApiBaseUrl();
            const response = await fetch(`${baseUrl}/ships/${shipId}/`);

            if (!response.ok) {
                throw new Error('Ошибка при загрузке данных');
            }

            const shipData = await response.json();
            setShip(shipData);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            // Если произошла ошибка, используем мок-данные

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const mockShip = mockShips.find(item => item.id_ship === parseInt(shipId, 10));


            if (mockShip) {


                setShip(mockShip);
            } else {
                setError('Корабль не найден');
            }
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchShip();
    }, [shipId]);

    // Обработка состояния загрузки и ошибок
    if (loading) {
        return <div className="text-center my-5">Загрузка данных кораблей...</div>;
    }

    if (error) {
        return <div className="text-danger text-center my-5">Ошибка: {error}</div>;
    }

    return (
        <div className="bg-slate-100 font-roboto min-h-screen bg-fixed">
            <div className="bg-[#060F1E]">
                <Navbar/>
            </div>

            <Breadcrumbs path={`/ships/${ship?.ship_name}`}/>

            <div className="bg-slate-100 flex justify-center mt-4">
                <img
                    className="w-1/2 h-1/4"
                    src={ship?.img_url}
                    alt={ship?.ship_name}
                />
            </div>

            <div className="font-timoxa text-black mx-36 mt-8">
                <h1 className="text-center text-blue-900 font-bold text-2xl mb-2">{ship?.ship_name}</h1>
                <p className="text-center justify-center mt-7.5">{ship?.description}</p>
            </div>
        </div>
    );
}

export default ShipDescriptionPage;