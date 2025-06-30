import { useMemo, type FC } from "react";
import { Route, useLocation, useNavigate, useRoutes } from "react-router-dom";

type AvatarProp = { name: string, src: string, size?: string }

const sizeMap: Record<string, string> = {
  '10': 'h-10 w-10',
  '16': 'h-16 w-16',
  '24': 'h-24 w-24',
  '32': 'h-32 w-32',
  '40': 'h-40 w-40',
  '48': 'h-48 w-48',
  // Add more sizes if needed
};

const Avtar: FC<AvatarProp> = ({ name, src, size = '16' }) => {
  const navigate = useNavigate();
  const initials = useMemo(() => name ? name.charAt(0).toUpperCase() : '?', [name]);
  const location = useLocation();
  // Use the mapped size classes
  const dimension = useMemo(() => sizeMap[size] || sizeMap['16'], [size]);
  function navigateto()
  {
    if(location.pathname !== '/MyProfile') {
      navigate('/MyProfile');
    }
  }

  return (
    <div
      onClick={() => navigateto()}
      className={`${size == '10' ? 'hidden hover:scale-105 cursor-pointer' : ''
        } sm:flex items-center justify-center rounded-full ring-2 hover:ring-orange-700 ring-orange-400 p-0.5  transition-all ease-in duration-200`}
    >
      <div className={`bg-gray-300 text-white font-bold rounded-full overflow-hidden ${dimension} flex items-center justify-center`}>
        {src ? (
          <img
            src={src}
            alt={name}
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="text-lg">{initials}</span>
        )}
      </div>
    </div>
  );
};

export default Avtar;
