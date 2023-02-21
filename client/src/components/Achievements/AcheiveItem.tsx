interface achieveProps {
  title: string,
  description: string,
  status: boolean
}

export const AcheiveItem: React.FC<achieveProps> = ({ title, description, status }) => {
  return (
    <div className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer flex flex-col p-4">
      <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">{title}</h3>
      <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">{description}</p>
      <p className="text-[#b2b3bd]">Achieved: {status ? <span className="text-[#1dc071]">Successful</span> : <span className="text-[red]">None</span>}</p>
    </div>
  )
}