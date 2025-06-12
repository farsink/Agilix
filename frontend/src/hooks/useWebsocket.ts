import { useEffect, useState } from "react";
import io from "socket.io-client"; // Recommended

import { ProcessStatus } from "../types/intex";
import { Socket } from "socket.io-client";

const socket: typeof Socket = io("http://localhost:5000", {
  transports: ["websocket"],
  reconnectionAttempts: 3,
});

export const useWebSocket = (processId: string) => {
  const [status, setStatus] = useState<ProcessStatus | null>(null);

  useEffect(() => {
    const handleStatusUpdate = (data: ProcessStatus) => {
      setStatus(data);
    };

    socket.on(`process:${processId}`, handleStatusUpdate);

    // Initial fetch in case of reconnection
    fetch(`/api/v1/user/process-status/${processId}`)
      .then((res) => res.json())
      .then(setStatus);

    return () => {
      socket.off(`process:${processId}`, handleStatusUpdate);
    };
  }, [processId]);

  return status;
};
