import React from "react";
import '../App.css'

const TodoItem = ({
  title,
  description,
  isCompleted,
  updateHandler,
  deleteHandler,
  id,
}) => {
  
  // const formatDate = (date) => {
  //   const options = {
  //     day: "2-digit",
  //     month: "2-digit",
  //     year: "numeric",
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     hour12: true,
  //   };

  //   const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
  //     date
  //   );
  //   return formattedDate.replace(",", " |");
  // };

  // const currentDate = new Date();
  // const date = formatDate(currentDate);

  return (
    <div className={`task ${isCompleted ? "completed-task" : ""}`}>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={() => updateHandler(id)}
      />
      <div className="task_top">
        <div className="task_top_left">
          <h3>{title}</h3>
          <div>{description}</div>
        </div>
        <div className="task_top_right">
          <i
            className="fa fa-trash fa-2x"
            aria-hidden="true"
            onClick={() => deleteHandler(id)}
          ></i>
        </div>
      </div>
      <div className="task_date_status">
        {/* <div>{date}</div> */}
        <div className={isCompleted ? "completed" : "pending"}>
          {isCompleted ? "Completed" : "Pending"}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
