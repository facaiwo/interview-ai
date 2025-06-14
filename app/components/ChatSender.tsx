'use client';

import { useState } from 'react';
import {
  FileTextOutlined,
  CommentOutlined,
  BulbOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Sender } from '@ant-design/x';
import { Button } from 'antd';
import { createStyles } from 'antd-style';

const INTERVIEW_TOOLS = [
  { key: 'evaluation', label: '生成评价', icon: <FileTextOutlined /> },
  { key: 'summary', label: '总结问答', icon: <CommentOutlined /> },
  { key: 'suggestions', label: '改进建议', icon: <BulbOutlined /> },
  { key: 'update-jd', label: '优化JD', icon: <SettingOutlined /> },
];

const useStyle = createStyles(({ token, css }) => ({
  sender: css`
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    margin-bottom: 32px;
    .ant-input, .ant-input-outlined, .ant-input-affix-wrapper, .ant-input-group-wrapper, .ant-input-group {
      min-height: 56px !important;
      border-radius: 0 !important;
      font-size: 16px;
    }
    .ant-input-group-addon {
      border-radius: 0 !important;
    }
  `,
  toolsRow: css`
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    margin-bottom: 12px;
    display: flex;
    gap: 8px;
    justify-content: flex-start;
  `,
  toolButton: css`
    border-radius: 20px !important;
    height: 36px !important;
    padding: 0 16px !important;
    border: 1px solid #e1e1e1 !important;
    background: #fff !important;
    color: #666 !important;
    font-size: 14px !important;
    display: flex !important;
    align-items: center !important;
    gap: 6px !important;
    transition: all 0.2s ease !important;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
    
    &:hover {
      border-color: #333 !important;
      color: #333 !important;
      background: #f8f8f8 !important;
      box-shadow: 0 2px 4px rgba(0,0,0,0.12) !important;
    }
    
    &:active {
      box-shadow: 0 1px 2px rgba(0,0,0,0.1) !important;
    }
  `,
}));

interface ChatSenderProps {
  inputValue: string;
  loading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (value: string) => void;
  onQuickAction: (action: string) => void;
  hasMessages: boolean;
}

export const ChatSender: React.FC<ChatSenderProps> = ({
  inputValue,
  loading,
  onInputChange,
  onSubmit,
  onQuickAction,
  hasMessages,
}) => {
  const { styles } = useStyle();

  return (
    <>
      {hasMessages && (
        <div className={styles.toolsRow}>
          {INTERVIEW_TOOLS.map((tool) => (
            <Button
              key={tool.key}
              className={styles.toolButton}
              icon={tool.icon}
              onClick={() => onQuickAction(tool.label)}
            >
              {tool.label}
            </Button>
          ))}
        </div>
      )}

      <Sender
        value={inputValue}
        onSubmit={() => {
          onSubmit(inputValue);
          onInputChange('');
        }}
        onChange={onInputChange}
        loading={loading}
        className={styles.sender}
        placeholder="输入消息或使用快捷功能"
      />
    </>
  );
}; 