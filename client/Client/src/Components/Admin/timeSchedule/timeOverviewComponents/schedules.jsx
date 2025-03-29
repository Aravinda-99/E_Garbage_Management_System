import React from 'react';
import TimeTable from './TimeTable';

const App = () => {
  const [schedules, setSchedules] = React.useState([
    { id: '1', date: '2025-03-28', time: '10:00', location: 'Downtown', wasteType: 'Organic',     status: 'pending'   },
    { id: '2', date: '2025-03-28', time: '14:00', location: 'Suburbs',  wasteType: 'Recyclable', status: 'completed' },
    { id: '3', date: '2025-03-29', time: '09:00', location: 'Downtown', wasteType: 'Hazardous',  status: 'pending'   },
    { id: '4', date: '2025-03-29', time: '12:00', location: 'Uptown',   wasteType: 'General',    status: 'pending'   },
    { id: '5', date: '2025-03-30', time: '11:00', location: 'Suburbs',  wasteType: 'Organic',    status: 'completed' },
  ]);

  const handleDelete = (schedule) => {
    setSchedules(schedules.filter((s) => s.id !== schedule.id));
  };

  const handleEdit = (updatedSchedule) => {
    setSchedules(
      schedules.map((s) => (s.id === updatedSchedule.id ? updatedSchedule : s))
    );
  };

  const handleApprove = (schedule) => {
    setSchedules(
      schedules.map((s) =>
        s.id === schedule.id ? { ...s, status: 'completed' } : s
      )
    );
  };

  return (
    <div className="p-4">
      <TimeTable
        schedules={schedules}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onApprove={handleApprove}
      />
    </div>
  );
};

export default App;