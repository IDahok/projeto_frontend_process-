import React, { Component } from "react";

interface AppState {
}

class App extends Component<{}, AppState> {
  state: AppState = {
  };

  handleRestart = (): void => {
    window.location.reload();
  };

  render() {
    return (
      <div className="main__wrap">
        <main className="container">
          <div className="card__box">
            <h1>Hello World</h1>
          </div>
        </main>
      </div>
    );
  }
}

export default App; 