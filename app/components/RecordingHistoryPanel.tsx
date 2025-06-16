import { Avatar, Tabs, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { createStyles } from 'antd-style';
import { InterviewInfoCard } from './InterviewInfoCard';
import { ConversationType } from './types';
import dayjs from 'dayjs';

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
            <div className={styles.candidatePosition}>{candidatePosition || '职位未知'}</div>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        {history.length === 0 ? (
          <div style={{ color: '#888', marginTop: 32 }}>暂无沟通记录</div>
        ) : (
          history.map((c) => (
            <Card key={c.key} style={{ marginBottom: 16, padding: 0 }} bodyStyle={{ padding: 12 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div><span style={{ color: '#999' }}>面试时间：</span>{dayjs(c.date).format('YYYY-MM-DD')}</div>
                <div><span style={{ color: '#999' }}>候选人：</span>{c.candidateName}</div>
                <div><span style={{ color: '#999' }}>面试时长：</span>{c.duration || '30分钟'}</div>
              </div>
              <div style={{ marginTop: 8, background: '#f7f7f8', borderRadius: 6, padding: 8 }}>
                <div style={{ color: '#222', fontWeight: 500, marginBottom: 2 }}>沟通总结：</div>
                <div style={{ color: '#555', fontSize: 13, marginBottom: 2 }}>2024-03-10 10:05  面试官：请介绍一下你的项目经验。</div>
                <div style={{ color: '#555', fontSize: 13, marginBottom: 2 }}>2024-03-10 10:06  候选人：我主要负责了XX系统的前端开发...</div>
                <div style={{ color: '#555', fontSize: 13, marginBottom: 2 }}>2024-03-10 10:10  面试官：你觉得最大的技术挑战是什么？</div>
                <div style={{ color: '#555', fontSize: 13 }}>2024-03-10 10:11  候选人：主要是性能优化和团队协作...</div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
} 