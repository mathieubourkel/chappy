import { Typography } from "@material-tailwind/react";

type Props = {
    name:string
}

export default function ErrorFetchingData({name}:Props) {
  return (
    <main className={"lg:flex gap-5 justify-center items-center"}>
      <div className={"flex flex-col items-center justify-center"}>
        <Typography variant="h1" className={"font-extrabold text-xl"}>
          Oups..
        </Typography>
        <Typography variant="h1" className={"font-extrabold text-xl"}>
          Error with fetching the {name} data
        </Typography>
      </div>
    </main>
  );
}
