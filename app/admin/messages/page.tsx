"use client";

import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { toast } from "react-toastify";
import { Trash2, CheckCircle, Mail, MessageSquare } from "lucide-react";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await api.get("/api/messages");
      if (res.data.success) {
        setMessages(res.data.messages);
      }
    } catch (error) {
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const res = await api.put(`/api/messages/${id}/read`);
      if (res.data.success) {
        setMessages(messages.map(msg => msg._id === id ? { ...msg, read: true } : msg));
      }
    } catch (error) {
      toast.error("Failed to update message");
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await api.delete(`/api/messages/${id}`);
      if (res.data.success) {
        setMessages(messages.filter(msg => msg._id !== id));
        toast.success("Message deleted");
      }
    } catch (error) {
      toast.error("Failed to delete message");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
          <MessageSquare size={24} className="text-primary-500" /> Contact Messages
        </h1>
      </div>

      <div className="bg-white dark:bg-[#0a0a0a] rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
        {messages.length === 0 ? (
          <div className="p-12 text-center text-neutral-500">
            <Mail size={32} className="mx-auto mb-4 text-neutral-300 dark:text-neutral-700" />
            <p>No messages received yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {messages.map((msg) => (
              <div key={msg._id} className={`p-6 transition-colors ${!msg.read ? 'bg-primary-50/50 dark:bg-primary-900/20' : ''}`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <h3 className={`text-base ${!msg.read ? 'font-bold text-neutral-900 dark:text-white' : 'font-medium text-neutral-700 dark:text-neutral-300'}`}>
                      {msg.name}
                    </h3>
                    <span className="text-sm text-neutral-500">({msg.email})</span>
                    {!msg.read && (
                      <span className="px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 text-xs font-bold">
                        NEW
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-400 mr-2">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                    {!msg.read && (
                      <button 
                        onClick={() => markAsRead(msg._id)}
                        className="p-1.5 text-neutral-400 hover:text-primary-500 transition-colors tooltip-trigger relative"
                        title="Mark as read"
                      >
                        <CheckCircle size={18} />
                      </button>
                    )}
                    <button 
                      onClick={() => deleteMessage(msg._id)}
                      className="p-1.5 text-neutral-400 hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                
                <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                  Subject: {msg.subject}
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 whitespace-pre-wrap bg-neutral-50 dark:bg-[#141414] p-4 rounded-lg border border-neutral-100 dark:border-neutral-800 mt-2">
                  {msg.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
