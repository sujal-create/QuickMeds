import express from 'express';

const router = express.Router();

// OpenAI API Configuration
const OPENAI_API_KEY = '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';
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// @desc    Chat with OpenAI
// @route   POST /api/chat
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      });
    }

    const systemPrompt = `You are QuickMeds AI Assistant, a helpful healthcare chatbot for QuickMeds clinic.

IMPORTANT GUIDELINES:
- You provide general health information and guidance
- Always remind users that you're not a replacement for professional medical advice
- For emergencies, direct users to call emergency services (108 in India)
- Be empathetic and professional
- Keep responses concise but helpful (max 200 words)

QUICKMEDS CLINIC INFO:
- Specialties: Orthopedic Surgeon, Cardiologist, Psychiatrist, Endocrinologist, Oncologist
- Phone: +91 7610312515
- Email: sujalrai9617@gmail.com
- Address: Takshila parisar Ha3 rajendranagar indore
- Hours: Mon-Fri 9AM-6PM, Sat 9AM-2PM, Sun Closed

CAPABILITIES:
- Answer general health questions
- Help with appointment booking guidance
- Provide doctor specialty information
- Give emergency contact information
- Offer general wellness advice

Always be helpful and ask if they need assistance with anything else.`;

    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 300,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API Error:', errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    
    res.json({
      success: true,
      message: data.choices[0].message.content
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    
    // Fallback response
    const fallbackResponse = getFallbackResponse(req.body.message || '');
    
    res.json({
      success: true,
      message: fallbackResponse,
      fallback: true
    });
  }
});

// Fallback response function
function getFallbackResponse(userMessage) {
  const message = userMessage.toLowerCase();
  
  // Medical questions
  if (message.includes('symptom') || message.includes('pain') || message.includes('sick')) {
    return "I understand you're experiencing symptoms. While I can provide general information, it's important to consult with our healthcare professionals for proper diagnosis and treatment.\n\n🏥 I recommend:\n• Book an appointment with our specialists\n• For urgent symptoms, visit our clinic immediately\n• Emergency: Call 108\n\nWould you like help booking an appointment?";
  }
  
  // Appointment booking
  if (message.includes('appointment') || message.includes('book')) {
    return "I'd be happy to help you book an appointment! 📅\n\nOur available specialties:\n• Orthopedic Surgeon \n• Genral physician \n• Dermatologist \n• Gynecologist \n• Pediatrician \n• Neurologist \n• Gastroenterologist \n• Cardiologist\n• Psychiatrist\n• Endocrinologist\n• Oncologist\n\n📞 To book: Call +91 7610312515\n📧 Email: sujalrai9617@gmail.com";
  }
  
  // Emergency
  if (message.includes('emergency') || message.includes('urgent')) {
    return "🚨 EMERGENCY INFORMATION:\n\n• India Emergency: 108\n• Ambulance: 102\n\n🏥 QuickMeds Clinic:\n📞 +91 7610312515\n📍 Takshila parisar Ha3 rajendranagar indore\n\n⚠️ For life-threatening emergencies, call 108 immediately!";
  }
  
  // Contact
  if (message.includes('contact') || message.includes('phone')) {
    return "📞 CONTACT INFORMATION:\n\n• Phone: +91 7610312515\n• Email: sujalrai9617@gmail.com\n• Address: Takshila parisar Ha3 rajendranagar indore\n\n🕒 Hours: Mon-Fri 9AM-6PM, Sat 9AM-2PM, Sun Closed";
  }
  
  // Default
  return "Thank you for reaching out to QuickMeds! 🏥\n\nI can help you with:\n• 📅 Appointment booking\n• 👨‍⚕️ Doctor information\n• 🏥 Clinic details\n• 🚨 Emergency contacts\n\n📞 For immediate assistance: +91 7610312515\n\nWhat can I help you with today?";
}

export default router;
