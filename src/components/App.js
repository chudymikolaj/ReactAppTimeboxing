import React from 'react';

import PageTitle from './PageTitle';
import EditableTimeBox from './EditableTimebox';
import TimeBoxList from './TimeboxList';

function App() {
  return (
    <div className="app">
      <PageTitle />
      <TimeBoxList />
      <EditableTimeBox />
    </div>
  );
}

export default App;