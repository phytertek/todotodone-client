import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

const mapStateToProps = state => ({
  todo: state.todos.selected,
  path: state.router
});

const mapDispatchToProps = {};

const style = theme => ({

});

class TodoItem extends Component {
  state = { todo: {}}
  componentDidMount() {
    if (this.props.todo) this.setState({ todo: this.props.todo })
    else {
      this.props.
      this.props.apiGetItem()
    }
  }

}
