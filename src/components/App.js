import React from 'react';

import { PageTitle, TimeBoxList, EditableTimeBox } from './remainning-components';

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