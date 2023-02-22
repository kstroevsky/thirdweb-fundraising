import React from "react";
import { useStateContext } from "../../context";

interface DeleteProps {
  pId: number
}

export const DeleteModal: React.FC<DeleteProps> = ({ pId }) => {
  const { deleteCampaign } = useStateContext();

  const handleOnDelete = () => {
    deleteCampaign(pId);
  }

  return (
    <div>
      <p>are you really sure?</p>
      <div>
        <button onClick={handleOnDelete}>Yes</button>
        <button>No</button>
      </div>
    </div>
  )
}