import { ConversationType } from './types';

export { ChatSider } from './ChatSider';
export { ChatHeader } from './ChatHeader';
export { ChatList } from './ChatList';
export { ChatSender } from './ChatSender';
export type { MessageType } from './types';
export const DEFAULT_CONVERSATIONS: ConversationType[] = [
  {
    key: '1',
    label: '孙大鹏的面试',
    group: '今天',
    date: '2024-03-15T10:00:00.000Z',
  },
  {
    key: '2',
    label: '张三 - 前端工程师',
    group: '昨天',
    date: '2024-03-14T15:00:00.000Z',
  },
  {
    key: '3',
    label: '李四 - 产品经理',
    group: '昨天',
    date: '2024-03-14T14:00:00.000Z',
  },
  {
    key: '4',
    label: '王五 - 数据分析师',
    group: '昨天',
    date: '2024-03-13T11:00:00.000Z',
  },
];
export { MOCK_INTERVIEW_MESSAGES } from './constants'; 