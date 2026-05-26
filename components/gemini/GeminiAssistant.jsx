"use client";
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";
import { getLeatherCareAdvice } from "./geminiService";

const INITIAL_MESSAGE = {
  role: "model",
  text: "Hello! I'm your FirmLeather Care Specialist. Ask me how to care for your leather goods or about our leather types.",
};

const ASSISTANT_META = {
  name: "Leather Care Assistant",
  placeholder: "Ask about leather care...",
};

const LOADING_DOTS = [
  { id: "dot-1", delay: "0ms" },
  { id: "dot-2", delay: "150ms" },
  { id: "dot-3", delay: "300ms" },
];

const CHATBOT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ChatBot",
  name: ASSISTANT_META.name,
  provider: "FirmLeather",
  description: "AI-powered leather care and product information assistant",
  availableLanguage: "en",
};

const ChatHeader = React.memo(({ onClose }) => (
  <div className="bg-primary p-4 flex justify-between items-center text-white">
    <div className="flex items-center space-x-2">
      <Sparkles size={18} className="text-yellow-400" aria-hidden="true" />
      <h3 className="font-medium text-sm">{ASSISTANT_META.name}</h3>
    </div>
    <button
      onClick={onClose}
      aria-label="Close chat assistant"
      className="hover:bg-primary-hover p-1 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-white"
    >
      <X size={18} aria-hidden="true" />
    </button>
  </div>
));

ChatHeader.displayName = "ChatHeader";

const ChatMessage = React.memo(({ message, isUser }) => (
  <div
    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    role="article"
    aria-label={`${isUser ? "Your" : "Assistant"} message: ${message.text}`}
  >
    <div
      className={`max-w-[80%] rounded-lg p-3 text-sm ${
        isUser
          ? "bg-primary text-white rounded-br-none"
          : "bg-white border border-stone-200 text-stone-700 shadow-sm rounded-bl-none"
      }`}
    >
      {message.text}
    </div>
  </div>
));

ChatMessage.displayName = "ChatMessage";

const LoadingIndicator = React.memo(() => (
  <div
    className="flex justify-start"
    role="status"
    aria-live="polite"
    aria-label="Assistant is typing"
  >
    <div className="bg-white border border-stone-200 rounded-lg p-3 shadow-sm rounded-bl-none">
      <div className="flex space-x-1">
        {LOADING_DOTS.map((dot) => (
          <div
            key={dot.id}
            className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"
            style={{ animationDelay: dot.delay }}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  </div>
));

LoadingIndicator.displayName = "LoadingIndicator";

const ChatInput = React.memo(
  ({ value, onChange, onSend, isLoading, onKeyDown }) => (
    <div className="p-3 bg-white border-t border-stone-200 flex space-x-2">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={ASSISTANT_META.placeholder}
        aria-label="Message input"
        disabled={isLoading}
        className="grow text-sm border border-stone-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-leather-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      />
      <button
        onClick={onSend}
        disabled={isLoading || !value.trim()}
        aria-label="Send message"
        title="Send message (or press Enter)"
        className="bg-leather-800 text-white p-2 rounded-md hover:bg-leather-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-leather-500"
      >
        <Send size={18} aria-hidden="true" />
      </button>
    </div>
  ),
);

ChatInput.displayName = "ChatInput";

const MessagesContainer = React.memo(({ messages, isLoading, scrollRef }) => (
  <div
    ref={scrollRef}
    className="h-80 overflow-y-auto p-4 bg-stone-50 space-y-4"
    role="log"
    aria-live="polite"
    aria-label="Chat messages"
  >
    {messages.map((msg, idx) => (
      <ChatMessage
        key={`msg-${idx}`}
        message={msg}
        isUser={msg.role === "user"}
      />
    ))}
    {isLoading && <LoadingIndicator />}
  </div>
));

MessagesContainer.displayName = "MessagesContainer";

const ChatWindow = React.memo(
  ({
    isOpen,
    messages,
    isLoading,
    input,
    onInput,
    onSend,
    onClose,
    scrollRef,
  }) => {
    const handleKeyDown = useCallback(
      (e) => {
        if (e.key === "Enter" && !isLoading && input.trim()) {
          onSend();
        }
      },
      [isLoading, input, onSend],
    );

    if (!isOpen) return null;

    return (
      <div className="mb-4 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 fade-in duration-200">
        <ChatHeader onClose={onClose} />
        <MessagesContainer
          messages={messages}
          isLoading={isLoading}
          scrollRef={scrollRef}
        />
        <ChatInput
          value={input}
          onChange={(e) => onInput(e.target.value)}
          onSend={onSend}
          isLoading={isLoading}
          onKeyDown={handleKeyDown}
        />
      </div>
    );
  },
);

ChatWindow.displayName = "ChatWindow";

const ToggleButton = React.memo(({ isOpen, onClick }) => (
  <button
    onClick={onClick}
    aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
    aria-pressed={isOpen}
    className="bg-primary hover:bg-primary-hover text-white p-4 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
  >
    {isOpen ? (
      <X size={24} aria-hidden="true" />
    ) : (
      <MessageSquare size={24} aria-hidden="true" />
    )}
  </button>
));

ToggleButton.displayName = "ToggleButton";

const GeminiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setIsLoading(true);

    try {
      const responseText = await getLeatherCareAdvice(userMsg);
      setMessages((prev) => [...prev, { role: "model", text: responseText }]);
    } catch (error) {
      console.error("Failed to get leather care advice:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "Sorry, I encountered an issue processing your request. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading]);

  const handleInputChange = useCallback((value) => {
    setInput(value);
  }, []);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const chatbotSchema = useMemo(() => CHATBOT_SCHEMA, []);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(chatbotSchema) }}
      />

      <div
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
        aria-label="Chat assistant widget"
      >
        <ChatWindow
          isOpen={isOpen}
          messages={messages}
          isLoading={isLoading}
          input={input}
          onInput={handleInputChange}
          onSend={handleSend}
          onClose={handleClose}
          scrollRef={scrollRef}
        />
        <ToggleButton isOpen={isOpen} onClick={handleToggle} />
      </div>
    </>
  );
};

export default GeminiAssistant;
