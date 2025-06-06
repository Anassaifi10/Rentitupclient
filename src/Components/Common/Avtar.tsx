
function Avtar({ name, src, size = '16' }:{name:string,src:string,size?:string}) {

     const initials = name ? name.charAt(0).toUpperCase() : '?';
  const dimension = `w-${size} h-${size}`;
  return (
     <div className="hidden sm:inline-flex items-center justify-center rounded-full ring-2 ring-blue-500  hover:ring-orange-500 p-0.5 cursor-pointer hover:scale-105 transition-all ease-in duration-200">
  <div className={`bg-gray-300 text-white font-bold rounded-full overflow-hidden  ${dimension} flex items-center justify-center`}>
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

  )
}

export default Avtar