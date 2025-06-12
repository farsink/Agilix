import { io } from "../../server";
import { v4 as uuidv4 } from "uuid";

interface ProcessStatus {
  processId: string;
  status: string;
  progress: number;
  updatedAt: Date;
}

class StatusTrackingService {
  private processes: Map<string, ProcessStatus> = new Map();

  startProcess(userId: string): string {
    const processId = uuidv4();
    this.processes.set(processId, {
      processId,
      status: "INITIATED",
      progress: 0,
      updatedAt: new Date(),
    });
    this.emitStatusUpdate(processId);
    return processId;
  }

  updateStatus(processId: string, status: string, progress: number) {
    if (!this.processes.has(processId)) return;

    this.processes.set(processId, {
      ...this.processes.get(processId)!,
      status,
      progress,
      updatedAt: new Date(),
    });
    this.emitStatusUpdate(processId);
  }

  private emitStatusUpdate(processId: string) {
    const status = this.processes.get(processId);
    if (status) {
      io.emit(`process:${processId}`, status);
    }
  }

  getStatus(processId: string): ProcessStatus | undefined {
    return this.processes.get(processId);
  }
}

export default new StatusTrackingService();
