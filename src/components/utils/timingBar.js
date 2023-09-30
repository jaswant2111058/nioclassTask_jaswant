
import "./style.css"
import { useData } from "../contextHooks/DataContext";
import { useState, useEffect } from 'react';

const TimingBar = () => {

   const {selectQues} = useData(); 
  const [progress, setProgress] = useState(0);
  const duration =selectQues.length*1000*60 
  const [countdown, setCountdown] = useState(selectQues.length*60);
  
  useEffect(() => {
    let interval;
    
    if (progress < 100) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress < 100) {
            return prevProgress + 1;
          } else {
            clearInterval(interval);
            return 100;
          }
        });
      }, (duration / 100));
    }

    return () => clearInterval(interval);
  }, [progress, duration]);

  useEffect(() => {
    // Exit the countdown when it reaches 0
    if (countdown === 0) {
      // You can perform some action here when the countdown reaches 0
      console.log("Countdown reached 0");
      return;
    }

    // Update the countdown every second
    const timer = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, [countdown]);


  return (
    <>
    <div className="timing-bar">
      <div className="timing-bar-inner" style={{ width: `${progress}%` }}>
        
      </div>
    </div>
    <div className="countdown">
      <p>Time remaining : 0{ parseInt(countdown/60)} : {countdown%60}</p>
    </div>
    </>
  );
};

export default TimingBar;
