const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchAllTickets = async () => {
  const rawResponse = await fetch(`${BASE_URL}/all`);
  return await rawResponse.json();
};

export const fetchTicket = async (id) => {
  const rawResponse = await fetch(`${BASE_URL}/ticket/${id}`);
  return await rawResponse.json();
};

export const createTicket = async (ticket) => {
  const rawResponse = await fetch(`${BASE_URL}/ticket`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(ticket),
  });
  return await rawResponse.json();
};

export const updateTicket = async (id, ticket) => {
  if (ticket.id) {
    delete ticket.id;
  }
  const rawResponse = await fetch(`${BASE_URL}/ticket/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(ticket),
  });
  return await rawResponse.json();
};

export const deleteTicket = async (id) => {
  const rawResponse = await fetch(`${BASE_URL}/ticket/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return await rawResponse.json();
};
