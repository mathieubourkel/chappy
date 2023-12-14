/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { intNotifications } from "../../../services/interfaces/intProject";
import {
  Avatar,
  IconButton,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { faClock, faEye, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import iUser from "../../../assets/img/icon_user.png";
import {
  deleteNotificationFromBDD,
  getNotificationsByUser,
  modifyNotificationToBDD,
} from "../../../services/api/notifications";
import { Link } from "react-router-dom";

export default function Notifications() {
  const [notifications, setNotifications] = useState<intNotifications>([]);
  const idUser = localStorage.getItem("id");

  useEffect(() => {
    const getNotifs = async () => {
      const result = await getNotificationsByUser(idUser);
      setNotifications(result.reverse());
    };

    getNotifs();
  }, [idUser]);

  const now = Date.now();
  const differenceInMinute = (heureCrea: number) => {
    return Math.floor((now - heureCrea) / 60000);
  };

  const handleDelete = (index: number) => {
    const tempNotifs = [...notifications];
    tempNotifs.splice(index, 1);
    deleteNotificationFromBDD(notifications[index].id);
    setNotifications(tempNotifs);
  };

  const handleView = (index: number) => {
    const newNotif = {
      ...notifications[index],
      isView: !notifications[index].isView,
    };
    const newArrayNotifs = [...notifications];
    newArrayNotifs[index].isView = !notifications[index].isView;
    modifyNotificationToBDD(notifications[index].id, newNotif);
    setNotifications(newArrayNotifs);
  };
  console.log(notifications);
  return (
    <MenuList>
      {notifications.map((notification, index: number) => (
        <div key={notification.id} className='flex justify-between'>
          <Link to={notification.path}>
            <MenuItem
              className={`flex items-center gap-4 py-2 pl-2 pr-8 hover:bg-marine-100/75 ${
                notification.isView && "bg-brick-300"
              }`}
            >
              <Avatar variant="circular" alt="tania andrew" src={iUser} />
              <div className="flex flex-col gap-1">
                <Typography
                  variant="small"
                  className="font-semibold text-marine-300"
                >
                  {notification.sender.firstName} {notification.content}
                </Typography>
                <Typography className="flex items-center gap-1 text-sm font-medium text-brick-300">
                  <FontAwesomeIcon
                    icon={faClock}
                    className={"text-brick-300"}
                  />
                  Il y a {differenceInMinute(notification.timestamp)} minutes
                </Typography>
              </div>
            </MenuItem>
          </Link>
          <div>
          <IconButton onClick={() => handleView(index)}>
            <FontAwesomeIcon icon={faEye} size="xl" />
          </IconButton>
          <IconButton onClick={() => handleDelete(index)}>
            <FontAwesomeIcon icon={faXmark} size="xl" />
          </IconButton>
          </div>
         
        </div>
      ))}
    </MenuList>
  );
}
