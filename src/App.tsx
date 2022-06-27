import React, {useState} from 'react';
import './App.css';
import Portal from './components/Portal';
import TooltipPopover from './components/Portal/TooltipPopover';

function App() {
  const btnRef = React.createRef<any>();
  const [isOn, setOn] = useState(false); // toggles dropdown visibility
  const [coords, setCoords] = useState({});

  const updateTooltipCoords = (button: any) => {
    const rect = button.getBoundingClientRect();
    setCoords({
      left: rect.x + rect.width / 2, // add half the width of the button for centering
      top: rect.y + window.scrollY // add scrollY offset, as soon as getBountingClientRect takes on screen coords
    });
  };

  return (
    <div style={styles.card}>

      <button
        ref={btnRef}
        onClick={e => {
          updateTooltipCoords(e.target);
          setOn(!isOn);
        }}
      >
        Click me
      </button>
        
      {isOn && (
        <Portal>
          <TooltipPopover
            coords={coords}
            updateTooltipCoords={() =>
              updateTooltipCoords(btnRef?.current?.buttonNode)
            }
          >
            <div>
              Awesome content that is never cut off by its parent container, and always on top!
            </div>
          </TooltipPopover>
        </Portal>
      )}
    </div>
  );
}

const styles = {
  card: { padding: 50, maxWidth: 800, margin: "0 auto 300px",  backgroundColor: 'gray', },
  button: { display: "flex", marginLeft: "auto" }
};

export default App;
