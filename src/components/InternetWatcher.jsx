import React from 'react';
import { OnlineContex } from '../contexts/OnlineContext';

export class InternetWatcher extends React.Component {
  state = {
    isOnline: true,
  };

  handleOnline = () => {
    this.setState({
      isOnline: true,
    });
  };

  handleOfline = () => {
    this.setState({
      isOnline: false,
    });
  };

  componentDidMount() {
    if (window) {
      window.addEventListener('online', this.handleOnline);
      window.addEventListener('offline', this.handleOfline);
    }
  }

  componentWillUnmount() {
    if (window) {
      window.removeEventListener('online', this.handleOnline);
      window.removeEventListener('offline', this.handleOfline);
    }
  }

  render() {
    const { children } = this.props;
    const { isOnline } = this.state;
    return (
      <OnlineContex.Provider value={isOnline}>
        <OnlineContex.Consumer>{children}</OnlineContex.Consumer>
      </OnlineContex.Provider>
    );
  }
}
