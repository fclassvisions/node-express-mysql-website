import { useEffect, useState } from "react";
import "./App.css";
import { fetchAllTickets } from "./service/ticketService";

function App() {
  const [tickets, setTickets] = useState([]);

  const getAllTickets = async () => {
    setTickets(await fetchAllTickets());
  };

  useEffect(() => {
    getAllTickets();
  }, []);

  return (
    <div className="App">
      <h1>Tickets</h1>
      {tickets.map((ticket, index) => (
        <div key={index} style={{ border: "1px solid black" }}>
          <p>{ticket.id}</p>
          <p>{ticket.summary}</p>
          <p>{ticket.priority}</p>
          <p>{ticket.status}</p>
          <p>{ticket.create_date}</p>
          <p>{ticket.update_date}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
