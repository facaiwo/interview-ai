'use client';

import {
  RobotOutlined,
  MoreOutlined,
  ReloadOutlined,
  CopyOutlined,
  LikeOutlined,
  DislikeOutlined,
  FileTextOutlined,
  CommentOutlined,
  BulbOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Welcome, Prompts } from '@ant-design/x';
import { Button, Space, Spin } from 'antd';
import { createStyles } from 'antd-style';
import { MessageType } from './types';

const QUICK_START_PROMPTS = {
  key: 'quick-start',
  label: '快速开始',
  children: [
    {
      key: 'upload-audio',
      description: '上传面试录音，自动转录并分析面试内容',
      icon: <FileTextOutlined style={{ color: '#666' }} />,
    },
    {
      key: 'record-interview',
      description: '实时记录面试过程，边面试边记录关键信息',
      icon: <CommentOutlined style={{ color: '#666' }} />,
    },
    {
      key: 'generate-report',
      description: '基于面试内容生成专业的候选人评价报告',
      icon: <BulbOutlined style={{ color: '#666' }} />,
    },
    {
      key: 'optimize-process',
      description: '获得面试流程优化建议，提升面试效率',
      icon: <SettingOutlined style={{ color: '#666' }} />,
    },
  ],
};

const useStyle = createStyles(({ token, css }) => ({
  chatList: css`
    flex: 1;
    overflow: auto;
    
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
  `,
  loadingMessage: css`
    background-image: linear-gradient(90deg, #000 0%, #333 50%, #666 100%);
    background-size: 100% 2px;
    background-repeat: no-repeat;
    background-position: bottom;
  `,
  placeholder: css`
    padding-top: 32px;
  `,
  promptCard: css`
    .ant-prompts-label {
      color: #000000e0 !important;
    }
    .ant-prompts-desc {
      color: #000000a6 !important;
      width: 100%;
    }
    .ant-prompts-icon {
      color: #666 !important;
    }
  `,
  assistantMessage: css`
    padding: 16px 0;
    line-height: 1.6;
    color: #222;
    
    .assistant-bubble {
      background: none;
      color: #222;
      padding: 0;
      border-radius: 0;
      max-width: 700px;
      word-wrap: break-word;
      box-shadow: none;
    }
  `,
  userMessage: css`
    display: flex;
    justify-content: flex-end;
    margin: 16px 0;
  `,
  userBubble: css`
    background: #f7f7f8;
    color: #222;
    padding: 12px 16px;
    border-radius: 18px;
    max-width: 700px;
    margin-right: 0;
    word-wrap: break-word;
    box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  `,
  actionButton: css`
    border: none !important;
    background: transparent !important;
    color: #999 !important;
    padding: 4px 8px !important;
    height: auto !important;
    border-radius: 16px !important;
    transition: all 0.2s ease !important;
    
    &:hover {
      background: #f5f5f5 !important;
      color: #666 !important;
    }
  `,
  moreButton: css`
    border: none !important;
    background: transparent !important;
    color: #999 !important;
    width: 28px !important;
    height: 28px !important;
    border-radius: 14px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    
    &:hover {
      background: #f5f5f5 !important;
      color: #666 !important;
    }
  `,
  chat: css`
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding-block: 8px;
    gap: 8px;
  `,
}));

interface ChatListProps {
  messages: MessageType[];
  loading: boolean;
}

export const ChatList: React.FC<ChatListProps> = ({ messages, loading }) => {
  const { styles } = useStyle();

  if (!messages.length) {
    return (
      <Space
        direction="vertical"
        size={16}
        style={{ paddingInline: 'calc((100% - 700px) / 2)' }}
        className={styles.placeholder}
      >
        <Welcome
          variant="borderless"
          icon={<RobotOutlined style={{ fontSize: 48, color: '#666' }} />}
          title="Interview AI"
          description="智能面试记录与评价工具，帮助面试官提高工作效率"
          extra={
            <Space>
              <Button className={styles.moreButton} icon={<MoreOutlined />} />
            </Space>
          }
        />
        <Prompts
          items={[QUICK_START_PROMPTS]}
          styles={{
            list: { height: '100%' },
            item: {
              flex: 1,
              backgroundImage: 'linear-gradient(123deg, #f8f9fa 0%, #f1f3f4 100%)',
              borderRadius: 12,
              border: '1px solid #e8eaed',
            },
            subItem: { padding: 12, background: '#ffffffa6' },
          }}
          className={styles.promptCard}
        />
      </Space>
    );
  }

  return (
    <div className={styles.chatList}>
      <div style={{ 
        height: '100%', 
        paddingInline: 'calc((100% - 700px) / 2)',
      }}>
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.role === 'assistant' ? (
              <div className={styles.assistantMessage}>
                <div 
                  className={`assistant-bubble ${loading && index === messages.length - 1 ? styles.loadingMessage : ''}`}
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {typeof msg.content === 'string' ? msg.content : msg.content}
                </div>
                <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
                  <Button className={styles.actionButton} size="small" icon={<ReloadOutlined />} />
                  <Button className={styles.actionButton} size="small" icon={<CopyOutlined />} />
                  <Button className={styles.actionButton} size="small" icon={<LikeOutlined />} />
                  <Button className={styles.actionButton} size="small" icon={<DislikeOutlined />} />
                </div>
              </div>
            ) : (
              <div className={styles.userMessage}>
                <div>
                  <div className={styles.userBubble}>
                    {typeof msg.content === 'string' ? msg.content : msg.content}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {loading && (
        <div style={{ 
          textAlign: 'center', 
          padding: '16px',
          marginInline: 'calc((100% - 700px) / 2)'
        }}>
          <Spin size="small" />
        </div>
      )}
    </div>
  );
}; 