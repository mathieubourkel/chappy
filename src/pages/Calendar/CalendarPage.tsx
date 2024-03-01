import Calendar from "../../components/Calendar/Calendar";

export default function CalendarPage() {
  
  return (
    <main className="dashboard-page sm:mx-20 mx-5 mb-40 mt-10">
      <h1 className='mb-10'>Planning des tâches</h1>
        <Calendar className={'h-auto'}/>
    </main>

  )
}
