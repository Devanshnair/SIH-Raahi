import React, { useState } from "react";
import {
  Search,
  TrendingUp,
  MessageSquare,
  Eye,
  Clock,
  User,
  Share2,
  ChevronUp,
  ChevronDown,
  Award,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ThreadType, threads } from "./data";

type Category = {
  id: string;
  name: string;
  icon: string;
};

type Contributor = {
  id: string;
  name: string;
  avatar: string;
  score: number;
};

const categories: Category[] = [
  { id: "1", name: "Technology", icon: "💻" },
  { id: "2", name: "Business", icon: "💼" },
  { id: "3", name: "Healthcare", icon: "🏥" },
  { id: "4", name: "Education", icon: "🎓" },
  { id: "5", name: "Entertainment", icon: "🎭" },
];

const topContributors: Contributor[] = [
  {
    id: "1",
    name: "Alice",
    avatar: "/placeholder.svg?height=40&width=40",
    score: 1250,
  },
  {
    id: "2",
    name: "Bob",
    avatar: "/placeholder.svg?height=40&width=40",
    score: 1100,
  },
  {
    id: "3",
    name: "Charlie",
    avatar: "/placeholder.svg?height=40&width=40",
    score: 950,
  },
];

const SearchBar: React.FC = () => (
  <div className="relative mb-6">
    <input
      type="text"
      placeholder="Search forums..."
      className="w-full rounded-full border border-gray-300 bg-white px-4 py-3 pl-12 text-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
    <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
  </div>
);

function CategoryList({
  activeCategory,
  setActiveCategory,
}: {
  activeCategory: Category;
  setActiveCategory: React.Dispatch<React.SetStateAction<Category>>;
}) {
  return (
    <div className="mb-8 rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-slate-800">Categories</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category)}
            className={`flex items-center justify-center rounded-lg p-3 text-sm font-medium transition-colors duration-200 ${
              activeCategory.id === category.id
                ? "bg-indigo-100 text-indigo-700"
                : "text-slatet]-700 bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}

function Thread({ thread }: { thread: ThreadType }) {
  const [votes, setVotes] = useState(thread.upvotes - thread.downvotes);

  const handleUpvote = () => setVotes(votes + 1);
  const handleDownvote = () => setVotes(votes - 1);

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg">
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-800">
            {thread.category}
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleUpvote}
              className="text-slate-500 transition-colors duration-200 hover:text-green-600"
            >
              <ChevronUp className="h-5 w-5" />
            </button>
            <span className="font-semibold text-gray-700">{votes}</span>
            <button
              onClick={handleDownvote}
              className="text-slate-500 transition-colors duration-200 hover:text-red-600"
            >
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>
        </div>
        <Link
          to={`/forum/thread/${thread.id}`}
          className="mb-2 text-xl font-bold text-slate-800 transition-colors duration-200 hover:text-indigo-600"
        >
          {thread.title}
        </Link>
        <p className="mb-4 line-clamp-2 text-slate-600">{thread.content}</p>
        <div className="mb-4 flex -translate-x-0.5 flex-wrap gap-2">
          {thread.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 px-3 py-1.5 text-xs text-slate-700"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between border-t pt-4 text-sm text-slate-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <User className="-mt-px mr-1.5 h-4 w-4" />
              {thread.author}
            </span>
            <span className="flex items-center">
              <Clock className="mr-1.5 h-4 w-4" />
              {new Date(thread.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <MessageSquare className="mr-1 h-4 w-4" />
              {thread.replies}
            </span>
            <span className="flex items-center">
              <Eye className="mr-1 h-4 w-4" />
              {thread.views}
            </span>
            <button className="flex items-center transition-colors duration-200 hover:text-indigo-600">
              <Share2 className="mr-1 h-4 w-4" />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ThreadList({ threads }: { threads: ThreadType[] }) {
  return (
    <div className="space-y-6">
      {threads.map((thread) => (
        <Thread key={thread.id} thread={thread} />
      ))}
    </div>
  );
}

const Sidebar: React.FC = () => (
  <div className="space-y-6">
    <div className="rounded-xl bg-white p-5 shadow-md">
      <h3 className="mb-4 flex items-center text-lg font-semibold text-slate-800">
        <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
        Trending Topics
      </h3>
      <ul className="space-y-2 text-slate-600">
        <li className="cursor-pointer text-sm hover:text-indigo-600">
          #ReactHooks
        </li>
        <li className="cursor-pointer text-sm hover:text-indigo-600">
          #StartupFunding
        </li>
        <li className="cursor-pointer text-sm hover:text-indigo-600">
          #HealthTech
        </li>
      </ul>
    </div>
    <div className="rounded-xl bg-white p-5 shadow-md">
      <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-800">
        <Award className="mr-2 size-6 text-yellow-500" />
        Top Contributors
      </h3>
      <ul className="space-y-4">
        {topContributors.map((contributor) => (
          <li key={contributor.id} className="flex items-center">
            <img
              src={
                "https://st4.depositphotos.com/9998432/24360/v/450/depositphotos_243600690-stock-illustration-person-gray-photo-placeholder-girl.jpg"
              }
              alt={contributor.name}
              className="mr-3 h-10 w-10 rounded-full"
            />
            <div>
              <div className="font-medium text-gray-700">
                {contributor.name}
              </div>
              <div className="text-sm text-gray-500">
                {contributor.score} points
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// const CreateThreadButton: React.FC = () => (
//   <button className="fixed bottom-8 right-8 rounded-full bg-indigo-600 p-4 text-white shadow-lg transition-colors duration-200 hover:bg-indigo-700">
//     <MessageSquare className="h-6 w-6" />
//   </button>
// );

export default function Forum() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const filteredThreads = threads.filter(
    (thread) => thread.category === activeCategory.name,
  );
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="container mx-auto px-4 py-8">
        <SearchBar />
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="lg:w-3/4">
            <CategoryList
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
            <ThreadList threads={filteredThreads} />
          </div>
          <div className="lg:w-1/4">
            <Sidebar />
          </div>
        </div>
      </div>
      {/* <CreateThreadButton /> */}
    </div>
  );
}
