import React from 'react';
import TimeBoxCreator from './TimeboxCreator';
import TimeBox from './TimeBox';

class TimeBoxList extends React.Component {
  state = {
    timeboxes: [
      { id: 1, title: "Uczę się list", getTime: 25 },
      { id: 2, title: "Uczę się formularzy", getTime: 10 },
      {
        id: 3,
        title: "Uczę się komponentów niekontrolowanych",
        getTime: 50
      }
    ]
  };

  addTimebox = timebox => {
    this.setState(prevState => {
      const timeboxes = [timebox, ...prevState.timeboxes];
      return { timeboxes };
    });
  };

  handeCreate = createdTimebox => {
    this.addTimebox(createdTimebox);
  };

  removeTimebox = indexToRemove => {
    this.setState(prevState => {
      const timeboxes = prevState.timeboxes.filter(
        timebox => timebox.id != indexToRemove
      );
      return { timeboxes };
    });
  };

  updateTimeBox = (indexToUpdate, updatedTimebox) => {
    this.setState(prevState => {
      const timeboxes = prevState.timeboxes.map(timebox =>
        timebox.id === indexToUpdate ? updatedTimebox : timebox
      );
      return { timeboxes };
    });
  };

  render() {
    return (
      <>
        <TimeBoxCreator onCreate={this.handeCreate} />
        {this.state.timeboxes.map(timebox => (
          <TimeBox
            key={timebox.id}
            title={timebox.title}
            getTime={timebox.getTime}
            onDelete={() => this.removeTimebox(timebox.id)}
            onEdit={() =>
              this.updateTimeBox(timebox.id, {
                ...timebox,
                title: "Updated Timebox"
              })
            }
          />
        ))}
      </>
    );
  }
}

export { TimeBoxList };