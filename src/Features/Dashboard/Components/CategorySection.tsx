import { Smartphone, Car, Bike, Tv, Plug } from 'lucide-react';

const categories = [
  { name: 'SmartPhone', icon: Smartphone },
  { name: 'Car', icon: Car },
  { name: 'Bike', icon: Bike },
  { name: 'SmartTV', icon: Tv },
  { name: 'Electronic', icon: Plug },
];

function CategorySection() {
  return (
    <div className="p-10 bg-white shadow-md mt-4 rounded-lg">
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">Browse Categories</h2>

      <div className="flex gap-3 overflow-x-auto whitespace-nowrap pb-1 no-scrollbar">
        {categories.map((category, idx) => {
          const Icon = category.icon;
          return (
            <div
              key={idx}
              className="min-w-[100px] sm:min-w-[110px] flex-shrink-0 flex flex-col items-center justify-center bg-orange-50 border border-orange-100 px-3 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:bg-orange-100"
            >
              <div className="bg-orange-100 text-orange-500 p-2 sm:p-2.5 rounded-full mb-1 shadow-sm">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <p className="text-[10px] sm:text-xs font-medium text-gray-700 text-center">{category.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategorySection;
