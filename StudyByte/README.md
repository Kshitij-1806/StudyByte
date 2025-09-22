# 🧠 StudyByte

**Your AI-powered learning assistant for academic success and mental wellness**

## 🚀 Project Overview

StudyByte is a comprehensive AI solution that addresses critical student challenges:
1. **Academic Efficiency** - AI-powered tools for better learning
2. **Mental Health Support** - Emotional wellness through AI companionship

## ⭐ Key Features

### 1. 🧠 Mental Health Support
- **AI Chatbot** with sentiment analysis using Gemini AI
- **Emotion Detection** for stress, anxiety, and sadness  
- **Personalized Self-Care Tips** and coping strategies
- **Motivational Support** with inspirational quotes

### 2. 📝 Smart Text Summarizer
- **Key Phrase Extraction** for quick concept review
- **Meeting Transcript Processing** for efficient catch-up
- **Frequency-based Sentence Scoring** for optimal summaries

### 3. 📚 PDF Smart Notes Extractor
- **PDF Text Extraction** using PyPDF2
- **Automatic Definition Detection** via pattern matching
- **Key Concept Identification** through noun phrase analysis
- **Study Guide Generation** with structured output

## 🛠️ Technology Stack

- **Backend**: Python Flask (lightweight & fast)
- **AI/ML**: TextBlob, NLTK, PyPDF2
- **Frontend**: Bootstrap 5, HTML5, JavaScript
- **Architecture**: Single-file application for easy deployment

## 🏃‍♂️ Quick Start

1. **Install Dependencies**:
   ```bash
   pip install Flask Flask-CORS textblob PyPDF2 nltk
   ```

2. **Run the Application**:
   ```bash
   python student_companion.py
   ```

3. **Access the App**:
   - Open browser to `http://127.0.0.1:5000`
   - Click any feature card to start using AI tools

## 📁 Project Structure (Simplified for Demo)

```
devjams/
├── student_companion.py    # Complete application (all features)
├── requirements.txt        # Dependencies
├── uploads/               # Temporary PDF storage
└── README.md             # This file
```

## 🎯 Demo Flow

1. **Mental Health Chat**: 
   - User: "I feel overwhelmed with exams"
   - AI: Provides empathetic response + breathing exercises

2. **Text Summarizer**:
   - Input: Long class transcript
   - Output: 3-sentence summary + key phrases

3. **PDF Processor**:
   - Upload: Textbook chapter PDF
   - Extract: Definitions, concepts, key points

## 🏆 Innovation Highlights

- **All-in-one Solution**: Three essential student tools in one app
- **Real AI Processing**: No external API dependencies
- **Responsive Design**: Works on desktop and mobile
- **Privacy-Focused**: All processing happens locally
- **Hackathon-Ready**: Single file, easy to demo and deploy

## 🔮 Future Enhancements

- Integration with OpenAI GPT for advanced conversations
- User authentication and progress tracking
- Mobile app development
- Multi-language support
- Advanced ML models for better accuracy

## 👨‍💻 Built For Hackathon

This project demonstrates practical AI implementation addressing real student needs. The consolidated architecture makes it perfect for quick demos and judge presentations while maintaining full functionality.

**Total Development Time**: Optimized for hackathon constraints
**Lines of Code**: ~400 (including HTML/CSS/JS)
**Dependencies**: Minimal and lightweight
**Deployment**: Single command startup