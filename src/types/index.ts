export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  lastLogin: Date | null;
  isActive: boolean;
  isVerified: boolean;
}

export enum UserRole {
  ADMIN = 0,        // Полный доступ
  MODERATOR = 1,    // Админы: контент, модерация
  RESEARCHER = 2,   // Исследователи: создание SCE-объектов
  STAFF = 3,        // Персонал: ограниченный доступ
  READER = 4        // Читатели: только чтение
}

export interface SCEObject {
  id: string;
  number: string;    // SCE-XXX
  className: string; // Класс объекта
  title: string;
  description: string;
  containment: string;
  history: string;
  additionalInfo?: string;
  media?: SCEMedia[];
  tags: string[];
  category: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  versions: SCEObjectVersion[];
}

export interface SCEObjectVersion {
  id: string;
  objectId: string;
  version: number;
  content: Partial<SCEObject>;
  createdBy: string;
  createdAt: Date;
  note: string;
}

export interface SCEMedia {
  id: string;
  objectId: string;
  type: 'image' | 'video' | 'audio' | 'document';
  url: string;
  caption: string;
  createdAt: Date;
}

export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date | null;
  status: 'draft' | 'published';
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: Date;
  parentId: string | null;
  status: 'pending' | 'approved' | 'rejected';
}

export interface AuditLog {
  id: string;
  action: string;
  userId: string;
  details: string;
  resourceType: string;
  resourceId: string;
  timestamp: Date;
  ipAddress: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';