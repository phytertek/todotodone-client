const initState = {
  items: {
    '1': {
      title: 'needs to be done',
      description: 'a description here',
      status: 'backlog'
    }
  }
};

export default (state = initState, { type, payload }) => state;
