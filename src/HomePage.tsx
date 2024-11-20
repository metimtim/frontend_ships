import Navbar from "./components/Navbar.tsx";


function HomePage() {
    return (
        <div className="w-full h-screen bg-cover bg-center bg-background flex flex-col">
            {/* Header */}
            <Navbar/>

            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
                <h2 className="shadow-amber-400 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-400 text-4xl font-bold mb-4">
                    Tim Cruise
                </h2>
                <p className="text-neutral-700 mb-6 max-w-md font-medium">
                    Встаньте за штурвал белоснежного небольшого, но современного катера для самостоятельного катания без капитана или возьмите в аренду роскошный и комфортный катер для прогулок с капитаном.
                </p>
                <div className="space-x-4">


                </div>
            </main>
        </div>
    );
}

export default HomePage;