import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { Send, Search } from 'lucide-react';
import { mockMessages } from '../data/mockData';
import { toast } from 'sonner';

export function Messages() {
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState(mockMessages);

  const contacts = Array.from(new Set(
    messages.map(m => m.senderId === 'b1' ? m.receiverId : m.senderId)
  )).map(id => {
    const message = messages.find(m => m.senderId === id || m.receiverId === id);
    return {
      id,
      name: message?.senderId === id ? message.senderName : message?.receiverName || '',
      lastMessage: messages.filter(m => m.senderId === id || m.receiverId === id).slice(-1)[0],
      unread: messages.filter(m => m.senderId === id && !m.read).length,
    };
  });

  const selectedMessages = selectedContact 
    ? messages.filter(m => m.senderId === selectedContact || m.receiverId === selectedContact)
    : [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedContact) return;

    const newMessage = {
      id: `m${messages.length + 1}`,
      senderId: 'b1',
      senderName: 'Demo User',
      receiverId: selectedContact,
      receiverName: contacts.find(c => c.id === selectedContact)?.name || '',
      content: messageText,
      timestamp: new Date().toISOString(),
      read: false,
    };

    setMessages([...messages, newMessage]);
    setMessageText('');
    toast.success('Message sent!');
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Messages</h1>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">Connect with farmers, buyers, and sellers</p>
      </div>

      <Card className="bg-[var(--card)] border-[var(--border-color)]">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
            {/* Contacts List */}
            <div className="border-r border-[var(--border-color)]">
              <div className="p-4 border-b border-[var(--border-color)]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                  <Input 
                    placeholder="Search contacts..." 
                    className="pl-10 border-[var(--border-color)]"
                  />
                </div>
              </div>
              <ScrollArea className="h-[calc(600px-73px)]">
                <div className="divide-y divide-emerald-100">
                  {contacts.map((contact) => (
                    <button
                      key={contact.id}
                      onClick={() => setSelectedContact(contact.id)}
                      className={`w-full p-4 text-left hover:bg-emerald-50 transition-colors ${
                        selectedContact === contact.id ? 'bg-[var(--pale-green)]' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-emerald-200 text-[var(--text-primary)]">
                            {contact.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-[var(--text-primary)] truncate">
                              {contact.name}
                            </h4>
                            {contact.unread > 0 && (
                              <Badge className="bg-[var(--primary-green)] h-5 min-w-5 flex items-center justify-center">
                                {contact.unread}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-[var(--text-muted)] truncate">
                            {contact.lastMessage?.content}
                          </p>
                          <p className="text-xs text-emerald-500 mt-1">
                            {formatTime(contact.lastMessage?.timestamp || '')}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Messages Area */}
            <div className="col-span-2 flex flex-col">
              {selectedContact ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-[var(--border-color)] bg-emerald-50">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-emerald-200 text-[var(--text-primary)]">
                          {contacts.find(c => c.id === selectedContact)?.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-[var(--text-primary)]">
                          {contacts.find(c => c.id === selectedContact)?.name}
                        </h3>
                        <p className="text-sm text-[var(--text-muted)]">Active now</p>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {selectedMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.senderId === 'b1' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                              message.senderId === 'b1'
                                ? 'bg-[var(--primary-green)] text-white'
                                : 'bg-[var(--pale-green)] text-[var(--text-primary)]'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${
                              message.senderId === 'b1' ? 'text-emerald-100' : 'text-[var(--text-muted)]'
                            }`}>
                              {formatTime(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  {/* Message Input */}
                  <form onSubmit={handleSendMessage} className="p-4 border-t border-[var(--border-color)]">
                    <div className="flex gap-2">
                      <Input
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 border-[var(--border-color)]"
                      />
                      <Button type="submit" className="bg-[var(--primary-green)] hover:bg-[var(--medium-green)]">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-[var(--text-muted)]">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[var(--pale-green)] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-[var(--text-muted)]" />
                    </div>
                    <p>Select a contact to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
