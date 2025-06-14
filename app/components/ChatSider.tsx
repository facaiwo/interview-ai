'use client';

import { 
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  UserOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { Conversations, type ConversationsProps } from '@ant-design/x';
import { type GetProp, theme, Avatar, Button, Dropdown } from 'antd';
import { createStyles } from 'antd-style';
import { ConversationType } from './types';

const useStyle = createStyles(({ token, css }) => ({
  sider: css`
    background: ${token.colorBgLayout}80;
    width: 280px;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 12px;
    box-sizing: border-box;
    border-right: 1px solid rgba(0,0,0,0.04);
  `,
  logo: css`
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 0;
    box-sizing: border-box;
    gap: 8px;
    margin: 24px 0;

    span {
      font-weight: bold;
      color: ${token.colorText};
      font-size: 16px;
    }
  `,
  conversations: css`
    flex: 1;
    overflow-y: auto;
    padding: 0;
    margin-top: 12px;

    &::-webkit-scrollbar {
      width: 4px;
    }
    
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    
    &::-webkit-scrollbar-thumb {
      background: ${token.colorBorderSecondary};
      border-radius: 2px;
    }

    .ant-conversations-item {
      color: #222 !important;
      border-radius: 8px !important;
      margin-bottom: 4px !important;
      padding-left: 8px !important;
      display: flex;
      align-items: center;
    }
    .ant-conversations-item-active {
      background: #ececec !important;
      color: #222 !important;
      font-weight: 600 !important;
      border-left: none !important;
      box-shadow: none !important;
    }
    .ant-conversations-item-content {
      display: flex;
      align-items: center;
      width: 100%;
    }
  `,
  siderFooter: css`
    border-top: 1px solid ${token.colorBorderSecondary};
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0;
  `,
  userInfo: css`
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 8px;
    transition: background 0.2s;
    height: 100%;
    
    &:hover {
      background: ${token.colorFillQuaternary};
    }

    .ant-avatar {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    > div {
      display: flex;
      align-items: center;
    }
  `,
}));

interface ChatSiderProps {
  conversations: ConversationType[];
  curConversation: string;
  onConversationChange: (key: string) => void;
  onNewConversation: () => void;
  onDeleteConversation: (key: string) => void;
}

export const ChatSider: React.FC<ChatSiderProps> = ({
  conversations,
  curConversation,
  onConversationChange,
  onNewConversation,
  onDeleteConversation,
}) => {
  const { styles } = useStyle();
  const { token } = theme.useToken();

  // Map ConversationType[] to ConversationsProps['items']
  const items: GetProp<ConversationsProps, 'items'> = conversations.map((item) => ({
    key: item.key,
    label: item.label,
    group: item.group,
  }));

  return (
    <div className={styles.sider}>
      <div className={styles.logo}>
        <span>Interview AI</span>
      </div>

      <Button 
        type="primary" 
        icon={<PlusOutlined />} 
        onClick={onNewConversation}
        style={{ marginBottom: 12 }}
      >
        新建面试
      </Button>

      <Conversations
        items={items}
        className={styles.conversations}
        activeKey={curConversation}
        onActiveChange={onConversationChange}
        groupable
        styles={{
          item: { padding: '0 8px' },
        }}
        menu={(conversation) => ({
          items: [
            {
              label: '重命名',
              key: 'rename',
              icon: <EditOutlined />,
            },
            {
              label: '删除',
              key: 'delete',
              icon: <DeleteOutlined />,
              danger: true,
              onClick: () => onDeleteConversation(conversation.key),
            },
          ],
        })}
      />

      <div className={styles.siderFooter}>
        <Dropdown
          menu={{
            items: [
              { key: 'settings', label: '设置', icon: <SettingOutlined /> },
              { key: 'help', label: '帮助', icon: <QuestionCircleOutlined /> },
            ],
          }}
          trigger={['click']}
        >
          <div className={styles.userInfo}>
            <Avatar 
              size={36} 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            />
            <div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>面试官</div>
            </div>
          </div>
        </Dropdown>
      </div>
    </div>
  );
}; 