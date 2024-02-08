import { Alert } from "@material-tailwind/react";
import { useState } from "react";

type Props = {
  popUp: string[];
};
export function Popup({ popUp }: Props) {
  const [open, setOpen] = useState(true);

  return (
    <div className="popup">
      {popUp.map((i: string, index: number) => (
        <Alert className='m-1' key={index} open={open} onClose={() => setOpen(false)}>
          {i}
        </Alert>
      ))}
    </div>
  );
}
