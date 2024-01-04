import { useParams } from "react-router-dom";
import { Avatar, Typography } from "@material-tailwind/react";
import DeleteButton from "../elements/Buttons/DeleteButton";
import { intUser, intUsers } from "../../../services/interfaces/intProject";
import user from "../../../assets/img/icon_user.png";
import { deleteUserToProjectToBDD } from "../../../services/api/users";

type Props = {
  isOwner: boolean;
  member: intUser;
  members: intUsers;
  setMember: (members: intUsers) => void;
  index: number;
};

export default function MemberCard({ member, isOwner }: Props) {
  console.log("MemberCardComposant");
  const { idProject } = useParams();

  const handleDelete = () => {
    deleteUserToProjectToBDD(idProject, member.id);
  };
  return (
    <>
      <li
        className="md:flex justify-between gap-5
          p-5 rounded-xl bg-white border-solid border-4 border-b-brick-200 mb-5"
      >
        <div className="sm:flex gap-10">
          <Avatar variant="circular" alt="toto" src={user} />
          <Typography variant="h5" color="blue-gray" className="flex">
            <p className="border p-2 rounded-xl bg-light-200">{member.email}</p>
          </Typography>
          <Typography
            variant="h5"
            color="blue-gray"
            className="p-2 text-brick-300 font-bold"
          >
            {member.firstName} {member.lastName}
          </Typography>
        </div>
        <div className="flex gap-10">
          <Typography
            variant="h5"
            color="blue-gray"
            className="p-2 text-brick-300 border border-brick-300 rounded-xl"         >
            7 tâches en cours
          </Typography>
          {isOwner && <DeleteButton handleDeleteBDD={handleDelete} />}
        </div>
      </li>
    </>
  );
}
