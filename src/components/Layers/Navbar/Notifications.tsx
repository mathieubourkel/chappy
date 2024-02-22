// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect, useState } from "react";
// import {Avatar,IconButton,MenuItem,MenuList,Typography,} from "@material-tailwind/react";
// import { faClock, faEye, faXmark } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import iUser from "../../../assets/img/icon_user.png";
// import {deleteNotificationFromBDD,getNotificationsByUser,viewNotificationToBDD,} from "../../../services/api/notifications";
// import { Link } from "react-router-dom";
// import { intNotification, intNotifications } from "../../../services/interfaces/intNotification";

export default function Notifications() {
  return (<div></div>)
  // const [notifications, setNotifications] = useState<intNotifications>([]);
  // const [error, setError] = useState<boolean>(false);
  // const [reload, setReload] = useState(false);

  // useEffect(() => {
  //   const getNotifs = async () => {
  //     try {
  //       const result = await getNotificationsByUser();
  //       setNotifications(result.reverse());
  //     } catch (error) {
  //       setError(true);
  //     }
  //   };

  //   getNotifs();
  // }, [reload]);

  // const handleReload = () => setReload((cur) => !cur)
  // const now = Date.now()
  // const differenceInMinute = (sendDate: string) => {
  //   const heureCrea = Number(new Date(sendDate))
  //   return Math.floor((now - heureCrea) / 60000);
  // };

  // const handleDelete = async (idNotification: string) => {
  //   await deleteNotificationFromBDD(idNotification);
  //   handleReload()
  // };

  // const handleView = async (idNotification:string, isView:boolean) => {
  //   await viewNotificationToBDD(idNotification, !isView);
  //   handleReload()
  // };

  // if (error) return <div>Failed to get notifs</div>;

  // return (
  //   <MenuList>
  //     {notifications.map((notification:intNotification) => (
  //       <div key={notification._id} className="flex justify-between">
  //         <Link to={notification.path}>
  //           <MenuItem
  //             className={`flex items-center gap-4 py-2 pl-2 pr-8 hover:bg-marine-100/10 ${
  //               notification.isView && "bg-brick-300"
  //             }`}
  //           >
  //             <Avatar variant="circular" alt="tania andrew" src={iUser} />
  //             <div className="flex flex-col gap-1 w-[25rem]">
  //               <Typography
  //                 variant="small"
  //                 className="font-semibold text-marine-300"
  //               >
  //                 {notification.content}
  //               </Typography>
  //               <Typography className="flex items-center gap-1 text-sm font-medium text-brick-300">
  //                 <FontAwesomeIcon
  //                   icon={faClock}
  //                   className={"text-brick-300"}
  //                 />
  //                 Il y a {differenceInMinute(notification.sendDate)} minutes
  //               </Typography>
  //             </div>
  //             <div className={"flex gap-2 items-center pl-1"}></div>
  //           </MenuItem>
  //         </Link>
  //         <IconButton size={"lg"} onClick={() => handleView(notification._id, notification.isView)}>
  //           <FontAwesomeIcon icon={faEye} size="sm" />
  //         </IconButton>
  //         <IconButton size={"lg"} onClick={() => handleDelete(notification._id)}>
  //           <FontAwesomeIcon icon={faXmark} size="sm" />
  //         </IconButton>
  //       </div>
  //     ))}
  //   </MenuList>
  // );
}
