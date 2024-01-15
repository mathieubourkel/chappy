import { useParams } from "react-router-dom";
import {
  Avatar,
  Card, CardBody,
  Typography
} from "@material-tailwind/react";
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

      <Card
          className={`w-full custom-card-user mb-5`}
      >
        <CardBody
            className={"custom-card-body flex md:justify-between justify-center items-center flex-wrap"}>
          <div className={"flex flex-wrap md:justify-start md:mb-0 mb-10"}>
            <Avatar variant="circular"
                    alt="toto"
                    className={"border border-brick-300 shadow-xl shadow-brick-300/20 ring-4 ring-brick-300"}
                    src={user}/>

            {member.company?.name && <div className="border p-1 rounded-xl bg-light-200 m-2 text-sm text-marine-300 font-bold ml-5 uppercase">{member.company?.name}</div> }
            <Typography
                variant="h5"
                className="ml-3 p-2 text-marine-300 font-extrabold"
            >
              {member.firstname} {member.lastname}
            </Typography>
          </div>

          <div className="flex gap-5 justify-end">
            <Typography
                variant="h5"
                className="p-2 px-5 text-brick-300 border border-brick-300 text-sm rounded-xl">
              7 tâches en cours
            </Typography>
            {isOwner && <DeleteButton
                handleDeleteBDD={handleDelete}/>}
          </div>
        </CardBody>

      </Card>

  );
}
