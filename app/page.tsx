'use client';

import { useState, useEffect } from 'react';
import { Button, Card } from 'antd';
import { UserAddOutlined, ClockCircleOutlined, UserOutlined, CalendarOutlined } from '@ant-design/icons';
import { createStyles } from 'antd-style';
import { ChatSider, ChatHeader, ChatList, ChatSender } from './components';
import { CandidateLinkDialog } from './components/CandidateLinkDialog';
import { CandidateInfoPanel } from './components/CandidateInfoPanel';
import { Candidate, Application, ConversationType, MessageType } from './components/types';
import { DEFAULT_CONVERSATIONS } from './components/constants';
import dayjs from 'dayjs';
import { InterviewInfoCard } from './components/InterviewInfoCard';
import { RecordingHistoryPanel } from './components/RecordingHistoryPanel';
import { Candidate as CandidateType } from './components/types';

const useStyle = createStyles(({ token, css }) => ({
  layout: css`
    display: flex;
    height: 100vh;
    background: #fff;
  `,
  chat: css`
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
  `,
  interviewCard: css`
    max-width: 700px;
    margin: 0 auto;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    
    .ant-card-body {
      padding: 20px;
    }
    
    .interview-info {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .info-item {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #666;
      
      .anticon {
        color: #999;
      }
    }
    
    .invite-text {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #f0f0f0;
      color: #666;
    }
  `,
}));

// Mock applications data
const mockApplications: Application[] = [
  {
    id: '1',
    companyName: '腾讯',
    position: '前端工程师',
    applyDate: '2024-03-15',
    status: 'interviewing',
    latestProgress: '已通过技术面试，等待HR面试',
  },
  {
    id: '2',
    companyName: '阿里巴巴',
    position: '高级前端工程师',
    applyDate: '2024-03-10',
    status: 'pending',
    latestProgress: '简历已投递，等待反馈',
  },
];

// Mock candidates data (should match CandidateLinkDialog)
const mockCandidates: CandidateType[] = [
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

export default function Home() {
  const { styles } = useStyle();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState<ConversationType[]>(DEFAULT_CONVERSATIONS);
  const [curConversation, setCurConversation] = useState(DEFAULT_CONVERSATIONS[0].key);
  const [showCandidateDialog, setShowCandidateDialog] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showCandidatePanel, setShowCandidatePanel] = useState(false);
  const [showRecordingPanel, setShowRecordingPanel] = useState(false);

  // Load data from localStorage after mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('messages');
    const savedConversations = localStorage.getItem('conversations');
    const savedConversation = localStorage.getItem('curConversation');

    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
    if (savedConversations) {
      setConversations(JSON.parse(savedConversations));
    }
    if (savedConversation) {
      setCurConversation(savedConversation);
    }
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('curConversation', curConversation);
  }, [curConversation]);

  const hasMessages = messages.length > 0;
  const currentConversation = conversations.find(c => c.key === curConversation);

  // Add initial message when conversation changes
  useEffect(() => {
    if (currentConversation) {
      const initialMessage: MessageType = {
        role: 'assistant',
        content: (
          <InterviewInfoCard
            date={dayjs(currentConversation.date).format('YYYY-MM-DD HH:mm')}
            candidate={currentConversation.candidateName || '未关联'}
            duration={currentConversation.duration || '30分钟'}
            onLinkCandidate={() => setShowCandidateDialog(true)}
            linked={!!currentConversation.candidateName && currentConversation.candidateName !== '未关联'}
          />
        ),
        timestamp: new Date().toISOString(),
      };
      setMessages([initialMessage]);
    }
  }, [currentConversation]);

  useEffect(() => {
    if (
      currentConversation?.candidateName &&
      currentConversation.candidateName !== '未关联'
    ) {
      const candidate = mockCandidates.find(
        c => c.name === currentConversation.candidateName
      );
      setSelectedCandidate(candidate || null);
    }
  }, [currentConversation]);

  const handleConversationChange = (key: string) => {
    setCurConversation(key);
  };

  const handleNewConversation = () => {
    const newConversation: ConversationType = {
      key: `new-${Date.now()}`,
      label: '新面试',
      group: '今天',
      date: new Date().toISOString(),
    };
    setConversations([newConversation, ...conversations]);
    setCurConversation(newConversation.key);
  };

  const handleDeleteConversation = (key: string) => {
    const newConversations = conversations.filter(c => c.key !== key);
    setConversations(newConversations);
    if (key === curConversation && newConversations.length > 0) {
      setCurConversation(newConversations[0].key);
    }
  };

  const handleCandidateSelect = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setShowCandidateDialog(false);
    setShowCandidatePanel(true);
    // 更新当前会话的候选人信息和面试时长
    setConversations(prev => prev.map(c =>
      c.key === curConversation
        ? {
            ...c,
            candidateName: candidate.name,
            duration: c.duration || '30分钟',
          }
        : c
    ));
  };

  // --- Panel toggle logic ---
  const handleShowCandidatePanel = () => {
    setShowCandidatePanel(true);
    setShowRecordingPanel(false);
  };
  const handleShowRecordingPanel = () => {
    setShowRecordingPanel(true);
    setShowCandidatePanel(false);
  };

  return (
    <div className={styles.layout} style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      <ChatSider
        conversations={conversations}
        curConversation={curConversation}
        onConversationChange={handleConversationChange}
        onNewConversation={handleNewConversation}
        onDeleteConversation={handleDeleteConversation}
      />

      <div className={styles.chat} style={{ flex: 1, display: 'flex', flexDirection: 'row', height: '100%' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <ChatHeader
            title={currentConversation?.label || '新面试'}
            hasMessages={hasMessages}
            onLinkCandidate={() => setShowCandidateDialog(true)}
            onShowRecordingHistory={handleShowRecordingPanel}
            isRecordingPanelOpen={showRecordingPanel}
            onShowCandidatePanel={handleShowCandidatePanel}
            isCandidatePanelOpen={showCandidatePanel}
          />

          <ChatList messages={messages} loading={loading} />

          <ChatSender
            inputValue={inputValue}
            loading={loading}
            onInputChange={setInputValue}
            onSubmit={(value) => {
              if (!value.trim()) return;
              const newMessage: MessageType = {
                role: 'user',
                content: value,
                timestamp: new Date().toISOString(),
              };
              setMessages([...messages, newMessage]);
              setInputValue('');
              setLoading(true);
              // Simulate AI response
              setTimeout(() => {
                const aiResponse: MessageType = {
                  role: 'assistant',
                  content: '这是一个模拟的AI回复。',
                  timestamp: new Date().toISOString(),
                };
                setMessages(prev => [...prev, aiResponse]);
                setLoading(false);
              }, 1000);
            }}
            onQuickAction={(action) => {
              console.log('Quick action:', action);
            }}
            hasMessages={hasMessages}
          />
        </div>
        {/* Only show one panel at a time */}
        {showCandidatePanel && !showRecordingPanel && (
          <CandidateInfoPanel
            candidate={selectedCandidate || mockCandidates[0]}
            applications={mockApplications}
            onClose={() => setShowCandidatePanel(false)}
          />
        )}
        {showRecordingPanel && !showCandidatePanel && (
          <RecordingHistoryPanel
            open={showRecordingPanel}
            onClose={() => setShowRecordingPanel(false)}
            candidateName={currentConversation?.candidateName || '张三'}
            candidatePosition={
              selectedCandidate?.position ||
              mockCandidates.find(c => c.name === currentConversation?.candidateName)?.position ||
              '前端工程师'
            }
            conversations={[
              ...conversations,
              // Demo data for recording history, ensure candidateName matches
              {
                key: 'demo-1',
                label: 'Demo 历史沟通 1',
                group: '历史',
                date: '2024-03-10T10:00:00.000Z',
                candidateName: currentConversation?.candidateName || '张三',
                duration: '45分钟',
              },
              {
                key: 'demo-2',
                label: 'Demo 历史沟通 2',
                group: '历史',
                date: '2024-02-20T14:00:00.000Z',
                candidateName: currentConversation?.candidateName || '张三',
                duration: '30分钟',
              },
            ]}
          />
        )}
      </div>
      <CandidateLinkDialog
        open={showCandidateDialog}
        onClose={() => setShowCandidateDialog(false)}
        onSelect={handleCandidateSelect}
      />
    </div>
  );
}
