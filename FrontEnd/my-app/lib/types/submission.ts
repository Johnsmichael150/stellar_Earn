import type { SubmissionResponse, SubmissionStatus as ApiSubmissionStatus } from './api.types';

export enum SubmissionStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  PAID = 'Paid',
  UNDER_REVIEW = 'Pending',
}

export interface Quest {
  id: string;
  title: string;
  description?: string;
  rewardAmount: number | string;
  rewardAsset: string;
  deadline?: string;
  status?: string;
}

export interface Submission extends Partial<SubmissionResponse> {
  id: string;
  questId: string;
  userId: string;
  status: ApiSubmissionStatus;
  createdAt: string;
  updatedAt: string;
  quest?: Quest; // Made optional to match SubmissionResponse
}

export interface SubmissionFilters {
  status?: SubmissionStatus | ApiSubmissionStatus;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  cursor?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
    hasMore?: boolean;
    cursor?: string;
    nextCursor?: string;
  };
}
