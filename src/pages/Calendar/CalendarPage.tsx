import calendar from "../../../src/assets/img/calendar.webp";

export default function CalendarPage() {
  return (
      <main className={"sm:mx-20 mx-5"}>
          <h1 className={"text-center mt-10"}>Le calendrier</h1>

          <img src={calendar}  alt={"Calendrier"} className={"m-auto my-10"}/>
          
      </main>
  )
}
