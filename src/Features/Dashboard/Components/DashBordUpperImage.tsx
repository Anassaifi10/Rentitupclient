import dashbordbackgrounimage from '../../../assets/DeshbordImage.jpg';
import TypingText from './TypingText';

function DashBordUpperImage() {
    return (
        <div
            className="relative bg-cover bg-center w-full h-40 sm:h-96"
            style={{ backgroundImage: `url(${dashbordbackgrounimage})` }}
        >
            <div className="flex md:flex-col gap-4 items-center justify-center h-full md:w-8/12 w-full text-center ">
                <h1 className="text-white text-xl sm:text-5xl font-bold drop-shadow-lg leading-tight ">
                    Rent <span className="text-orange-400">Anything</span> Anytime
                </h1>
                <TypingText text="From gadgets to vehicles,Flexible daily rentals" className="hidden md:inline-flex text-white text-lg sm:text-2xl  drop-shadow-md" />




                <div className=" text-white text-[10px] lg:text-sm sm:text-xs mt-2 opacity-70 absolute bottom-0">
                    No commitments. No hidden fees. Just what you need — when you need it.
                </div>
            </div>

        </div>
    )
}

export default DashBordUpperImage