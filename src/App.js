import React from 'react';
import ClassComponent from "./components/ClassComponent";
import HooksComponent from "./components/HooksComponent";

class App extends React.Component {
    render() {
        return (
            <div className="app-container">
                <ClassComponent />
                <HooksComponent />
            </div>
        );
    }
}

export default App;
