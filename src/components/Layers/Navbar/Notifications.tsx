/* eslint-disable @typescript-eslint/no-explicit-any */
import {Avatar,MenuItem,MenuList,Typography,} from "@material-tailwind/react";
import { faClock} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import iUser from "../../../assets/img/icon_user.png";
import {viewNotificationToBDD,} from "../../../services/api/notifications";
import { intNotification } from "../../../services/interfaces/intNotification";
import { useFetch } from "../../../hooks/useFetch";
import { ApiPathEnum } from "../../../services/enums/api.path.enum";
import { DataStatusEnum } from "../../../services/enums/data.status.enum";

export default function Notifications() {

  const {data, status, handleReload} = useFetch(`${ApiPathEnum.NOTIFS}`)

  if (status === DataStatusEnum.FIRST_FETCH) data.reverse()

  const differenceInMinute = (sendDate: string) => {
    const now = Date.now()
    const heureCrea = Number(new Date(sendDate))
    return Math.floor((now - heureCrea) / 60000);
  };

  const handleView = async (idNotification:string) => {
    await viewNotificationToBDD(idNotification);
    handleReload()
  };

  if (status == DataStatusEnum.ERRORS) return (
  <MenuList>
      <span>Failed to get the notifications data</span>
  </MenuList>
  )

  return (
    <>
    {data && <MenuList>
      {data.map((notification:intNotification) => (
        <div key={notification._id} className="flex justify-between">
            <MenuItem onClick={() => handleView(notification._id ||'')}
              className={`flex items-center gap-4 py-2 pl-2 pr-8 hover:bg-marine-100/10`}
            >
              <Avatar variant="circular" alt="tania andrew" src={iUser} />
              <div className="flex flex-col gap-1 w-[25rem]">
                <Typography
                  variant="small"
                  className="font-semibold text-marine-300"
                >
                  {notification.message}
                </Typography>
                <Typography className="flex items-center gap-1 text-sm font-medium text-brick-300">
                  <FontAwesomeIcon
                    icon={faClock}
                    className={"text-brick-300"}
                  />
                  Il y a {differenceInMinute(notification.createdAt)} minutes
                </Typography>
              </div>
              <div className={"flex gap-2 items-center pl-1"}></div>
            </MenuItem>
        </div>
      ))}
    </MenuList>}
    </>
  );
}
