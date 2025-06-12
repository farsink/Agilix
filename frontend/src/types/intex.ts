export interface ProcessStatus {
  processId: string;
  status:
    | "INITIATED"
    | "PROFILE_SAVED"
    | "N8N_PROCESSING"
    | "N8N_SUCCESS"
    | "ANALYZING_DATA"
    | "GENERATING_PLAN"
    | "COMPLETED"
    | "FAILED";
  progress: number;
  updatedAt: string;
}
