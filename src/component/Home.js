import React, { useState, useEffect } from "react";
import '../App.css';

function Home() {
  const [task, setTask] = useState([]);
  const [filter, setFilter] = useState();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTask(data)
      })
      .catch(error => {
        console.error('There was an error fetching the data:', error);
      });
  }, [])


  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredTasks = task.filter(task => {
    if (filter === 'All') return true;
    if (filter === 'Incomplete') return !task.completed;
    if (filter === 'Done') return task.completed;
    return true; 
  });

  return (
    <div className="App">

      {/* <h1>{task}</> */}
      {/* <table>
          {task.map(task => (
            <td key={task.id}>{task.title}</td>
          ))}
      </table> */}

      <div className="filter-dropdown">
        <label>Filter Tasks:</label>
        <select id="filter" value={filter} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="Incomplete">Incomplete</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <table border={2}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map(task => (
            <tr key={task.id} className={task.completed ? 'done-row' : 'incomplete-row'}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              {/* <td>{task.completed ?  'Done' : 'Incomplete' }</td> */}
              <td className={task.completed ? 'done' : 'incomplete'}>
                {task.completed ? 'Done' : 'Incomplete'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;


