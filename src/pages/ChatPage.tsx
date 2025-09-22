import React, { useState, useRef, useEffect } from 'react';
import { Send, Phone, Video, MoreVertical, Search, Users, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Chat {
  id: string;
  name: string;
  role: 'ngo' | 'veterinarian' | 'citizen';
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  online: boolean;
  caseId?: string;
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'location';
  imageUrl?: string;
}

const ChatPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [chats] = useState<Chat[]>([
    {
      id: '1',
      name: 'Dr. Sarah Kumar',
      role: 'veterinarian',
      avatar: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=100',
      lastMessage: 'The dog is recovering well. Bring him for checkup next week.',
      timestamp: '2 mins ago',
      unreadCount: 0,
      online: true,
      caseId: 'DOG001234'
    },
    {
      id: '2',
      name: 'Happy Tails NGO',
      role: 'ngo',
      avatar: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=100',
      lastMessage: 'We have received your report. Our team is on the way.',
      timestamp: '15 mins ago',
      unreadCount: 2,
      online: true,
      caseId: 'DOG001235'
    },
    {
      id: '3',
      name: 'Animal Rescue Team',
      role: 'ngo',
      avatar: 'https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=100',
      lastMessage: 'Thank you for the rescue. The puppy is now safe.',
      timestamp: '1 hour ago',
      unreadCount: 0,
      online: false,
      caseId: 'DOG001236'
    }
  ]);

  useEffect(() => {
    if (selectedChat) {
      // Mock messages for the selected chat
      setMessages([
        {
          id: '1',
          senderId: selectedChat.id,
          content: 'Hi! I received your emergency report. Can you provide more details about the dog\'s condition?',
          timestamp: '10:30 AM',
          type: 'text'
        },
        {
          id: '2',
          senderId: user?.id || 'current',
          content: 'Yes, the dog seems to have a injured leg and is not able to walk properly.',
          timestamp: '10:32 AM',
          type: 'text'
        },
        {
          id: '3',
          senderId: user?.id || 'current',
          content: 'I\'ve attached photos of the location and the dog.',
          timestamp: '10:32 AM',
          type: 'text'
        },
        {
          id: '4',
          senderId: selectedChat.id,
          content: selectedChat.lastMessage,
          timestamp: '10:35 AM',
          type: 'text'
        }
      ]);
    }
  }, [selectedChat, user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const message: Message = {
        id: Date.now().toString(),
        senderId: user?.id || 'current',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ngo': return 'text-green-600';
      case 'veterinarian': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'ngo': return '🏠';
      case 'veterinarian': return '🏥';
      default: return '👤';
    }
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-full md:w-1/3 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900 mb-3">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
                selectedChat?.id === chat.id ? 'bg-blue-50 border-blue-200' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-gray-900 truncate">{chat.name}</h3>
                      <span className="text-sm">{getRoleIcon(chat.role)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">{chat.timestamp}</span>
                      {chat.unreadCount > 0 && (
                        <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                  {chat.caseId && (
                    <p className="text-xs text-gray-400 mt-1">Case: {chat.caseId}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-2">
            <button className="flex items-center justify-center space-x-2 p-2 text-sm text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200">
              <Users size={16} />
              <span>NGOs</span>
            </button>
            <button className="flex items-center justify-center space-x-2 p-2 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">
              <Clock size={16} />
              <span>Vets</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className={`flex-1 flex flex-col ${selectedChat ? '' : 'hidden md:flex'}`}>
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={selectedChat.avatar}
                      alt={selectedChat.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {selectedChat.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{selectedChat.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm capitalize ${getRoleColor(selectedChat.role)}`}>
                        {selectedChat.role}
                      </span>
                      {selectedChat.online && <span className="text-xs text-green-500">• Online</span>}
                      {selectedChat.caseId && (
                        <span className="text-xs text-gray-400">• Case: {selectedChat.caseId}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200">
                    <Phone size={20} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200">
                    <Video size={20} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === (user?.id || 'current') ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`message-bubble px-4 py-2 rounded-lg max-w-xs lg:max-w-md ${
                      message.senderId === (user?.id || 'current')
                        ? 'message-sent'
                        : 'message-received'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-75 mt-1">{message.timestamp}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className={`p-2 rounded-full transition-colors duration-200 ${
                    newMessage.trim()
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <Users size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-2">No conversation selected</p>
              <p className="text-sm">Choose a chat from the sidebar to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;