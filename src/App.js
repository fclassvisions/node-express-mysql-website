import { useEffect, useState } from "react";
import "./App.css";
import {
  createTicket,
  deleteTicket,
  fetchAllTickets,
  updateTicket,
} from "./service/ticketService";
import TicketForm from "./components/TicketForm/TicketForm";
import { formatDate } from "./util/dateUtil";
import Table from "./components/Table/Table";

const COLS = [
  "id",
  "summary",
  "priority",
  "status",
  "create_date",
  "update_date",
];

function App() {
  const [tickets, setTickets] = useState([]);
  const [currentTicket, setCurrentTicket] = useState({});

  const loadTicket = (ticket) => {
    setCurrentTicket(ticket);
  };

  const unloadTicket = () => {
    setCurrentTicket({});
  };

  const getAllTickets = async () => {
    setTickets(await fetchAllTickets());
  };

  const sendSaveRequest = async (
    id,
    summary,
    priority,
    status,
    create_date,
    update_date
  ) => {
    const newTicket = {
      id,
      summary,
      priority,
      status,
      create_date: formatDate(new Date(create_date)),
      update_date: formatDate(new Date(update_date)),
    };

    const savedTicket = id
      ? await updateTicket(id, newTicket)
      : await createTicket(newTicket);

    if (!savedTicket) {
      return;
    }

    getAllTickets();
    setCurrentTicket(savedTicket);
  };

  const sendDeleteRequest = async (ticket) => {
    if (!ticket?.id) {
      return;
    }

    const result = await deleteTicket(ticket.id);
    if (!result) {
      return;
    }

    getAllTickets();
    setCurrentTicket({});
  };

  useEffect(() => {
    getAllTickets();
  }, []);

  return (
    <div className="App">
      <div className="main-table">
        <h2 className="title">Tickets</h2>
        <Table
          list={tickets}
          colNames={COLS}
          onSelect={loadTicket}
          onDelete={sendDeleteRequest}
        />
      </div>
      <div className="main-form">
        <h2 className="title">Modify Ticket</h2>
        <TicketForm
          id={currentTicket.id}
          summary={currentTicket.summary}
          priority={currentTicket.priority}
          status={currentTicket.status}
          createDate={
            currentTicket.create_date
              ? new Date(currentTicket.create_date)
              : new Date()
          }
          updateDate={
            currentTicket.update_date
              ? new Date(currentTicket.update_date)
              : new Date()
          }
          readonly={false}
          onSubmit={sendSaveRequest}
          onClear={unloadTicket}
        />
      </div>
    </div>
  );
}

export default App;
