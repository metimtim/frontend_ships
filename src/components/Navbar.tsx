import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header className="text-white py-4 px-6 flex justify-between items-center font-roboto">
            <div className="flex items-center space-x-4">
                <Link to="/" className="text-xl font-semibold flex items-center gap-2">
                    <div className="w-12 h-12">
                        <img className="border rounded-2xl" src="/logo.png" alt="logo"/>
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
                <Link to="#requests" className="pointer-events-none hover:text-gray-300">
                    Заявки
                </Link>
            </nav>
        </header>
    )
};

export default Navbar;