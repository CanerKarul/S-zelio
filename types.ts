export enum Screen {
  ONBOARDING = 'ONBOARDING',
  HOME = 'HOME',
  LESSON = 'LESSON',
  PROFILE = 'PROFILE',
  LEADERBOARD = 'LEADERBOARD',
  SHOP = 'SHOP',
  ADMIN = 'ADMIN'
}

export enum LessonType {
  VIDEO = 'VIDEO',
  PODCAST = 'PODCAST',
  INFOGRAPHIC = 'INFOGRAPHIC',
  FLASHCARD = 'FLASHCARD',
  QUIZ = 'QUIZ'
}

export enum NodeStatus {
  LOCKED = 'LOCKED',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  LEGENDARY = 'LEGENDARY'
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  type: 'MULTIPLE_CHOICE' | 'FILL_BLANK';
}

export interface TopicContent {
  videoUrl?: string;
  podcastUrl?: string;
  infographicUrl?: string;
  flashcards: Flashcard[];
  questions: Question[];
  summary: string;
}

export interface TopicNode {
  id: string;
  title: string;
  description: string;
  status: NodeStatus;
  position: 'left' | 'center' | 'right'; // Visual zig-zag
  isNew?: boolean;
  content: TopicContent;
}

export interface UserProfile {
  name: string;
  xp: number;
  streak: number;
  gems: number;
  avatar: string;
  course: 'KPSS' | 'TYT' | 'AYT';
  branch: string; // Tarih, Coğrafya vs.
  isPremium: boolean;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  xp: number;
  avatar: string;
}