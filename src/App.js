import React from 'react';
import ClassComponent from './components/classes/ClassComponent';
import HooksComponent from './components/hooks/HooksComponent';

class App extends React.Component {
    render() {
        return (
            <div className="app-container">
                <ClassComponent/>
                <HooksComponent/>
            </div>
        );
    }
}

export default App;
