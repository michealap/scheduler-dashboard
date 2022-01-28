import React, { Component } from "react";
import Loading from "components/Loading";
import Panel from "components/Panel";

import classnames from "classnames";

const data = [
  {
    id: 1,
    label: "Total Interviews",
    value: 6
  },
  {
    id: 2,
    label: "Least Popular Time Slot",
    value: "1pm"
  },
  {
    id: 3,
    label: "Most Popular Day",
    value: "Wednesday"
  },
  {
    id: 4,
    label: "Interviews Per Day",
    value: "2.3"
  }
];

class Dashboard extends Component {
  state = {
    loading: false,
    focused: null
  };
  // instance method - that can take an id and set the state of focused to the value of id. Set the value of focused back to null if the value of focused is currently set to a panel.
  selectPanel(id) {
    this.setState(prevState => ({
      focused: prevState.focused !== null ? null : id
    }))
  }
  render() {
    const dashboardClasses = classnames("dashboard", {
      "dashboard--focused": this.state.focused
     });
    const panels = data
    .filter(
      panel => this.state.focused === null || this.state.focused === panel.id
     )
    .map((panel)=> {
      return (
        <Panel
          key={panel.id}
          id={panel.id}
          label={panel.label}
          value={panel.value}
          onSelect={event => this.selectPanel(panel.id)} // use this.selectPanel because we are passing a reference to the instance method as a prop.
        />
      );
    })
    if (this.state.loading) {
      return <Loading />;
    }

    return <main className={dashboardClasses}>{panels} </main>;
  }
}

export default Dashboard;
