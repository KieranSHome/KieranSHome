import React, { useState } from 'react';

/**
 * PackingListApp
 * ---------------
 * This component allows the user to input their weekly schedule and generates
 * a packing list. Each list item can be checked off when packed. A section is
 * also provided for optional packing images/diagrams.
 */
function PackingListApp() {
  // Track the schedule inputs from the user.
  const [schedule, setSchedule] = useState({
    officeDays: 0,
    gymSessions: 0,
    nightsAtMum: 0,
  });

  // The generated packing list items, each with a label and quantity.
  const [packingList, setPackingList] = useState([]);

  // Toggle whether an item has been packed.
  const togglePacked = (index) => {
    setPackingList((items) =>
      items.map((item, i) =>
        i === index ? { ...item, packed: !item.packed } : item
      )
    );
  };

  // Update the local schedule state when the user edits a field.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchedule((s) => ({ ...s, [name]: parseInt(value || '0', 10) }));
  };

  // Generate a new packing list based on the current schedule.
  const handleGenerate = () => {
    const { officeDays, gymSessions, nightsAtMum } = schedule;

    // Helper function to push an item with quantity
    const addItem = (items, label, quantity) => {
      if (quantity > 0) items.push({ label, quantity, packed: false });
    };

    const items = [];

    // Laptop bag contents (always packed once)
    addItem(items, 'Laptop', 1);
    addItem(items, 'Laptop charger', 1);
    addItem(items, 'Headset', 1);
    addItem(items, 'Notebook', 1);
    addItem(items, 'Phone', 1);
    addItem(items, 'Apple Watch', 1);
    addItem(items, 'Battery bank', 1);
    addItem(items, 'Phone/Watch chargers', 1);

    // Clothes
    addItem(items, 'Shirt (casual office wear)', officeDays);
    addItem(items, 'Trousers', officeDays);
    addItem(items, 'Gym top', gymSessions);
    addItem(items, 'Gym shorts', gymSessions);

    const totalDays = officeDays + nightsAtMum;
    addItem(items, 'Underwear', totalDays);
    addItem(items, 'Socks', totalDays);

    addItem(items, 'Pyjamas', nightsAtMum);
    addItem(items, 'Casual clothes for relaxing', nightsAtMum);
    addItem(items, 'Lightweight jacket', 1);

    // Toiletries (all grouped together in a toiletries bag)
    addItem(items, 'Toiletries bag (toothbrush, toothpaste, deodorant, razor, shampoo, skincare)', 1);

    setPackingList(items);
  };

  return (
    <div className="packing-app">
      <h1>Packing List Generator</h1>

      {/* Input form for the weekly schedule */}
      <div className="schedule-form">
        <h2>Weekly Schedule</h2>
        <label>
          Office days:
          <input
            type="number"
            name="officeDays"
            min="0"
            value={schedule.officeDays}
            onChange={handleChange}
          />
        </label>
        <label>
          Gym sessions:
          <input
            type="number"
            name="gymSessions"
            min="0"
            value={schedule.gymSessions}
            onChange={handleChange}
          />
        </label>
        <label>
          Nights at mum's:
          <input
            type="number"
            name="nightsAtMum"
            min="0"
            value={schedule.nightsAtMum}
            onChange={handleChange}
          />
        </label>
        <button onClick={handleGenerate}>Generate List</button>
      </div>

      {/* Packing list display */}
      <div className="packing-list">
        <h2>Packing List</h2>
        {packingList.length === 0 && <p>No items yet. Fill out the schedule and generate a list.</p>}
        <ul>
          {packingList.map((item, index) => (
            <li key={index}>
              <label>
                <input
                  type="checkbox"
                  checked={item.packed}
                  onChange={() => togglePacked(index)}
                />
                {item.label} &ndash; {item.quantity}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Placeholder for optional visual diagrams or images */}
      <div className="packing-images">
        <h2>Packing Suggestions</h2>
        <p>Add your own diagrams or images here to illustrate how best to pack.</p>
        <img
          src="https://via.placeholder.com/150"
          alt="Example diagram"
        />
      </div>
    </div>
  );
}

export default PackingListApp;
