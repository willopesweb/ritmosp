import React, { useState, useEffect } from 'react';
import "./Notification.scss";

interface NotificationProps {
  type: "success" | "error" | "warning";
  message: string;
  float?: true;
}

const Notification: React.FC<NotificationProps> = ({ type, message, float }: NotificationProps) => {
  const [isVisible, setIsVisible] = useState(float ? false : true); // Inicializa visível se não for float

  useEffect(() => {
    if (!float) return;

    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(timer);
    };
  }, [float]);

  const handleNotificationClick = () => {
    if (!float) return; -
      setIsVisible(false);
  };

  // Renderiza apenas se isVisible for true
  return (
    <div className={`c-notification ${type} ${float ? "c-notification--float" : ""} ${isVisible ? "is-visible" : ""}`} onClick={handleNotificationClick}>
      <p>{message}</p>
    </div>
  )
}

export default Notification;
