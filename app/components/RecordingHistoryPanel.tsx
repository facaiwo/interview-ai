import { Avatar, Tabs } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { createStyles } from 'antd-style';
import { InterviewInfoCard } from './InterviewInfoCard';
import { ConversationType } from './types';

const useStyle = createStyles(({ token, css }) => ({
  panel: css`
    width: 320px;
    height: 100%;
    border-left: 1px solid ${token.colorBorderSecondary};
    background: ${token.colorBgContainer};
    display: flex;
    flex-direction: column;
  `,
  header: css`
    padding: 16px;
    border-bottom: 1px solid ${token.colorBorderSecondary};
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  candidateHeader: css`
    display: flex;
    align-items: center;
    gap: 12px;
  `,
  candidateName: css`
    font-size: 18px;
    font-weight: 500;
  `,
  candidatePosition: css`
    color: ${token.colorTextSecondary};
    font-size: 14px;
  `,
  content: css`
    flex: 1;
    overflow-y: auto;
    padding: 16px;
  `,
}));

export function RecordingHistoryPanel({
  open,
  onClose,
  candidateName,
  candidatePosition = '',
  conversations
}: {
  open: boolean;
  onClose: () => void;
  candidateName: string;
  candidatePosition?: string;
  conversations: ConversationType[];
}) {
  const { styles } = useStyle();
  if (!open) return null;

  // 只展示已关联且同名的历史面试
  const history = conversations.filter(
    c => c.candidateName && c.candidateName !== '未关联' && c.candidateName === candidateName
  );

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div className={styles.candidateHeader}>
          <Avatar size={48} icon={<UserOutlined />} />
          <div>
            <div className={styles.candidateName}>{candidateName}</div>
            <div className={styles.candidatePosition}>{candidatePosition}</div>
          </div>
        </div>
        <span
          style={{ cursor: 'pointer', color: '#888', fontSize: 20 }}
          onClick={onClose}
        >
          ×
        </span>
      </div>
      <div className={styles.content}>
        <Tabs
          items={[{
            key: 'history',
            label: '历史面试',
            children: (
              history.length === 0 ? (
                <div style={{ color: '#888', marginTop: 32 }}>暂无历史面试记录</div>
              ) : (
                history.map((c) => (
                  <InterviewInfoCard
                    key={c.key}
                    date={c.date}
                    candidate={c.candidateName!}
                    duration={c.duration || '未知'}
                    onLinkCandidate={() => {}}
                    linked={true}
                  />
                ))
              )
            ),
          }]}
        />
      </div>
    </div>
  );
} 