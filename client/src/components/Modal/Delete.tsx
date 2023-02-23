import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../context";
import Loader from "../Loader";

interface DeleteProps {
  pId: number,
  handleOnClose: () => void
}

export const DeleteModal: React.FC<DeleteProps> = ({ pId, handleOnClose }) => {
  const { deleteCampaign } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleOnDelete = async () => {
    setIsLoading(true);
    await deleteCampaign(pId);

    handleOnClose()
    setIsLoading(false);

    navigate('/');
  }

  return (
    <div>
      {isLoading && <Loader />}
      <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
        <p className="mt-[20px] font-epilogue font-bold text-[20px] text-white text-center">are you really sure?</p>
        <div className="flex gap-[20px]">
          <button className="font-epilogue font-bold text-[20px] text-white" onClick={handleOnDelete}>Yes</button>
          <button onClick={handleOnClose} className="font-epilogue font-bold text-[20px] text-white">Close</button>
        </div>
      </div>
    </div>
  )
}