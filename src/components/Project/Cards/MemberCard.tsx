import { Typography } from "@material-tailwind/react";
import DeleteButton from "../Buttons/DeleteButton";
import { intMembers } from "../../../services/interfaces/intProject";

type Props = {
  index: number;
  setMember: (members: intMembers) => void;
  members: intMembers
  isOwner:boolean
};

export default function MemberCard({ index, setMember, members, isOwner }: Props) {
  return (
    <>
      <li
        className="flex justify-between gap-5
          p-5 rounded-xl bg-white border-solid border-4 border-b-brick-200"
      >
        <Typography variant="h5" color="blue-gray" className="flex">
          <p className="border p-2 rounded-xl bg-light-200">
            {members[index].company}
          </p>
        </Typography>
        <Typography
          variant="h5"
          color="blue-gray"
          className="p-2 text-brick-300"
        >
          {members[index].name}
        </Typography>
        {isOwner && 
        <DeleteButton index={index} state={members} setState={setMember} />}
      </li>
    </>
  );
}
