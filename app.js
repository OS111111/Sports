// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

const mockData = [
  {
    id: 1,
    event_name: "Butterfly 100M",
    event_category: "Swimming",
    start_time: "2022-12-17 13:00:00",
    end_time: "2022-12-17 14:00:00"
  },
  {
    id: 2,
    event_name: "Backstroke 100M",
    event_category: "Swimming",
    start_time: "2022-12-17 13:30:00",
    end_time: "2022-12-17 14:30:00"
  },
  // Add the rest of the mock data here...
];

function App() {
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);

  useEffect(() => {
    // Load events from mock data
    setEvents(mockData);

    // Load selected events from localStorage
    const savedSelectedEvents = JSON.parse(localStorage.getItem('selectedEvents')) || [];
    setSelectedEvents(savedSelectedEvents);
  }, []);

  useEffect(() => {
    // Save selected events to localStorage
    localStorage.setItem('selectedEvents', JSON.stringify(selectedEvents));
  }, [selectedEvents]);

  const checkTimeConflict = (event) => {
    return selectedEvents.some(selectedEvent => 
      (new Date(event.start_time) < new Date(selectedEvent.end_time) &&
       new Date(event.end_time) > new Date(selectedEvent.start_time))
    );
  };

  const handleSelectEvent = (event) => {
    if (selectedEvents.length >= 3) {
      alert("You can only select up to 3 events.");
      return;
    }

    if (checkTimeConflict(event)) {
      alert("This event conflicts with another selected event.");
      return;
    }

    setSelectedEvents([...selectedEvents, event]);
  };

  const handleDeselectEvent = (eventId) => {
    setSelectedEvents(selectedEvents.filter(event => event.id !== eventId));
  };

  return (
    <div className="app">
      <div className="events-list">
        <h2>All Events</h2>
        {events.map(event => (
          <div key={event.id} className="event-card">
            <h3>{event.event_name}</h3>
            <p>{event.event_category}</p>
            <p>{new Date(event.start_time).toLocaleString()} - {new Date(event.end_time).toLocaleString()}</p>
            <button onClick={() => handleSelectEvent(event)}>Select</button>
          </div>
        ))}
      </div>

      <div className="selected-events">
        <h2>Selected Events</h2>
        {selectedEvents.map(event => (
          <div key={event.id} className="event-card">
            <h3>{event.event_name}</h3>
            <p>{event.event_category}</p>
            <p>{new Date(event.start_time).toLocaleString()} - {new Date(event.end_time).toLocaleString()}</p>
            <button onClick={() => handleDeselectEvent(event.id)}>Deselect</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;


