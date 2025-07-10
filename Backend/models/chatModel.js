import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      index: true
    },
    userMessage: {
      type: String,
      required: true
    },
    botResponse: {
      type: String,
      required: true
    },
    userEmail: {
      type: String,
      default: null
    },
    userName: {
      type: String,
      default: 'Anonymous'
    },
    messageType: {
      type: String,
      enum: ['general', 'appointment', 'emergency', 'doctor_inquiry', 'medical_question'],
      default: 'general'
    },
    isResolved: {
      type: Boolean,
      default: false
    },
    needsHumanAssistance: {
      type: Boolean,
      default: false
    },
    metadata: {
      userAgent: String,
      ipAddress: String,
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
  },
  {
    timestamps: true,
  }
);

// Index for efficient querying
chatMessageSchema.index({ sessionId: 1, createdAt: -1 });
chatMessageSchema.index({ userEmail: 1, createdAt: -1 });
chatMessageSchema.index({ needsHumanAssistance: 1, createdAt: -1 });

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

export default ChatMessage;
