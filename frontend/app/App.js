import React, {Component} from 'react';
import update from 'react-addons-update';
import _ from 'lodash';
import request from 'superagent';

import Task from './Task';

const BACKEND_BASE_URL = 'http://localhost:3000';

export default class App extends Component {
	constructor(props) {
		super(props);
    this.state = {
      hideCompleted: false,
      tasks: [],
    };
    this.handleSubmit = ::this.handleSubmit;
    this.toggleHideCompleted = ::this.toggleHideCompleted;
    this.getIncompleteCount = ::this.getIncompleteCount;
	}

	componentDidMount() {
		request
			.get(`${BACKEND_BASE_URL}/todos`)
			.end((err, res) => {
				if (res.ok) {
					this.setState({ tasks: res.body });
				}
			});
	}

  handleSubmit(event) {
    event.preventDefault();

    const { tasks } = this.state;
    const text = this.refs.textInput.value.trim();
    const newTask = { text, checked: false };
		request
			.post(`${BACKEND_BASE_URL}/todos`)
			.send({ text, checked: false })
			.end((err, res) => {
				if (res.ok) {
					this.setState({ tasks: tasks.concat([res.body]) });
				}
			});
    this.refs.textInput.value = '';
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  deleteTask(task) {
    const { tasks } = this.state;
		request
			.del(`${BACKEND_BASE_URL}/todos/${task.id}`)
			.end((err, res) => {
				if (res.ok && res.body.success) {
			    this.setState({ tasks: _.without(tasks, task) });
				}
			});
  }

  toggleChecked(task) {
    const { tasks } = this.state;
		request
			.put(`${BACKEND_BASE_URL}/todos/${task.id}`)
			.send({ text: task.text, checked: !task.checked })
			.end((err, res) => {
				if (res.ok) {
					this.setState({
			      tasks: update(tasks, { [_.findIndex(tasks, task)]: { $merge: res.body } })
			    });
				}
			});
  }

  getIncompleteCount() {
    return this.state.tasks.filter((t) => !t.checked).length;
  }

  renderTasks() {
    const { hideCompleted, tasks } = this.state;
    let filteredTasks = tasks.slice(0);
    if (hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filteredTasks.map((task) => {
      return (
        <Task
          key={task.id}
          task={task}
          deleteTask={this.deleteTask.bind(this, task)}
          toggleChecked={this.toggleChecked.bind(this, task)}
        />
      );
    });
  }

  render() {
    const { hideCompleted, tasks } = this.state;
    return (
      <div className="container">
        <header>
          <h1>Todo List ({this.getIncompleteCount()})</h1>

          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={hideCompleted}
              onClick={this.toggleHideCompleted}
            />
            Hide Completed Tasks
          </label>
          <form className="new-task" onSubmit={this.handleSubmit} >
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new tasks"
            />
          </form>
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}
