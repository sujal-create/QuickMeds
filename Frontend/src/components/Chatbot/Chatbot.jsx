import { useState, useEffect, useRef } from "react";
import {
  FaComments,
  FaTimes,
  FaPaperPlane,
  FaRobot,
  FaUser
} from "react-icons/fa";
import "./Chatbot.css";

const MAIN_OPTIONS = [
  "Book an appointment",
  "Find a doctor",
  "Medical questions",
  "Emergency help",
  "Contact information"
];

const Chatbot = () => {

  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm QuickMeds AI Assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
      options: MAIN_OPTIONS,
      showSatisfaction: false
    }
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // BOT RESPONSE FUNCTION
  const getBotResponse = (message) => {

    const msg = message.toLowerCase();

    if (msg.includes("appointment") || msg.includes("book")) {
      return {
        text: "📅 You can book an appointment by calling +91 7610312515 or visiting our clinic.",
        options: ["Yes", "No"],
        showSatisfaction: true
      };
    }

    if (msg.includes("doctor")) {
      return {
        text: "👨‍⚕️ We have specialists like Cardiologist, Dermatologist, Pediatrician and more.",
        options: ["Yes", "No"],
        showSatisfaction: true
      };
    }

    if (msg.includes("medical")) {
      return {
        text: "🩺 Please describe your medical issue so I can guide you better.",
        options: ["Yes", "No"],
        showSatisfaction: true
      };
    }

    if (msg.includes("emergency")) {
      return {
        text: "🚨 For emergency please call 108 immediately.",
        options: ["Yes", "No"],
        showSatisfaction: true
      };
    }

    if (msg.includes("contact")) {
      return {
        text: "📞 Phone: +91 7610312515\n📧 Email: sujalrai9617@gmail.com\n📍 Address: Rajendra Nagar, Indore",
        options: ["Yes", "No"],
        showSatisfaction: true
      };
    }

    return {
      text: "🤖 I can help with appointments, doctors, medical questions or emergency help.",
      options: ["Yes", "No"],
      showSatisfaction: true
    };

  };

  // SEND MESSAGE
  const handleSendMessage = () => {

    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);

    setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {

      const botReply = getBotResponse(inputMessage);

      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: botReply.text,
          sender: "bot",
          timestamp: new Date(),
          options: botReply.options,
          showSatisfaction: botReply.showSatisfaction
        }
      ]);

      setIsTyping(false);

    }, 800);
  };

  // QUICK REPLY
  const handleQuickReply = (reply, messageId) => {

    // Disable clicked message options
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? { ...msg, optionsDisabled: true }
          : msg
      )
    );

    const userMessage = {
      id: messages.length + 1,
      text: reply,
      sender: "user",
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);

    // YES CLICKED
    if (reply === "Yes") {

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: "🙏 Thank you! I'm glad I could help.",
            sender: "bot",
            timestamp: new Date(),
            options: MAIN_OPTIONS,
            showSatisfaction: false
          }
        ]);
      }, 500);

      return;
    }

    // NO CLICKED
    if (reply === "No") {

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: "No problem! Please choose another option.",
            sender: "bot",
            timestamp: new Date(),
            options: MAIN_OPTIONS,
            showSatisfaction: false
          }
        ]);
      }, 500);

      return;
    }

    // NORMAL FLOW
    setIsTyping(true);

    setTimeout(() => {

      const botReply = getBotResponse(reply);

      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: botReply.text,
          sender: "bot",
          timestamp: new Date(),
          options: botReply.options,
          showSatisfaction: botReply.showSatisfaction
        }
      ]);

      setIsTyping(false);

    }, 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (

    <div className="chatbot-container">

      {isOpen && (

        <div className="chat-window">

          <div className="chat-header">

            <div className="chat-header-info">
              <FaRobot />
              <h4>QuickMeds Bot</h4>
            </div>

            <button onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>

          </div>

          <div className="messages-area">

            {messages.map((msg) => (

              <div key={msg.id} className={`message ${msg.sender}`}>

                <div className="message-avatar">
                  {msg.sender === "bot" ? <FaRobot /> : <FaUser />}
                </div>

                <div className="message-content">

                  <div className="message-text">{msg.text}</div>

                  {msg.options && (

                    <div className="quick-replies">

                      {msg.showSatisfaction && (
                        <div className="satisfaction-text">
                          Are you satisfied with this answer?
                        </div>
                      )}

                      {msg.options.map((opt, idx) => (

                        <button
                          key={idx}
                          className="quick-reply-btn"
                          onClick={() => handleQuickReply(opt, msg.id)}
                          disabled={msg.optionsDisabled}
                        >
                          {opt}
                        </button>

                      ))}

                    </div>

                  )}

                </div>

              </div>

            ))}

            {isTyping && (
              <div className="message bot">
                <div className="message-avatar">
                  <FaRobot />
                </div>
                <div className="typing-indicator">typing...</div>
              </div>
            )}

            <div ref={messagesEndRef} />

          </div>

          <div className="chat-input-area">
 
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
                 
            />
<button onClick={handleSendMessage}>
              <FaPaperPlane />
            </button>
           

          </div>

        </div>

      )}

      <button
        className="chat-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaComments />
      </button>

    </div>
  );
};

export default Chatbot;