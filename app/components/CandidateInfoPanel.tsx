'use client';

import { Tabs, Avatar, Descriptions, Tag, Timeline, Button } from 'antd';
import { UserOutlined, FileTextOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { createStyles } from 'antd-style';
import { Candidate, Application } from './types';

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
  `,
  content: css`
    flex: 1;
    overflow-y: auto;
    padding: 16px;
  `,
  candidateHeader: css`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
  `,
  candidateName: css`
    font-size: 18px;
    font-weight: 500;
  `,
  candidatePosition: css`
    color: ${token.colorTextSecondary};
    font-size: 14px;
  `,
  skillTags: css`
    margin: 16px 0;
  `,
  evaluationItem: css`
    margin-bottom: 16px;
    padding: 12px;
    background: ${token.colorFillQuaternary};
    border-radius: 8px;
  `,
  applicationItem: css`
    margin-bottom: 12px;
    padding: 12px;
    border: 1px solid ${token.colorBorderSecondary};
    border-radius: 8px;
  `,
}));

interface CandidateInfoPanelProps {
  candidate: Candidate;
  applications: Application[];
  onClose: () => void;
}

export const CandidateInfoPanel: React.FC<CandidateInfoPanelProps> = ({
  candidate,
  applications,
  onClose,
}) => {
  const { styles } = useStyle();

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div className={styles.candidateHeader}>
          <Avatar size={48} icon={<UserOutlined />} />
          <div>
            <div className={styles.candidateName}>{candidate.name}</div>
            <div className={styles.candidatePosition}>{candidate.position}</div>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <Tabs
          items={[
            {
              key: 'basic',
              label: '基本信息',
              children: (
                <>
                  <Descriptions column={1}>
                    <Descriptions.Item label={<MailOutlined />}>
                      {candidate.contact.email}
                    </Descriptions.Item>
                    <Descriptions.Item label={<PhoneOutlined />}>
                      {candidate.contact.phone}
                    </Descriptions.Item>
                  </Descriptions>

                  <div className={styles.skillTags}>
                    {candidate.skills.map(skill => (
                      <Tag key={skill}>{skill}</Tag>
                    ))}
                  </div>

                  <Button 
                    icon={<FileTextOutlined />}
                    block
                    style={{ marginTop: 16 }}
                  >
                    查看简历
                  </Button>
                </>
              ),
            },
            {
              key: 'evaluations',
              label: '面试评价',
              children: (
                <Timeline
                  items={candidate.evaluations.map(evaluation => ({
                    children: (
                      <div className={styles.evaluationItem}>
                        <div style={{ fontWeight: 500, marginBottom: 8 }}>
                          {evaluation.type === 'interview' ? '面试评价' : 
                           evaluation.type === 'summary' ? '面试总结' :
                           evaluation.type === 'key_points' ? '关键信息' : '跟进建议'}
                        </div>
                        <div>{evaluation.content}</div>
                        <div style={{ color: '#999', fontSize: 12, marginTop: 8 }}>
                          {evaluation.date}
                        </div>
                      </div>
                    ),
                  }))}
                />
              ),
            },
            {
              key: 'applications',
              label: '投递进展',
              children: (
                <>
                  {applications.map(app => (
                    <div key={app.id} className={styles.applicationItem}>
                      <div style={{ fontWeight: 500 }}>{app.companyName}</div>
                      <div style={{ color: '#666', marginBottom: 8 }}>{app.position}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                        <span>{app.applyDate}</span>
                        <Tag color={
                          app.status === 'pending' ? 'default' :
                          app.status === 'interviewing' ? 'processing' :
                          app.status === 'offered' ? 'success' : 'error'
                        }>
                          {app.status === 'pending' ? '待处理' :
                           app.status === 'interviewing' ? '面试中' :
                           app.status === 'offered' ? '已录用' : '已拒绝'}
                        </Tag>
                      </div>
                      <div style={{ marginTop: 8, fontSize: 13, color: '#666' }}>
                        {app.latestProgress}
                      </div>
                    </div>
                  ))}
                </>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}; 