import type { QuestResponse, QuestDifficulty as ApiQuestDifficulty, QuestStatus as ApiQuestStatus } from './api.types';

export enum QuestStatus {
  ACTIVE = 'Active',
  PAUSED = 'Paused',
  COMPLETED = 'Completed',
  EXPIRED = 'Expired',
}

export enum QuestDifficulty {
  EASY = 'beginner',
  MEDIUM = 'intermediate',
  HARD = 'advanced',
}

// Align Quest with QuestResponse while keeping it as an interface for backward compatibility
export interface Quest extends Partial<QuestResponse> {
  id: string;
  title: string;
  description: string;
  category: string;
  rewardAsset: string;
  rewardAmount: string | number;
  status: QuestStatus | ApiQuestStatus;
  createdAt: string;
  updatedAt: string;
}

export interface QuestFilters {
  status?: QuestStatus;
  difficulty?: QuestDifficulty;
  category?: string;
  minReward?: number;
  maxReward?: number;
  search?: string;
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
