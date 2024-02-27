import { Typography } from "@material-tailwind/react";

export default function ErrorFetchingData({name}:{name:string}) {
  return (
      <div className={"flex flex-col items-center justify-center"}>
        <Typography variant="h1" className={"font-extrabold text-xl"}>
          Oups..
        </Typography>
        <Typography variant="h1" className={"font-extrabold text-xl"}>
          Error with fetching data from : {name}
        </Typography>
      </div>
  );
}
