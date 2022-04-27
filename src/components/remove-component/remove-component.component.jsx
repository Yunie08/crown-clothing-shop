import { useState, useEffect } from "react";

const RemoveComponent = ({ delay, children }) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const eraseComponent = setTimeout(() => {
      setVisible(false);
    }, delay);
    return () => clearTimeout(eraseComponent);
  }, []);

  return visible && <>{children}</>;
};

export default RemoveComponent;
