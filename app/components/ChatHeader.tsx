'use client';

import {
  MoreOutlined,
  SoundOutlined,
  UserSwitchOutlined,
  BarChartOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Button, Space, Typography } from 'antd';
import { createStyles } from 'antd-style';

const { Title } = Typography;

const useStyle = createStyles(({ token, css }) => ({
  header: css`
    height: 50px;
    padding: 0 24px 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${token.colorBgContainer};
    position: sticky;
    top: 0;
    z-index: 10;
  `,
  headerTitle: css`
    font-size: 16px;
    font-weight: 600;
    color: ${token.colorText};
    margin: 0;
    padding: 0;
  `,
  headerButton: css`
    border-radius: 20px !important;
    height: 32px !important;
    padding: 0 12px !important;
    border: 1px solid #e1e1e1 !important;
    background: #fff !important;
    color: #666 !important;
    font-size: 13px !important;
    display: flex !important;
    align-items: center !important;
    gap: 4px !important;
    transition: all 0.2s ease !important;
    &:hover {
      border-color: #333 !important;
      color: #333 !important;
      background: #f8f8f8 !important;
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
}));

interface ChatHeaderProps {
  title: string;
  hasMessages: boolean;
  onLinkCandidate: () => void;
  onShowRecordingHistory: () => void;
  isRecordingPanelOpen: boolean;
  onShowCandidatePanel: () => void;
  isCandidatePanelOpen: boolean;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  title, 
  hasMessages,
  onLinkCandidate,
  onShowRecordingHistory,
  isRecordingPanelOpen,
  onShowCandidatePanel,
  isCandidatePanelOpen,
}) => {
  const { styles } = useStyle();

  return (
    <div className={styles.header}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Title level={5} className={styles.headerTitle}>
          {title}
        </Title>
      </div>
      <Space size={8}>
        <Button className={styles.headerButton} icon={<UserSwitchOutlined />} onClick={onShowCandidatePanel}>
          候选人信息
        </Button>
        <Button className={styles.headerButton} icon={<SoundOutlined />} onClick={onShowRecordingHistory}>
          关联录音
        </Button>
      </Space>
    </div>
  );
};