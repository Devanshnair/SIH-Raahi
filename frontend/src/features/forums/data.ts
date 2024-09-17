export type ThreadType = {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  upvotes: number;
  downvotes: number;
  replies: number;
  views: number;
  tags: string[];
  createdAt: string;
};

export const threads: ThreadType[] = [
  {
    id: "1",
    title: "Best practices for React development",
    content:
      "What are some of the best practices you follow when developing React applications?",
    author: "reactdev",
    category: "Technology",
    upvotes: 152,
    downvotes: 23,
    replies: 31,
    views: 1200,
    tags: ["react", "javascript", "frontend"],
    createdAt: "2023-06-10T14:30:00Z",
  },
  {
    id: "2",
    title: "Starting a small business during a pandemic",
    content:
      "I'm thinking of starting a small business. Any advice on how to navigate the current economic climate?",
    author: "entrepreneur101",
    category: "Business",
    upvotes: 89,
    downvotes: 12,
    replies: 24,
    views: 800,
    tags: ["startup", "smallbusiness", "economy"],
    createdAt: "2023-06-11T09:00:00Z",
  },
  {
    id: "3",
    title: "The future of AI in healthcare",
    content:
      "How do you see AI transforming the healthcare industry in the next decade?",
    author: "healthtechguru",
    category: "Healthcare",
    upvotes: 120,
    downvotes: 15,
    replies: 40,
    views: 950,
    tags: ["AI", "healthcare", "technology"],
    createdAt: "2023-06-12T16:45:00Z",
  },
  {
    id: "4",
    title: "Effective online learning strategies",
    content:
      "What are some effective strategies for online learning and remote education?",
    author: "edutech",
    category: "Education",
    upvotes: 75,
    downvotes: 8,
    replies: 20,
    views: 600,
    tags: ["onlinelearning", "education", "remote"],
    createdAt: "2023-06-13T11:20:00Z",
  },
  {
    id: "5",
    title: "Top movies to watch in 2023",
    content: "What are some of the must-watch movies coming out in 2023?",
    author: "moviefan",
    category: "Entertainment",
    upvotes: 200,
    downvotes: 30,
    replies: 50,
    views: 1500,
    tags: ["movies", "entertainment", "2023"],
    createdAt: "2023-06-14T18:00:00Z",
  },
  {
    id: "6",
    title: "How to improve business productivity",
    content:
      "What are some strategies to improve productivity in a business setting?",
    author: "bizguru",
    category: "Business",
    upvotes: 95,
    downvotes: 10,
    replies: 22,
    views: 700,
    tags: ["productivity", "business", "management"],
    createdAt: "2023-06-15T10:00:00Z",
  },
  {
    id: "7",
    title: "Latest trends in web development",
    content:
      "What are the latest trends in web development that developers should be aware of?",
    author: "webdev",
    category: "Technology",
    upvotes: 130,
    downvotes: 20,
    replies: 35,
    views: 1100,
    tags: ["webdev", "trends", "frontend"],
    createdAt: "2023-06-16T14:00:00Z",
  },
  {
    id: "8",
    title: "Mental health tips for remote workers",
    content:
      "How can remote workers maintain their mental health while working from home?",
    author: "wellnesscoach",
    category: "Healthcare",
    upvotes: 85,
    downvotes: 5,
    replies: 18,
    views: 650,
    tags: ["mentalhealth", "remotework", "wellness"],
    createdAt: "2023-06-17T08:30:00Z",
  },
  {
    id: "9",
    title: "Best online courses for learning programming",
    content:
      "What are some of the best online courses for learning programming?",
    author: "codelearner",
    category: "Education",
    upvotes: 110,
    downvotes: 12,
    replies: 28,
    views: 900,
    tags: ["programming", "onlinecourses", "education"],
    createdAt: "2023-06-18T12:00:00Z",
  },
  {
    id: "10",
    title: "Upcoming tech conferences in 2023",
    content:
      "What are some of the upcoming tech conferences in 2023 that are worth attending?",
    author: "techenthusiast",
    category: "Technology",
    upvotes: 140,
    downvotes: 18,
    replies: 32,
    views: 1150,
    tags: ["techconferences", "2023", "technology"],
    createdAt: "2023-06-19T15:00:00Z",
  },
];
