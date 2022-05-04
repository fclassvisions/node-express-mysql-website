import { useEffect, useState } from "react";
import "./App.css";
import { createTicket, fetchAllTickets } from "./service/ticketService";
import TicketForm from "./components/TicketForm/TicketForm";

function App() {
  const [tickets, setTickets] = useState([]);
  const [ticket, setTicket] = useState({});

  const getAllTickets = async () => {
    setTickets(await fetchAllTickets());
  };

  const sendCreateRequest = async (
    id,
    summary,
    priority,
    status,
    create_date,
    update_date
  ) => {
    const createdTicket = await createTicket({
      id,
      summary,
      priority,
      status,
      create_date,
      update_date,
    });

    if (!createdTicket) {
      return;
    }

    getAllTickets();
    setTicket(createdTicket);
  };

  useEffect(() => {
    getAllTickets();
  }, []);

  return (
    <div className="App">
      <TicketForm
        id={ticket.id}
        summary={ticket.summary}
        priority={ticket.priority}
        status={ticket.status}
        createDate={
          ticket.create_date ? new Date(ticket.create_date) : new Date()
        }
        updateDate={
          ticket.update_date ? new Date(ticket.update_date) : new Date()
        }
        readonly={false}
        onSubmit={sendCreateRequest}
      />
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
