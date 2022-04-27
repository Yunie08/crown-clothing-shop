import { useState, useEffect } from "react";

const RemoveComponent = ({ delay, children }) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    console.log("🚨We are in erraseMessage🚨");
    const eraseComponent = setTimeout(() => {
      setVisible(false);
    }, delay);
    return () => clearTimeout(eraseComponent);
  }, []);

  return visible && <>{children}</>;
};

export default RemoveComponent;
