import { useEffect, useState } from "react";

const useDebounce = (changedValue, delayTime) => {
  const [debouncedValue, setDebouncedValue] = useState(changedValue);

  useEffect(() => {
    const timeOutFunc = setTimeout(() => {
      setDebouncedValue(changedValue);
    }, delayTime);

    return () => {
      clearTimeout(timeOutFunc);
    };
  }, [changedValue, delayTime]);

  return debouncedValue;
};

export default useDebounce;
