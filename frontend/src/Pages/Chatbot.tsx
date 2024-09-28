import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

interface Mentor {
  name: string
  bio: string
  profilePicture: string
  phoneNumber: string
  experience: string
  expertise: string
  bookNowUrl: string
}

interface Message {
  id: string
  text: string
  isUser: boolean
  mentors?: Mentor[]
}

const MentorCard: React.FC<{ mentor: Mentor; index: number }> = ({ mentor, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.2 }}
    className="bg-white rounded-lg shadow-md overflow-hidden mb-4"
  >
    <div className="md:flex">
      <div className="md:flex-shrink-0">
        {mentor.profilePicture ? (
          <img
            className="h-32 w-full object-cover md:w-32"
            src={mentor.profilePicture}
            alt={`Profile picture of ${mentor.name}`}
          />
        ) : (
          <div className="h-32 w-full md:w-32 bg-gray-200 flex items-center justify-center">
            <svg className="h-16 w-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="uppercase tracking-wide text-sm text-blue-500 font-semibold">{mentor.expertise || 'Expertise not specified'}</div>
        <h3 className="mt-1 text-lg leading-tight font-medium text-black">{mentor.name || 'Name not provided'}</h3>
        <p className="mt-2 text-sm text-gray-500">
          {mentor.bio
            ? mentor.bio.length > 100
              ? mentor.bio.slice(0, 100) + '...'
              : mentor.bio
            : 'No bio available'}
        </p>
        <div className="mt-2">
          <p className="text-xs text-gray-600"><strong>Experience:</strong> {mentor.experience || 'Not specified'}</p>
          <p className="text-xs text-gray-600"><strong>Phone:</strong> {mentor.phoneNumber || 'Not provided'}</p>
        </div>
        <div className="mt-3">
          {mentor.bookNowUrl ? (
            <a
              href={mentor.bookNowUrl}
              className="inline-block px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
            >
              Book Now
            </a>
          ) : (
            <span className="text-sm text-gray-500">Booking unavailable</span>
          )}
        </div>
      </div>
    </div>
  </motion.div>
)

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const chatSocketRef = useRef<WebSocket | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    chatSocketRef.current = new WebSocket('ws://live-merely-drum.ngrok-free.app/ws/chat/')

    chatSocketRef.current.onmessage = (e) => {
      const data = JSON.parse(e.data)
      if (data.mentors) {
        setTimeout(() => {
          addBotMessage(data.formatted_response, parseMentors(data.mentors))
          setIsLoading(false)
        }, 2000) 
      } else {
        console.error('Unexpected response format:', data)
        setIsLoading(false)
      }
    }

    chatSocketRef.current.onclose = (e) => {
      console.error('Chat socket closed unexpectedly')
    }

    addWelcomeMessage()

    return () => {
      if (chatSocketRef.current) {
        chatSocketRef.current.close()
      }
    }
  }, [])

  useEffect(() => {
    if (messages.length > 0 && !messages[messages.length - 1].isUser) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const parseMentors = (mentorsString: string): Mentor[] => {
    const mentorStrings = mentorsString.split('\n\n\n')
    return mentorStrings.map(mentorString => {
      const lines = mentorString.split('\n')
      const mentor: Partial<Mentor> = {}
      lines.forEach(line => {
        const [key, value] = line.split(': ')
        switch (key) {
          case 'Name':
            mentor.name = value
            break
          case 'Bio':
            mentor.bio = value
            break
          case 'Profile Picture':
            mentor.profilePicture = value
            break
          case 'Phone Number':
            mentor.phoneNumber = value
            break
          case 'Experience':
            mentor.experience = value
            break
          case 'Expertise':
            mentor.expertise = value
            break
          case 'Book now':
            mentor.bookNowUrl = value
            break
        }
      })
      return mentor as Mentor
    }).filter(mentor => mentor.name || mentor.expertise || mentor.bio || mentor.experience || mentor.phoneNumber || mentor.bookNowUrl)
  }

  const addMessage = (text: string, isUser: boolean, mentors?: Mentor[]) => {
    setMessages(prevMessages => [...prevMessages, { id: Date.now().toString(), text, isUser, mentors }])
  }

  const addUserMessage = (text: string) => {
    addMessage(text, true)
    setIsLoading(true)
    if (chatSocketRef.current) {
      chatSocketRef.current.send(JSON.stringify({ 'message': text }))
    }
  }

  const addBotMessage = (text: string, mentors?: Mentor[]) => {
    addMessage(text, false, mentors)
  }

  const addWelcomeMessage = () => {
    const welcomeMessage = `
      <h3 class="text-lg font-semibold text-blue-600 mb-2">Welcome to Raahi Chatbot!</h3>
      <p class="mb-2">Please provide the following information:</p>
      <ul class="list-disc list-inside mb-2">
        <li><strong>Experience:</strong> Specify the number of years of experience (e.g., "Experience: 5 years").</li>
        <li><strong>Expertise:</strong> Indicate the specific field or specialization (e.g., "Expertise: Data Science").</li>
      </ul>
      <p>Use bullet points or a list format for clarity. Ensure that the labels ('Experience' and 'Expertise') are clearly distinguishable from the values.</p>
    `
    addBotMessage(welcomeMessage)
  }

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      addUserMessage(inputMessage.trim())
      setInputMessage('')
      inputRef.current?.focus()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-screen bg-slate-100">
      <header className="bg-slate-50 shadow-sm py-4 px-6">
      <Link to={"/"}>
      <div className="h-[4.5rem] cursor-pointer p-3">
        <img
          src="../../src/assets/Logo1.png"
          alt="Logo"
          className="h-[100%] object-cover"
        />
      </div>
      </Link>
      </header>
      <main className="flex-1 overflow-hidden p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg h-full flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${message.isUser
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                      }`}
                  >
                    <div dangerouslySetInnerHTML={{ __html: message.text }} />
                    {message.mentors && message.mentors.length > 0 && (
                      <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">Recommended Mentors:</h3>
                        {message.mentors.map((mentor, index) => (
                          <MentorCard key={index} mentor={mentor} index={index} />
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                  <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t">
            <div className="flex items-center space-x-2">
              <input
                ref={inputRef}
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
