import { useEffect, useState } from 'react';
import Ide from './Ide';

const App = () => {

  const [ideKey, setIdeKey] = useState(0); // only for force reload Ide

  // only for force reload Ide
  const reloadIde = () => {
    console.log('reloadIde()');
    setIdeKey(ideKey + 1);
  };

  useEffect(() => {
    // It shows a problem when we use `window.SE.ready()` (in Ide.js) and component will be re-render before SDK is ready. 
    // Before SDK is ready, we again add new function to `window.SE.ready()` (because re-render Ide component) 
    // and both functions (old one and new one) are executed. In some cases it can cause unexpected behavior.
    
    // reloadIde();
  }, []);

  return (
    <div className="App">
      <Ide key={ideKey} />
      <button onClick={reloadIde}>Reload IDE</button>
    </div>
  );
}

export default App;
