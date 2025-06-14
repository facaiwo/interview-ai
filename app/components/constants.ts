import dayjs from 'dayjs';
import { MessageType, ConversationType } from './types';

export const DEFAULT_CONVERSATIONS: ConversationType[] = [
  {
    key: 'default-1',
    label: '张三 - 前端工程师面试',
    group: '今天',
    date: '2024-03-15T10:00:00.000Z',
  },
  {
    key: 'default-2',
    label: '李四 - 产品经理面试',
    group: '今天',
    date: '2024-03-15T09:00:00.000Z',
  },
  {
    key: 'default-3',
    label: '王五 - 数据分析师面试',
    group: '昨天',
    date: '2024-03-14T15:00:00.000Z',
  },
  {
    key: 'default-4',
    label: '赵六 - 后端工程师面试',
    group: '昨天',
    date: '2024-03-14T14:00:00.000Z',
  },
  {
    key: 'default-5',
    label: '钱七 - UI设计师面试',
    group: '本周',
    date: '2024-03-13T11:00:00.000Z',
  }
];

export const MOCK_INTERVIEW_MESSAGES: MessageType[] = [
  {
    role: 'assistant',
    content: '你好！我是面试AI助手，可以帮助你记录面试过程、生成评价报告。请上传面试录音或直接输入面试内容。',
    timestamp: '14:25',
  },
  {
    role: 'user',
    content: '已经收到面试录音，正在转录为文字，大约需要3分钟处理。',
    timestamp: '14:30',
  },
  {
    role: 'assistant',
    content: '好的，我会等待转录完成。在此期间，你可以先告诉我：\n\n1. 这次面试的职位是什么？\n2. 你希望重点关注哪些评估维度？\n3. 面试结果如何？',
    timestamp: '14:31',
  },
  {
    role: 'user',
    content: '职位：AI产品经理\n重点：技术理解能力、产品思维、项目经验\n结果：通过',
    timestamp: '14:32',
  },
  {
    role: 'assistant',
    content: `## 面试评价报告

**候选人：** 仿宋  
**职位：** AI产品经理  
**面试时间：** ${dayjs().format('YYYY-MM-DD')}  
**面试结果：** ✅ 通过

### 🎯 综合评估

**总体印象：** 优秀候选人，技术背景扎实，产品思维清晰

### 💪 核心优势

• **技术理解深度突出**  
候选人具备大模型开发经验，熟悉AI产品技术栈，能够与技术团队有效沟通

• **产品思维成熟**  
能够从用户需求出发，结合技术可行性制定产品策略

• **项目管理能力强**  
有多个AI产品从0到1的完整经验，具备跨部门协调能力

### ⚠️ 关注点

• **商业化经验**  
建议加强对商业模式和变现路径的思考

• **团队管理**  
可考虑提供管理培训机会

### 🔍 建议

**录用建议：** 强烈推荐录用  
**薪资等级：** P6-P7  
**入职安排：** 可直接安排核心项目`,
    timestamp: '14:35',
  },
]; 