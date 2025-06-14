'use client';

import { useState } from 'react';
import { Modal, Input, List, Avatar, Button, Tag } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { createStyles } from 'antd-style';
import { Candidate } from './types';

const useStyle = createStyles(({ token, css }) => ({
  searchInput: css`
    margin-bottom: 16px;
  `,
  candidateList: css`
    max-height: 400px;
    overflow-y: auto;
  `,
  candidateItem: css`
    padding: 12px;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s;
    
    &:hover {
      background: ${token.colorFillQuaternary};
    }
  `,
  candidateInfo: css`
    margin-left: 12px;
  `,
  candidateName: css`
    font-weight: 500;
    margin-bottom: 4px;
  `,
  candidatePosition: css`
    color: ${token.colorTextSecondary};
    font-size: 13px;
  `,
  skillTags: css`
    margin-top: 8px;
  `,
}));

interface CandidateLinkDialogProps {
  open: boolean;
  onClose: () => void;
  onSelect: (candidate: Candidate) => void;
}

export const CandidateLinkDialog: React.FC<CandidateLinkDialogProps> = ({
  open,
  onClose,
  onSelect,
}) => {
  const { styles } = useStyle();
  const [searchText, setSearchText] = useState('');

  // Mock data - replace with actual API call
  const mockCandidates: Candidate[] = [
    {
      id: '1',
      name: '张三',
      position: '前端工程师',
      contact: {
        email: 'zhangsan@example.com',
        phone: '13800138000',
      },
      skills: ['React', 'TypeScript', 'Node.js'],
      resume: 'https://example.com/resume1.pdf',
      evaluations: [],
    },
    {
      id: '2',
      name: '李四',
      position: '产品经理',
      contact: {
        email: 'lisi@example.com',
        phone: '13800138001',
      },
      skills: ['产品设计', '用户研究', '数据分析'],
      resume: 'https://example.com/resume2.pdf',
      evaluations: [],
    },
  ];

  const filteredCandidates = mockCandidates.filter(candidate =>
    candidate.name.includes(searchText) || candidate.position.includes(searchText)
  );

  return (
    <Modal
      title="关联候选人"
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <Input
        prefix={<SearchOutlined />}
        placeholder="搜索候选人姓名或职位"
        className={styles.searchInput}
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
      />
      
      <List
        className={styles.candidateList}
        dataSource={filteredCandidates}
        renderItem={candidate => (
          <List.Item
            className={styles.candidateItem}
            onClick={() => onSelect(candidate)}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <Avatar icon={<UserOutlined />} />
              <div className={styles.candidateInfo}>
                <div className={styles.candidateName}>{candidate.name}</div>
                <div className={styles.candidatePosition}>{candidate.position}</div>
                <div className={styles.skillTags}>
                  {candidate.skills.map(skill => (
                    <Tag key={skill}>{skill}</Tag>
                  ))}
                </div>
              </div>
            </div>
          </List.Item>
        )}
      />
    </Modal>
  );
}; 