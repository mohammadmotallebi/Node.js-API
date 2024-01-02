import React from 'react';
import './App.css';


function App() {

    const setTitle = (title: string) => {
        document.title = title
    }
    React.useEffect(() => {
        setTitle('FastJoo')
    }, [])
    return (


        <div className="App">

        </div>

    );
}

export default App;
