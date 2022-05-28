import React, { useState } from "react";

const btnStyle = {
  backgroundColor: "black",
  color: "white",
  border: "none",
  padding: "5px 10px",
};

function Table({
  list,
  colNames,
  pageNum = 0,
  pageSize = 10,
  width = "auto",
  height = "auto",
  onSelect = null,
  onDelete = null,
}) {
  const [page, setPage] = useState(pageNum);

  const onBack = () => {
    setPage(page - 1 > -1 ? page - 1 : page);
  };

  const onNext = () => {
    setPage(page + 1 < list.length / pageSize ? page + 1 : page);
  };

  return (
    <div style={{ width: width, boxShadow: "3px 6px 3px #ccc" }}>
      {list.length > 0 && (
        <table
          cellSpacing="0"
          style={{ width: "100%", height: height, padding: "5px 10px" }}
        >
          <thead style={{ backgroundColor: "black", color: "white" }}>
            <tr>
              {colNames.map((headerItem, index) => (
                <th key={index}>{headerItem.toUpperCase()}</th>
              ))}
              {onDelete && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {Object.values(
              list.slice(pageSize * page, pageSize * page + pageSize)
            ).map((obj, index) => (
              <tr key={index}>
                {Object.values(obj).map((value, index2) => (
                  <td key={index2} onClick={() => onSelect(obj)}>
                    {value}
                  </td>
                ))}
                {onDelete && (
                  <td>
                    <button className="button" onClick={() => onDelete(obj)}>
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={colNames.length} style={{ padding: "10px 0" }}>
                <button style={btnStyle} onClick={onBack}>
                  Back
                </button>
                <label style={{ padding: "0 1em" }}>{page + 1}</label>
                <button style={btnStyle} onClick={onNext}>
                  Next
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
}

export default Table;
