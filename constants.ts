
import { User, Item, Category, ItemStatus, ChatMessage } from './types';

export const MOCK_CURRENT_USER: User = {
    id: 'user-1',
    name: 'Alex Johnson',
    email: 'alex.j@example.com',
    location: 'San Francisco, CA',
    avatarUrl: 'https://picsum.photos/seed/user1/200/200',
};

export const MOCK_USERS: User[] = [
    MOCK_CURRENT_USER,
    {
        id: 'user-2',
        name: 'Samantha Bee',
        email: 'sam.b@example.com',
        location: 'Oakland, CA',
        avatarUrl: 'https://picsum.photos/seed/user2/200/200',
    },
    {
        id: 'user-3',
        name: 'Chris Pine',
        email: 'chris.p@example.com',
        location: 'San Francisco, CA',
        avatarUrl: 'https://picsum.photos/seed/user3/200/200',
    }
];

export const MOCK_ITEMS: Item[] = [
    {
        id: 'item-1',
        title: 'Lost: Black Leather Wallet',
        description: 'A black leather wallet with a silver money clip. Contains credit cards and a driver\'s license. Last seen near the Ferry Building.',
        category: Category.Lost,
        imageUrl: 'https://picsum.photos/seed/wallet/600/400',
        imageDescription: 'black leather wallet silver clip',
        location: 'Ferry Building, San Francisco',
        date: new Date('2024-07-15T14:30:00Z').toISOString(),
        status: ItemStatus.Open,
        userId: 'user-1',
    },
    {
        id: 'item-2',
        title: 'Found: Set of Keys on a Blue Lanyard',
        description: 'Found a set of keys attached to a bright blue lanyard with a university logo. Found on a bench in Golden Gate Park.',
        category: Category.Found,
        imageUrl: 'https://picsum.photos/seed/keys/600/400',
        imageDescription: 'keys on blue lanyard',
        location: 'Golden Gate Park, San Francisco',
        date: new Date('2024-07-16T09:00:00Z').toISOString(),
        status: ItemStatus.Open,
        userId: 'user-2',
    },
    {
        id: 'item-3',
        title: 'Lost: Prescription Glasses in Case',
        description: 'Lost my black Ray-Ban glasses in a hard black case. Might have left them on the bus, route 38.',
        category: Category.Lost,
        imageUrl: 'https://picsum.photos/seed/glasses/600/400',
        imageDescription: 'black ray-ban glasses case',
        location: 'Bus Route 38, San Francisco',
        date: new Date('2024-07-14T17:00:00Z').toISOString(),
        status: ItemStatus.Resolved,
        userId: 'user-3',
    },
    {
        id: 'item-4',
        title: 'Found: Gray HydroFlask Water Bottle',
        description: 'A gray HydroFlask water bottle with a few stickers on it. It was left at a table at the Metreon food court.',
        category: Category.Found,
        imageUrl: 'https://picsum.photos/seed/bottle/600/400',
        imageDescription: 'gray hydroflask water bottle stickers',
        location: 'Metreon, San Francisco',
        date: new Date('2024-07-17T12:00:00Z').toISOString(),
        status: ItemStatus.Open,
        userId: 'user-1',
    },
    {
        id: 'item-5',
        title: 'Found: Child\'s Teddy Bear',
        description: 'Small, brown, well-loved teddy bear found near the playground at Dolores Park. Holding it safe for its owner.',
        category: Category.Found,
        imageUrl: 'https://picsum.photos/seed/bear/600/400',
        imageDescription: 'brown teddy bear',
        location: 'Dolores Park, San Francisco',
        date: new Date('2024-07-16T15:45:00Z').toISOString(),
        status: ItemStatus.Open,
        userId: 'user-2',
    },
];

export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
    { id: 'msg-1', senderId: 'user-2', receiverId: 'user-1', text: 'Hi, I think I found your wallet!', timestamp: new Date('2024-07-16T10:00:00Z').toISOString() },
    { id: 'msg-2', senderId: 'user-1', receiverId: 'user-2', text: 'Oh wow, that\'s amazing! Where did you find it?', timestamp: new Date('2024-07-16T10:01:00Z').toISOString() },
    { id: 'msg-3', senderId: 'user-2', receiverId: 'user-1', text: 'It was near the Ferry Building, just as you described.', timestamp: new Date('2024-07-16T10:02:00Z').toISOString() },
];
