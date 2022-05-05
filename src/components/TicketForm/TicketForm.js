import React, { useEffect, useState } from "react";
import { formatDate } from "../../util/dateUtil";

function TicketForm({
  id = "",
  summary,
  priority,
  status,
  createDate = new Date(),
  updateDate = new Date(),
  readonly = false,
  onSubmit = () => {},
}) {
  const [tSummary, setTSummary] = useState(summary);
  const [tPriority, setTPriority] = useState(priority);
  const [tStatus, setTStatus] = useState(status);

  useEffect(() => {
    setTSummary(summary);
    setTPriority(priority || "LOW");
    setTStatus(status || "CREATED");
  }, [id]);

  return (
    <div className="TicketForm">
      <div className="form">
        <label htmlFor="id">ID</label>
        <input type="number" value={id} name="id" disabled />
        <label htmlFor="summary">Summary</label>
        <input
          type="text"
          name="summary"
          value={tSummary}
          onChange={(e) => setTSummary(e.target.value)}
          disabled={readonly}
        />
        <label htmlFor="priority">Priority</label>
        <select
          name="priority"
          value={tPriority}
          onChange={(e) => setTPriority(e.target.value)}
          disabled={readonly}
        >
          <option>LOW</option>
          <option>MEDIUM</option>
          <option>HIGH</option>
        </select>
        <label htmlFor="status">Status</label>
        <select
          name="status"
          value={tStatus}
          onChange={(e) => setTStatus(e.target.value)}
          disabled={readonly}
        >
          <option>CREATED</option>
          <option>REJECTED</option>
          <option>IN PROGRESS</option>
          <option>COMPLETED</option>
        </select>
        <label htmlFor="createDate">Create Date</label>
        <input
          type="date"
          value={formatDate(createDate)}
          name="createDate"
          disabled
        />
        <label htmlFor="updateDate">Create Date</label>
        <input
          type="date"
          value={formatDate(updateDate)}
          name="updateDate"
          disabled
        />
        <button
          onClick={() => {
            onSubmit(id, tSummary, tPriority, tStatus, createDate, updateDate);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default TicketForm;
