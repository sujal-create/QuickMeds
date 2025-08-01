import { useState, useEffect, useRef } from 'react';
import {
  FaComments,
  FaTimes,
  FaPaperPlane,
  FaRobot,
  FaUser
} from 'react-icons/fa';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm QuickMeds AI Assistant. I can help you with medical questions, appointment booking, and general healthcare guidance.\n\n👨‍⚕️ Our 11 Specialties:\n• General Physicians • Dermatologists • Pediatricians\n• Neurologists • Gastroenterologists • Gynecologists\n• Oncologists • Psychiatrists • Endocrinologists\n• Cardiologists • Orthopedic Surgeons\n\nHow can I assist you today?",
      sender: 'bot',
      timestamp: new Date(),
      options: [
        'Book an appointment',
        'Find a doctor',
        'Medical questions',
        'Emergency help',
        'Contact information'
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getIntelligentResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    // Health symptoms and conditions (comprehensive list)
    if (message.includes('symptom') || message.includes('pain') || message.includes('fever') ||
        message.includes('headache') || message.includes('cough') || message.includes('cold') ||
        message.includes('stomach') || message.includes('back') || message.includes('chest') ||
        message.includes('dizzy') || message.includes('nausea') || message.includes('tired') ||
        message.includes('fatigue') || message.includes('sore') || message.includes('ache') ||
        message.includes('migraine') || message.includes('vomit') || message.includes('diarrhea') ||
        message.includes('constipation') || message.includes('rash') || message.includes('itch') ||
        message.includes('swelling') || message.includes('bruise') || message.includes('cut') ||
        message.includes('burn') || message.includes('sprain') || message.includes('fracture') ||
        message.includes('bleeding') || message.includes('infection') || message.includes('allergy') ||
        message.includes('asthma') || message.includes('diabetes') || message.includes('hypertension') ||
        message.includes('anxiety') || message.includes('depression') || message.includes('stress') ||
        message.includes('insomnia') || message.includes('sleep') || message.includes('breathe') ||
        message.includes('shortness') || message.includes('palpitation') || message.includes('irregular')) {
      return "🩺 I understand you're experiencing symptoms.\n\n• Book appointment for proper diagnosis\n• Emergency? Call 108 immediately\n• Our specialists provide comprehensive care\n\n📞 Contact: +91 7610312515";
    }

    // Appointment booking (extensive keywords)
    if (message.includes('appointment') || message.includes('book') || message.includes('schedule') ||
        message.includes('visit') || message.includes('consultation') || message.includes('checkup') ||
        message.includes('meet') || message.includes('see doctor') || message.includes('reserve') ||
        message.includes('slot') || message.includes('timing') || message.includes('available') ||
        message.includes('today') || message.includes('tomorrow') || message.includes('next week') ||
        message.includes('urgent') || message.includes('asap') || message.includes('soon') ||
        message.includes('cancel') || message.includes('reschedule') || message.includes('change')) {
      return "📅 Book Your Appointment:\n\n• 📞 Call: +91 7610312515\n• 📧 Email: sujalrai9617@gmail.com\n• 🏥 Visit: Takshila parisar Ha3 rajendranagar indore\n\n👨‍⚕️ Available Specialists:\n• General Physicians • Dermatologists • Pediatricians\n• Neurologists • Gastroenterologists • Gynecologists\n• Oncologists • Psychiatrists • Endocrinologists\n• Cardiologists • Orthopedic Surgeons";
    }

    // Specific medical condition-based doctor suggestions

    // Heart-related problems
    if (message.includes('heart') || message.includes('chest pain') || message.includes('cardiac') ||
        message.includes('blood pressure') || message.includes('hypertension') || message.includes('palpitation') ||
        message.includes('heart attack') || message.includes('cardiovascular') || message.includes('cholesterol')) {
      return "🫀 For Heart-Related Problems:\n\n• 🫀 Cardiologists - Heart specialists\n• 🩺 General Physicians - Initial consultation\n\n💡 Recommended: Start with Cardiologist for heart issues\n📞 Book appointment: +91 7610312515";
    }

    // Stomach/Digestive problems
    if (message.includes('stomach') || message.includes('digestive') || message.includes('gastro') ||
        message.includes('acid') || message.includes('ulcer') || message.includes('indigestion') ||
        message.includes('constipation') || message.includes('diarrhea') || message.includes('bloating') ||
        message.includes('abdominal') || message.includes('intestine') || message.includes('liver')) {
      return "🍽️ For Stomach/Digestive Problems:\n\n• 🍽️ Gastroenterologists - Digestive specialists\n• 🩺 General Physicians - Initial consultation\n\n💡 Recommended: Gastroenterologist for stomach issues\n📞 Book appointment: +91 7610312515";
    }

    // Skin problems
    if (message.includes('skin') || message.includes('rash') || message.includes('acne') ||
        message.includes('eczema') || message.includes('psoriasis') || message.includes('dermatitis') ||
        message.includes('mole') || message.includes('hair') || message.includes('nail') ||
        message.includes('allergy') || message.includes('itch') || message.includes('pigmentation')) {
      return "🧴 For Skin Problems:\n\n• 🧴 Dermatologists - Skin specialists\n• 🩺 General Physicians - Basic skin issues\n\n💡 Recommended: Dermatologist for skin conditions\n📞 Book appointment: +91 7610312515";
    }

    // Mental health problems
    if (message.includes('mental') || message.includes('depression') || message.includes('anxiety') ||
        message.includes('stress') || message.includes('panic') || message.includes('mood') ||
        message.includes('psychiatric') || message.includes('counseling') || message.includes('therapy') ||
        message.includes('bipolar') || message.includes('schizophrenia') || message.includes('ptsd')) {
      return "💭 For Mental Health Issues:\n\n• 💭 Psychiatrists - Mental health specialists\n• 🩺 General Physicians - Initial consultation\n\n💡 Recommended: Psychiatrist for mental health support\n📞 Book appointment: +91 7610312515";
    }

    // Bone/Joint problems
    if (message.includes('bone') || message.includes('joint') || message.includes('orthopedic') ||
        message.includes('fracture') || message.includes('arthritis') || message.includes('back pain') ||
        message.includes('knee') || message.includes('shoulder') || message.includes('spine') ||
        message.includes('muscle') || message.includes('ligament') || message.includes('sports injury')) {
      return "🦴 For Bone/Joint Problems:\n\n• 🦴 Orthopedic Surgeons - Bone & joint specialists\n• 🩺 General Physicians - Initial consultation\n\n💡 Recommended: Orthopedic Surgeon for bone/joint issues\n📞 Book appointment: +91 7610312515";
    }

    // Brain/Neurological problems
    if (message.includes('brain') || message.includes('neurological') || message.includes('migraine') ||
        message.includes('seizure') || message.includes('stroke') || message.includes('epilepsy') ||
        message.includes('parkinson') || message.includes('alzheimer') || message.includes('memory') ||
        message.includes('numbness') || message.includes('paralysis') || message.includes('tremor')) {
      return "🧠 For Brain/Neurological Problems:\n\n• 🧠 Neurologists - Brain & nervous system specialists\n• 🩺 General Physicians - Initial consultation\n\n💡 Recommended: Neurologist for brain/nerve issues\n📞 Book appointment: +91 7610312515";
    }

    // Women's health problems
    if (message.includes('women') || message.includes('pregnancy') || message.includes('gynecological') ||
        message.includes('menstrual') || message.includes('period') || message.includes('ovarian') ||
        message.includes('uterine') || message.includes('breast') || message.includes('pcos') ||
        message.includes('menopause') || message.includes('fertility') || message.includes('contraception')) {
      return "👩‍⚕️ For Women's Health Issues:\n\n• 👩‍⚕️ Gynecologists - Women's health specialists\n• 🩺 General Physicians - Basic women's health\n\n💡 Recommended: Gynecologist for women's health concerns\n📞 Book appointment: +91 7610312515";
    }

    // Child health problems
    if (message.includes('child') || message.includes('baby') || message.includes('pediatric') ||
        message.includes('infant') || message.includes('toddler') || message.includes('vaccination') ||
        message.includes('growth') || message.includes('development') || message.includes('newborn') ||
        message.includes('kids') || message.includes('teenager') || message.includes('adolescent')) {
      return "👶 For Child Health Issues:\n\n• 👶 Pediatricians - Child health specialists\n• 🩺 General Physicians - Basic child care\n\n💡 Recommended: Pediatrician for children's health\n📞 Book appointment: +91 7610312515";
    }

    // Cancer-related problems
    if (message.includes('cancer') || message.includes('tumor') || message.includes('oncology') ||
        message.includes('chemotherapy') || message.includes('radiation') || message.includes('malignant') ||
        message.includes('benign') || message.includes('biopsy') || message.includes('metastasis') ||
        message.includes('lymphoma') || message.includes('leukemia') || message.includes('carcinoma')) {
      return "🎗️ For Cancer-Related Concerns:\n\n• 🎗️ Oncologists - Cancer specialists\n• 🩺 General Physicians - Initial screening\n\n💡 Recommended: Oncologist for cancer treatment\n📞 Book appointment: +91 7610312515";
    }

    // Hormone/Diabetes problems
    if (message.includes('diabetes') || message.includes('hormone') || message.includes('thyroid') ||
        message.includes('insulin') || message.includes('blood sugar') || message.includes('endocrine') ||
        message.includes('metabolism') || message.includes('weight gain') || message.includes('weight loss') ||
        message.includes('pituitary') || message.includes('adrenal') || message.includes('testosterone')) {
      return "🩺 For Hormone/Diabetes Issues:\n\n• 🩺 Endocrinologists - Hormone & diabetes specialists\n• 🩺 General Physicians - Basic diabetes care\n\n💡 Recommended: Endocrinologist for hormone disorders\n📞 Book appointment: +91 7610312515";
    }

    // General doctor query (when no specific condition mentioned)
    if (message.includes('doctor') || message.includes('specialist') || message.includes('physician')) {
      return "👨‍⚕️ Which type of doctor do you need?\n\nPlease tell me about your specific health concern:\n• Heart problems? → Cardiologist\n• Stomach issues? → Gastroenterologist\n• Skin problems? → Dermatologist\n• Mental health? → Psychiatrist\n• Bone/joint pain? → Orthopedic Surgeon\n• Brain/nerve issues? → Neurologist\n• Women's health? → Gynecologist\n• Child health? → Pediatrician\n• Cancer concerns? → Oncologist\n• Diabetes/hormones? → Endocrinologist\n• General checkup? → General Physician\n\n📞 Call: +91 7610312515";
    }

    // Emergency situations (comprehensive)
    if (message.includes('emergency') || message.includes('urgent') || message.includes('help') ||
        message.includes('serious') || message.includes('critical') || message.includes('ambulance') ||
        message.includes('911') || message.includes('108') || message.includes('accident') ||
        message.includes('injury') || message.includes('trauma') || message.includes('unconscious') ||
        message.includes('seizure') || message.includes('stroke') || message.includes('heart attack') ||
        message.includes('choking') || message.includes('overdose') || message.includes('poison') ||
        message.includes('severe') || message.includes('intense') || message.includes('unbearable') ||
        message.includes('can\'t breathe') || message.includes('chest pain') || message.includes('dying')) {
      return "🚨 MEDICAL EMERGENCY:\n\n• Call 108 IMMEDIATELY\n• Visit nearest hospital\n• Our clinic: Takshila parisar Ha3 rajendranagar indore\n• Emergency: +91 7610312515\n\n⚠️ Don't delay for serious conditions!";
    }

    // Contact information (extensive)
    if (message.includes('contact') || message.includes('email') || message.includes('phone') ||
        message.includes('address') || message.includes('location') || message.includes('where') ||
        message.includes('reach') || message.includes('call') || message.includes('number') ||
        message.includes('directions') || message.includes('map') || message.includes('find') ||
        message.includes('office') || message.includes('clinic') || message.includes('hospital') ||
        message.includes('building') || message.includes('floor') || message.includes('room')) {
      return "📞 Contact QuickMeds:\n\n• Phone: +91 7610312515\n• Email: sujalrai9617@gmail.com\n• Address: Takshila parisar Ha3 rajendranagar indore\n\n🗺️ Easily accessible location\n⏰ Available for consultations";
    }

    // Greetings and social interactions (comprehensive)
    if (message.includes('hello') || message.includes('hi') || message.includes('hey') ||
        message.includes('good morning') || message.includes('good afternoon') || message.includes('good evening') ||
        message.includes('greetings') || message.includes('howdy') || message.includes('sup') ||
        message.includes('yo') || message.includes('hola') || message.includes('namaste') ||
        message.includes('salaam') || message.includes('bonjour') || message.includes('guten tag') ||
        message.includes('konnichiwa') || message.includes('shalom') || message.includes('aloha')) {
      return "Hello! Welcome to QuickMeds! 👋\n\nI'm here to help with:\n• Medical advice\n• Appointment booking\n• Specialist consultations\n• Health questions\n\nHow can I assist you today?";
    }

    // Thank you responses (comprehensive)
    if (message.includes('thank') || message.includes('thanks') || message.includes('appreciate') ||
        message.includes('grateful') || message.includes('awesome') || message.includes('great') ||
        message.includes('excellent') || message.includes('wonderful') || message.includes('amazing') ||
        message.includes('helpful') || message.includes('useful') || message.includes('good job') ||
        message.includes('well done') || message.includes('perfect') || message.includes('brilliant')) {
      return "You're very welcome! 😊\n\nI'm glad I could help!\n\n• More medical questions?\n• Need an appointment?\n• Want specialist info?\n\nFeel free to ask anytime!";
    }

    // Medication queries (comprehensive)
    if (message.includes('medicine') || message.includes('medication') || message.includes('drug') ||
        message.includes('prescription') || message.includes('pill') || message.includes('tablet') ||
        message.includes('capsule') || message.includes('syrup') || message.includes('injection') ||
        message.includes('vaccine') || message.includes('antibiotic') || message.includes('painkiller') ||
        message.includes('vitamin') || message.includes('supplement') || message.includes('dose') ||
        message.includes('dosage') || message.includes('side effect') || message.includes('allergy') ||
        message.includes('interaction') || message.includes('generic') || message.includes('brand')) {
      return "💊 Medication Guidance:\n\n• Consult our doctors for prescriptions\n• Never self-medicate\n• Book appointment for personalized advice\n\n🩺 Our specialists help with:\n• Prescription medications • Drug interactions\n• Side effects • Dosage adjustments\n\n📞 Call: +91 7610312515";
    }

    // Insurance and payment (comprehensive)
    if (message.includes('insurance') || message.includes('payment') || message.includes('cost') ||
        message.includes('price') || message.includes('fee') || message.includes('charge') ||
        message.includes('bill') || message.includes('billing') || message.includes('money') ||
        message.includes('expensive') || message.includes('cheap') || message.includes('affordable') ||
        message.includes('discount') || message.includes('offer') || message.includes('cashless') ||
        message.includes('card') || message.includes('cash') || message.includes('emi') ||
        message.includes('installment') || message.includes('claim') || message.includes('coverage')) {
      return "💳 Payment & Insurance:\n\n📞 Call: +91 7610312515\n📧 Email: sujalrai9617@gmail.com\n\n💰 We accept:\n• Cash payments • Card payments\n• Insurance claims • EMI options\n\n✅ Detailed cost information available";
    }

    // Hours and availability (comprehensive)
    if (message.includes('hours') || message.includes('open') || message.includes('closed') ||
        message.includes('time') || message.includes('available') || message.includes('when') ||
        message.includes('timing') || message.includes('schedule') || message.includes('working') ||
        message.includes('office hours') || message.includes('clinic hours') || message.includes('weekend') ||
        message.includes('holiday') || message.includes('sunday') || message.includes('saturday') ||
        message.includes('monday') || message.includes('tuesday') || message.includes('wednesday') ||
        message.includes('thursday') || message.includes('friday') || message.includes('morning') ||
        message.includes('afternoon') || message.includes('evening') || message.includes('night')) {
      return "⏰ Operating Hours:\n\n📞 Call: +91 7610312515\n\n✅ We offer:\n• Flexible scheduling\n• Weekend appointments\n• Emergency consultations\n• Various time slots\n\n🗓️ Contact us for doctor availability!";
    }

    // General health advice (comprehensive)
    if (message.includes('health') || message.includes('wellness') || message.includes('fitness') ||
        message.includes('diet') || message.includes('exercise') || message.includes('lifestyle') ||
        message.includes('nutrition') || message.includes('weight') || message.includes('obesity') ||
        message.includes('smoking') || message.includes('alcohol') || message.includes('addiction') ||
        message.includes('prevention') || message.includes('checkup') || message.includes('screening') ||
        message.includes('vaccination') || message.includes('immunity') || message.includes('hygiene') ||
        message.includes('mental health') || message.includes('stress') || message.includes('meditation')) {
      return "🌟 Good Health Tips:\n\n• Regular checkups • Balanced nutrition\n• Exercise regularly • Manage stress\n• Adequate sleep • Avoid harmful substances\n\n🩺 Our specialists create personalized wellness plans!\n📞 Schedule consultation: +91 7610312515";
    }

    // Technology and digital health (comprehensive)
    if (message.includes('app') || message.includes('website') || message.includes('online') ||
        message.includes('digital') || message.includes('telemedicine') || message.includes('video call') ||
        message.includes('virtual') || message.includes('remote') || message.includes('internet') ||
        message.includes('mobile') || message.includes('computer') || message.includes('software') ||
        message.includes('portal') || message.includes('login') || message.includes('account') ||
        message.includes('password') || message.includes('registration') || message.includes('download')) {
      return "💻 Digital Healthcare Solutions:\n\n🔄 We're exploring:\n• Online appointment booking\n• Digital health records\n• Telemedicine options\n• Mobile-friendly services\n\n📞 Current bookings: +91 7610312515\n✨ Making healthcare more accessible!";
    }

    // Weather and seasonal health (comprehensive)
    if (message.includes('weather') || message.includes('season') || message.includes('winter') ||
        message.includes('summer') || message.includes('monsoon') || message.includes('rain') ||
        message.includes('hot') || message.includes('cold') || message.includes('humidity') ||
        message.includes('pollution') || message.includes('air quality') || message.includes('allergy season') ||
        message.includes('flu season') || message.includes('heat stroke') || message.includes('dehydration')) {
      return "🌤️ Seasonal Health Care:\n\n• ☀️ Summer: Stay hydrated, avoid heat stroke\n• ❄️ Winter: Prevent cold, flu, respiratory issues\n• 🌧️ Monsoon: Watch waterborne diseases\n• 🏭 Pollution: Protect respiratory health\n\n📞 Seasonal advice: +91 7610312515";
    }

    // Age-specific health (comprehensive)
    if (message.includes('child') || message.includes('baby') || message.includes('infant') ||
        message.includes('pediatric') || message.includes('teenager') || message.includes('elderly') ||
        message.includes('senior') || message.includes('old age') || message.includes('pregnancy') ||
        message.includes('pregnant') || message.includes('maternity') || message.includes('newborn') ||
        message.includes('adolescent') || message.includes('youth') || message.includes('adult') ||
        message.includes('middle age') || message.includes('geriatric') || message.includes('menopause')) {
      return "👶👨👴 Age-Specific Care:\n\n• Pediatric care • Adolescent health\n• Adult preventive care • Senior management\n• Maternity care • Geriatric medicine\n\n✨ Specialized care for every life stage\n📞 Book appointment: +91 7610312515";
    }

    // Food and nutrition (comprehensive)
    if (message.includes('food') || message.includes('eat') || message.includes('nutrition') ||
        message.includes('diet') || message.includes('hungry') || message.includes('meal') ||
        message.includes('breakfast') || message.includes('lunch') || message.includes('dinner') ||
        message.includes('snack') || message.includes('vegetarian') || message.includes('vegan') ||
        message.includes('protein') || message.includes('carbs') || message.includes('fat') ||
        message.includes('calories') || message.includes('sugar') || message.includes('salt') ||
        message.includes('organic') || message.includes('junk food') || message.includes('fast food')) {
      return "🍎 Nutrition & Diet:\n\n🩺 Our specialists help with:\n• Personalized diet plans • Nutritional counseling\n• Weight management • Diabetic diet guidance\n• Heart-healthy eating • Food allergy management\n\n📞 Professional dietary advice: +91 7610312515";
    }

    // Random/casual conversation (comprehensive)
    if (message.includes('how are you') || message.includes('what\'s up') || message.includes('how\'s it going') ||
        message.includes('nice') || message.includes('cool') || message.includes('interesting') ||
        message.includes('funny') || message.includes('weird') || message.includes('strange') ||
        message.includes('boring') || message.includes('busy') || message.includes('free') ||
        message.includes('tired') || message.includes('excited') || message.includes('happy') ||
        message.includes('sad') || message.includes('angry') || message.includes('confused') ||
        message.includes('joke') || message.includes('laugh') || message.includes('smile') ||
        message.includes('test') || message.includes('testing') || message.includes('random') ||
        message.includes('anything') || message.includes('something') || message.includes('nothing') ||
        message.includes('whatever') || message.includes('okay') || message.includes('ok') ||
        message.includes('yes') || message.includes('no') || message.includes('maybe') ||
        message.includes('sure') || message.includes('fine') || message.includes('good') ||
        message.includes('bad') || message.includes('awesome') || message.includes('great')) {
      return "I'm doing well, thank you! 😊\n\n🤖 QuickMeds AI Assistant here 24/7!\n\n• Healthcare needs?\n• Medical assistance?\n• Connect with specialists?\n• Health questions?\n\nHow can I help with your health today?";
    }

    // Negative emotions and mental health (comprehensive)
    if (message.includes('depressed') || message.includes('sad') || message.includes('anxious') ||
        message.includes('worried') || message.includes('scared') || message.includes('afraid') ||
        message.includes('panic') || message.includes('stress') || message.includes('overwhelmed') ||
        message.includes('hopeless') || message.includes('lonely') || message.includes('angry') ||
        message.includes('frustrated') || message.includes('upset') || message.includes('crying') ||
        message.includes('suicidal') || message.includes('self harm') || message.includes('mental health')) {
      return "💙 I understand you're going through a difficult time.\n\n🧠 Our mental health specialists provide:\n• Professional counseling • Mental health assessments\n• Anxiety & depression treatment • Stress management\n\n🆘 Self-harm thoughts? Call 108 immediately!\n📞 Our clinic: +91 7610312515\n\n💪 You're not alone - help is available.";
    }

    // Technology problems (comprehensive)
    if (message.includes('error') || message.includes('bug') || message.includes('problem') ||
        message.includes('issue') || message.includes('not working') || message.includes('broken') ||
        message.includes('crash') || message.includes('freeze') || message.includes('slow') ||
        message.includes('loading') || message.includes('connection') || message.includes('internet') ||
        message.includes('browser') || message.includes('device') || message.includes('technical')) {
      return "🔧 Technical Support:\n\n💻 Need help with:\n• Online appointment booking\n• Website access\n• Technical difficulties\n\n📞 Support team: +91 7610312515\n📧 Email: sujalrai9617@gmail.com\n\n✅ We'll get you connected smoothly!";
    }

    // Default response for any other message (expanded variety)
    const responses = [
      "🤖 QuickMeds AI Assistant here!\n\nI can help with:\n• Healthcare queries\n• Appointment booking\n• Specialist connections\n\nWhat do you need help with?",

      "👋 Thanks for reaching out!\n\nI assist with:\n• Medical questions\n• Booking appointments\n• Specialist information\n• Health guidance\n\nHow can I help today?",

      "🩺 I'm here for your healthcare needs!\n\n• Symptoms & health advice\n• Appointment scheduling\n• Specialist consultations\n\nWhat would you like to know?",

      "✨ Your QuickMeds AI assistant!\n\nI help with:\n• Medical guidance\n• Appointment booking\n• Specialist connections\n• Health information\n\nWhat assistance do you need?",

      "🏥 Healthcare support available!\n\n• Symptom guidance\n• Appointment booking\n• Specialist care\n• Medical advice\n\nWhat can I do for you?",

      "👨‍⚕️ Welcome to QuickMeds!\n\nServices I provide:\n• Health questions\n• Appointment booking\n• Specialist referrals\n• Medical guidance\n\nHow may I assist?",

      "🔍 Healthcare AI at your service!\n\n• Medical queries\n• Appointment scheduling\n• Specialist info\n• Health advice\n\nWhat do you need help with?",

      "💙 Making healthcare easier!\n\n• Medical advice\n• Appointment booking\n• Service questions\n• Specialist connections\n\nWhat's on your mind?",

      "🌟 QuickMeds team support!\n\n• Health questions\n• Appointment booking\n• Specialist referrals\n• Medical guidance\n\nHow can I support you today?",

      "📋 Comprehensive healthcare help!\n\n• Medical questions\n• Appointment booking\n• Specialist consultations\n• Health guidance\n\nWhat assistance do you need?",

      "🎯 I understand you have a question!\n\nAs your healthcare AI:\n• I provide medical guidance\n• Help book appointments\n• Connect you with specialists\n• Answer health questions\n\nPlease tell me more about what you need!",

      "💬 I'm here to help with anything!\n\nWhether it's:\n• Random questions\n• Health concerns\n• Appointment needs\n• Medical advice\n\nFeel free to ask me anything!"
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) {
      setError('Please enter a message.');
      return;
    }

    setError('');
    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const botReply = getIntelligentResponse(inputMessage);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: botReply,
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickReply = (reply) => {
    if (!reply.trim()) {
      setError('Please select a valid option.');
      return;
    }

    setError('');
    const newMessage = {
      id: messages.length + 1,
      text: reply,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const botReply = getIntelligentResponse(reply);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: botReply,
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Mobile detection
  const isMobile = () => {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chat-window" onClick={(e) => e.stopPropagation()}>
          <div className="chat-header">
            <div className="chat-header-info">
              <FaRobot className="bot-icon" />
              <div>
                <h4>QuickMeds Bot</h4>
                <div className="status">Online</div>
              </div>
            </div>
            <button
              className="close-chat-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <FaTimes />
            </button>
          </div>

          <div className="messages-area">
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.sender}`}>
                <div className="message-avatar">
                  {msg.sender === 'bot' ? <FaRobot /> : <FaUser />}
                </div>
                <div className="message-content">
                  <div className="message-text">{msg.text}</div>
                  <div className="message-time">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  {msg.sender === 'bot' && msg.options && (
                    <div className="quick-replies">
                      {msg.options.map((opt, idx) => (
                        <button
                          key={idx}
                          className="quick-reply-btn"
                          onClick={() => handleQuickReply(opt)}
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
                <div className="typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            {error && <div className="error-message">{error}</div>}
            <div className="input-container">
              <textarea
                className="chat-input"
                rows="1"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isMobile() ? "Type message..." : "Type your message..."}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="sentences"
                spellCheck="true"
              ></textarea>
              <button className="send-btn" onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      )}

      <button className="chat-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        <FaComments />
        <span className="ai-badge">AI</span>
        <span className="chat-notification">1</span>
      </button>
    </div>
  );
};

export default Chatbot;