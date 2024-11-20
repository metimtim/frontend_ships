import React from 'react';
import {Link} from 'react-router-dom';

interface BreadcrumbsProps {
    path: string;
}

interface PathNames {
    [key: string]: string;
}


const Breadcrumbs: React.FC<BreadcrumbsProps> = ({path}) => {
    const paths = path.split('/').filter(Boolean);

    // Соответствие между путями и их читаемыми именами
    const pathNames: PathNames = {
        ships: 'Услуги',
        // Добавьте другие соответствия по мере необходимости
    };

    return (
        <nav className="bg-slate-100 flex items-center space-x-2 text-white ml-8 mt-5 font-roboto text-lg">
            <Link to="/" className="text-gray-400 hover:text-gray-600">
                Главная
            </Link>
            {paths.map((segment, index) => (
                <React.Fragment key={index}>
                    <span className="text-gray-400">/</span>
                    {index === paths.length - 1 ? (
                        <span className="text-gray-600">
                            {pathNames[segment] || segment}
                        </span>
                    ) : (
                        <Link
                            to={`/${paths.slice(0, index + 1).join('/')}`}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            {pathNames[segment] || segment}
                        </Link>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
};

export default Breadcrumbs;
