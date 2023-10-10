import React, { useState } from 'react';
import './App.css';
import shortid from 'shortid';
import { Form } from './engine/Common.js';
import { Table } from './engine/Common.js';


function App() {
  const [tableData, setTableData ] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editModeData, setEditModeData] = useState({});

  const handleSubmit = (e, currentData) => {
    e.preventDefault();
    setTableData(prevData => {

      const containsCurrentDate = Boolean(prevData.filter(row => row.date === currentData.date).length);

      if (containsCurrentDate) {
        const newData = prevData.map(row => {
          if (currentData.date === row.date) {
            if (editMode) {
              return {...row, date: currentData.date, km: currentData.km}
            }
            return {...row, km: parseInt(row.km) + parseInt(currentData.km)}
          }
          return {...row}
        });

        return newData;
      }
      return [...prevData, {...currentData, id: shortid.generate()}]
    })
  };

  const handleDelete = (e, id) => {
    setTableData(prevData => {
      return prevData.filter(row => row.id !== id);
    })
  }

  const handleEdit = (e, id) => {
    e.preventDefault();
    if (!editMode) {
      setEditModeData(tableData.filter(row => row.id === id)[0]);
    }
    setEditMode(prevEditMode => !prevEditMode);
  }

  return (
    <div className="App">
      <Form 
      handleSubmit={handleSubmit}
      editModeData={editModeData}
      />
      <Table 
      tableData={tableData} 
      handleDelete={handleDelete} 
      handleEdit={handleEdit} 
      />
    </div>
  );
}

export { App };
