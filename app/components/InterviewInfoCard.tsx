import { Card, Button } from 'antd';
import { CalendarOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';

export function InterviewInfoCard({ date, candidate, duration, onLinkCandidate, linked }: { date: string, candidate: string, duration: string, onLinkCandidate: () => void, linked: boolean }) {
  return (
    <Card style={{ margin: '24px 0' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div><CalendarOutlined /> 面试时间：{date}</div>
        <div><UserOutlined /> 候选人：{candidate}</div>
        <div><ClockCircleOutlined /> 面试时长：{duration}</div>
        {!linked && (
          <div style={{ marginTop: 16, color: '#666' }}>
            <Button type="primary" onClick={onLinkCandidate}>关联候选人</Button>
          </div>
        )}
      </div>
    </Card>
  );
} 