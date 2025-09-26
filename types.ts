
export enum Category {
  Lost = 'Lost',
  Found = 'Found',
}

export enum ItemStatus {
  Open = 'Open',
  Resolved = 'Resolved',
  Archived = 'Archived',
}

export interface User {
  id: string;
  name: string;
  email: string;
  contactInfo?: string;
  location?: string;
  avatarUrl: string;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  category: Category;
  imageUrl: string;
  imageDescription?: string;
  location: string;
  date: string; // ISO string format
  status: ItemStatus;
  userId: string;
}

export interface ChatMessage {
    id: string;
    senderId: string;
    receiverId: string;
    text: string;
    timestamp: string;
}
