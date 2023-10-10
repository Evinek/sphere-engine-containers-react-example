import { useState } from 'react';
import Ide from './Ide';

const App = () => {

  const [ideKey, setIdeKey] = useState(0); // only for force reload Ide

  // only for force reload Ide
  const reloadIde = () => {
    setIdeKey(ideKey + 1);
  };

  return (
    <div className="App">
      <Ide key={ideKey} />
      <button onClick={reloadIde}>Reload IDE</button>
    </div>
  );
}

export default App;
