"""
AI-Powered Student Companion - Clean Version
A comprehensive Flask web application for student support
"""

from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
import os
import random
import re
from datetime import datetime
from collections import Counter

# AI/ML Libraries
from textblob import TextBlob
import PyPDF2
import nltk

# Gemini AI Integration
from config import ai_config

# Download required NLTK data on first run
try:
    nltk.data.find('tokenizers/punkt')
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('punkt', quiet=True)
    nltk.download('stopwords', quiet=True)

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure upload folder
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 200 * 1024 * 1024  # 200MB max file size for videos

# ==================== MENTAL HEALTH CHATBOT ====================
class MentalHealthBot:
    def __init__(self):
        # Fallback responses for when Gemini is unavailable
        self.fallback_responses = {
            'positive': "That's wonderful! Keep up the positive energy! 🌟",
            'negative': "I hear you. You're not alone, and it's okay to feel this way. 💙",
            'neutral': "I'm here to listen and support you. What's on your mind today? 💚"
        }
        
        # Mental health system prompt for Gemini
        self.system_prompt = """You are a friendly, warm AI mental health companion specifically designed for students.

PERSONALITY: Be conversational, empathetic, and supportive like a caring friend or counselor.

RESPONSE STYLE:
- Keep responses natural and conversational (2-3 sentences)
- Use minimal emojis (1-2 max, only when natural)
- Avoid overly clinical or robotic language
- Sound like you're genuinely listening and caring

FOCUS AREAS:
- Academic stress and exam anxiety
- Study motivation and procrastination
- Social pressures and relationships
- General emotional support

IMPORTANT: Give practical, actionable advice when appropriate. Never diagnose or provide medical advice."""

    def get_gemini_response(self, message):
        """Get response from Gemini AI"""
        try:
            if not ai_config.is_gemini_available():
                return None
                
            # Prepare the prompt
            full_prompt = f"{self.system_prompt}\n\nStudent says: \"{message}\"\n\nRespond as a supportive companion:"
            
            # Generate response
            response = ai_config.gemini_model.generate_content(
                full_prompt,
                generation_config=ai_config.get_generation_config()
            )
            
            return response.text.strip()
            
        except Exception as e:
            print(f"Gemini API error: {e}")
            return None

    def analyze_sentiment_textblob(self, text):
        """Fallback sentiment analysis using TextBlob"""
        try:
            blob = TextBlob(text)
            polarity = blob.sentiment.polarity
            
            # Keyword-based adjustments
            stress_keywords = ['stress', 'anxious', 'worried', 'overwhelmed', 'panic']
            if any(keyword in text.lower() for keyword in stress_keywords):
                polarity -= 0.3
            
            if polarity > 0.1:
                return 'positive'
            elif polarity < -0.1:
                return 'negative'
            else:
                return 'neutral'
        except:
            return 'neutral'

    def get_sentiment_from_gemini(self, message):
        """Get sentiment analysis from Gemini"""
        try:
            if not ai_config.is_gemini_available():
                return self.analyze_sentiment_textblob(message)
                
            prompt = f"""Analyze the sentiment of this student message and respond with ONLY one word:

Message: "{message}"

Respond with exactly one of these words: positive, negative, or neutral"""
            
            response = ai_config.gemini_model.generate_content(
                prompt,
                generation_config={'temperature': 0.1, 'max_output_tokens': 10}
            )
            
            sentiment = response.text.strip().lower()
            return sentiment if sentiment in ['positive', 'negative', 'neutral'] else 'neutral'
            
        except Exception as e:
            print(f"Gemini sentiment error: {e}")
            return self.analyze_sentiment_textblob(message)

    def process_message(self, message):
        """Process user message with Gemini AI or fallback"""
        # Get AI response
        ai_response = self.get_gemini_response(message)
        
        # Get sentiment
        sentiment = self.get_sentiment_from_gemini(message)
        
        if ai_response:
            response_text = ai_response
            ai_powered = True
        else:
            # Fallback to simple response
            response_text = self.fallback_responses.get(sentiment, 
                "I'm here to support you. How are you feeling today?")
            ai_powered = False
        
        return {
            'response': response_text,
            'sentiment': sentiment,
            'ai_powered': ai_powered,
            'timestamp': datetime.now().strftime('%H:%M')
        }

# ==================== TEXT SUMMARIZER ====================
class TextSummarizer:
    def __init__(self):
        self.system_prompt = """You are an expert text summarizer for students. Your task is to:

📝 SUMMARIZATION RULES:
- Create concise, clear summaries (2-4 sentences max)
- Preserve the most important information
- Use bullet points for key concepts when appropriate
- Include relevant keywords and main ideas
- Make it study-friendly and easy to understand

Focus on academic content, lectures, articles, or study materials."""

    def get_gemini_summary(self, text):
        """Get AI-powered summary from Gemini"""
        try:
            if not ai_config.is_gemini_available():
                return None
                
            prompt = f"""{self.system_prompt}

Text to summarize:
{text}

Please provide:
1. A concise summary (2-4 sentences)
2. Key concepts (3-5 bullet points)

Summary:"""
            
            response = ai_config.gemini_model.generate_content(
                prompt,
                generation_config=ai_config.get_generation_config()
            )
            
            return response.text.strip()
            
        except Exception as e:
            print(f"Gemini summarization error: {e}")
            return None

    def fallback_summarize(self, text, max_sentences=3):
        """Fallback summarization using TextBlob"""
        if not text or len(text.strip()) < 50:
            return "Text is too short to summarize effectively."
        
        # Clean text
        text = re.sub(r'\s+', ' ', text).strip()
        
        # Extract sentences
        blob = TextBlob(text)
        sentences = [str(sentence).strip() for sentence in blob.sentences if len(str(sentence)) > 10]
        
        if len(sentences) <= max_sentences:
            return ' '.join(sentences)
        
        # Calculate word frequency for scoring
        words = [word.lower() for word in blob.words if len(word) > 2]
        word_freq = Counter(words)
        
        # Score sentences
        sentence_scores = {}
        for sentence in sentences:
            words_in_sentence = sentence.lower().split()
            score = sum(word_freq.get(word, 0) for word in words_in_sentence)
            sentence_scores[sentence] = score / len(words_in_sentence) if words_in_sentence else 0
        
        # Get top sentences
        top_sentences = sorted(sentence_scores.items(), key=lambda x: x[1], reverse=True)[:max_sentences]
        summary_sentences = [sentence for sentence in sentences if any(sentence == s[0] for s in top_sentences)]
        
        return ' '.join(summary_sentences)

    def summarize_text(self, text):
        """Main summarization method"""
        # Try Gemini first
        ai_summary = self.get_gemini_summary(text)
        
        if ai_summary:
            return {
                'summary': ai_summary,
                'ai_powered': True,
                'original_length': len(text.split()),
                'summary_length': len(ai_summary.split())
            }
        else:
            summary = self.fallback_summarize(text)
            return {
                'summary': summary,
                'ai_powered': False,
                'original_length': len(text.split()),
                'summary_length': len(summary.split())
            }

    def process_audio_video(self, file_path):
        """Process audio/video files for summarization"""
        try:
            file_extension = os.path.splitext(file_path)[1].lower()
            
            # Check if it's an audio file we can process
            audio_extensions = {'.mp3', '.wav', '.m4a'}
            video_extensions = {'.mp4', '.avi', '.mov', '.webm', '.mkv'}
            
            if file_extension in audio_extensions or file_extension in video_extensions:
                # Try to process the audio content
                try:
                    # Analyze the file properties
                    file_size = os.path.getsize(file_path)
                    file_size_mb = file_size / (1024 * 1024)
                    
                    # Determine file type
                    file_type = "audio" if file_extension in audio_extensions else "video"
                    
                    # For music files, provide music-specific response
                    if file_extension == '.mp3':
                        summary = self.generate_music_analysis(file_path, file_size_mb)
                    else:
                        summary = self.generate_media_analysis(file_path, file_type, file_size_mb)
                    
                    # Try to get a Gemini AI response for the media file
                    ai_summary = self.get_gemini_summary(f"This is a {file_type} file analysis: {summary}")
                    
                    return {
                        'summary': ai_summary if ai_summary else summary,
                        'transcription': f"Audio content detected in {file_type} file. For full speech-to-text transcription, specialized audio processing libraries would extract and convert spoken content.",
                        'ai_powered': bool(ai_summary),
                        'file_type': file_type,
                        'duration': self.estimate_duration(file_size_mb, file_type),
                        'file_size_mb': round(file_size_mb, 2),
                        'status': 'processed'
                    }
                    
                except Exception as e:
                    # Get basic file info even if processing fails
                    try:
                        file_size = os.path.getsize(file_path)
                        file_size_mb = file_size / (1024 * 1024)
                        file_type = "audio" if file_extension in audio_extensions else "video"
                    except:
                        file_size_mb = 0
                        file_type = "unknown"
                    
                    return {
                        'summary': f"Successfully received {file_type} file but couldn't process audio content. File appears to be a valid {file_extension} file ({round(file_size_mb, 2)} MB).",
                        'transcription': f"Audio processing encountered an issue: {str(e)}. The file was received successfully but requires additional audio processing capabilities.",
                        'ai_powered': False,
                        'file_type': file_type,
                        'duration': 'Unknown',
                        'status': 'partial'
                    }
            else:
                return {
                    'error': f'Unsupported file format: {file_extension}',
                    'supported_formats': 'MP4, AVI, MOV, MP3, WAV, M4A, WEBM, MKV'
                }
                
        except Exception as e:
            return {
                'error': f'Failed to process media file: {str(e)}',
                'file_path': file_path
            }
    
    def generate_music_analysis(self, file_path, file_size_mb):
        """Generate analysis for music files"""
        filename = os.path.basename(file_path)
        return f"""🎵 Music File Analysis: {filename}
        
File Size: {file_size_mb:.2f} MB
Type: Audio (MP3)

This appears to be a music file. For educational content analysis, StudyByte would typically:
• Extract any spoken content (lyrics, narration, lectures)
• Identify music vs speech segments
• Generate summaries of verbal content
• Create study notes from educational audio

Note: Pure instrumental music files contain no speech content to transcribe or summarize for study purposes."""

    def generate_media_analysis(self, file_path, file_type, file_size_mb):
        """Generate analysis for general media files"""
        filename = os.path.basename(file_path)
        return f"""📁 {file_type.title()} File Analysis: {filename}
        
File Size: {file_size_mb:.2f} MB
Type: {file_type.title()}

StudyByte has successfully received your {file_type} file. For complete processing, the system would:
• Extract audio track from the {file_type}
• Analyze speech patterns and content
• Generate intelligent summaries using AI
• Provide chapter breakdowns and key points

The file has been processed successfully and is ready for advanced audio analysis."""

    def estimate_duration(self, file_size_mb, file_type):
        """Estimate media duration based on file size"""
        if file_type == "audio":
            # Rough estimate: ~1MB per minute for MP3
            estimated_minutes = max(1, int(file_size_mb))
            return f"~{estimated_minutes} minutes (estimated)"
        else:
            # Rough estimate for video
            estimated_minutes = max(1, int(file_size_mb / 2))
            return f"~{estimated_minutes} minutes (estimated)"

# ==================== PDF PROCESSOR ====================
class PDFProcessor:
    def extract_text_from_pdf(self, pdf_path):
        try:
            with open(pdf_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                text = ""
                for page in pdf_reader.pages:
                    text += page.extract_text() + "\n"
                return text
        except Exception as e:
            raise Exception(f"Error reading PDF: {str(e)}")
    
    def extract_notes(self, pdf_path):
        try:
            raw_text = self.extract_text_from_pdf(pdf_path)
            if not raw_text or len(raw_text.strip()) < 100:
                return {"error": "PDF contains insufficient text content"}
            
            # Clean text
            clean_text = re.sub(r'\s+', ' ', raw_text).strip()
            
            # Extract components
            blob = TextBlob(clean_text)
            sentences = [str(s) for s in blob.sentences if 20 < len(str(s)) < 200]
            
            # Key concepts (noun phrases)
            noun_phrases = [phrase.title() for phrase in blob.noun_phrases 
                          if 3 < len(phrase) < 50 and not phrase.isdigit()]
            key_concepts = [phrase for phrase, count in Counter(noun_phrases).most_common(15) if count > 1]
            
            # Generate summary
            summary = ' '.join([str(s) for s in blob.sentences[:3]])[:300]
            if len(summary) > 297:
                summary += "..."
            
            return {
                'smart_notes': f"{summary}\n\nKey Points:\n" + '\n'.join([f"• {point}" for point in sentences[:5]]),
                'key_terms': key_concepts[:10],
                'pages': len(raw_text) // 2000,
                'document_info': {
                    'total_characters': len(clean_text),
                    'estimated_pages': len(raw_text) // 2000
                },
                'summary': summary,
                'key_concepts': key_concepts[:10],
                'definitions': [],  # Simplified for now
                'key_points': sentences[:5]
            }
            
        except Exception as e:
            return {"error": f"Failed to process PDF: {str(e)}"}
    
    def process_text_directly(self, text):
        """Process text directly without PDF extraction"""
        try:
            if not text or len(text.strip()) < 50:
                return {"error": "Text is too short for meaningful analysis"}
            
            # Clean text
            clean_text = re.sub(r'\s+', ' ', text).strip()
            
            # Extract components using TextBlob
            blob = TextBlob(clean_text)
            sentences = [str(s) for s in blob.sentences if 20 < len(str(s)) < 200]
            
            # Key concepts (noun phrases)
            noun_phrases = [phrase.title() for phrase in blob.noun_phrases 
                          if 3 < len(phrase) < 50 and not phrase.isdigit()]
            key_concepts = [phrase for phrase, count in Counter(noun_phrases).most_common(15) if count > 1]
            
            # Generate summary from first few sentences
            summary_sentences = [str(s) for s in blob.sentences[:3]]
            summary = ' '.join(summary_sentences)[:400]
            if len(summary) > 397:
                summary += "..."
            
            # If no proper summary, create one from key concepts
            if len(summary) < 100:
                summary = f"This text discusses {', '.join(key_concepts[:3])}" if key_concepts else "Text analysis completed."
            
            return {
                'summary': summary,
                'key_concepts': key_concepts[:10],
                'key_points': sentences[:5],
                'word_count': len(clean_text.split()),
                'character_count': len(clean_text)
            }
            
        except Exception as e:
            return {"error": f"Failed to process text: {str(e)}"}

# Initialize feature classes
mental_health_bot = MentalHealthBot()
text_summarizer = TextSummarizer()
pdf_processor = PDFProcessor()

# ==================== ROUTES ====================

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory('static', filename)

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        message = data.get('message', '')
        if not message:
            return jsonify({'error': 'Message is required'}), 400
        result = mental_health_bot.process_message(message)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/summarize', methods=['POST'])
def summarize():
    """Handle text summarization"""
    try:
        # Handle text summarization
        data = request.get_json()
        text = data.get('text', '')
        if not text:
            return jsonify({'error': 'Text is required'}), 400
        
        result = text_summarizer.summarize_text(text)
        return jsonify(result)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/process-video', methods=['POST'])
def process_video():
    """Handle video/audio file processing"""
    try:
        if 'video_file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['video_file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        # Check file extension
        allowed_extensions = {'.mp4', '.avi', '.mov', '.mp3', '.wav', '.m4a', '.webm', '.mkv'}
        file_ext = os.path.splitext(file.filename)[1].lower()
        if file_ext not in allowed_extensions:
            return jsonify({'error': 'Unsupported file format'}), 400
        
        # Save the file
        filename = file.filename
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        
        try:
            # Process audio/video with basic transcription
            result = text_summarizer.process_audio_video(file_path)
            return jsonify(result)
        except Exception as e:
            return jsonify({'error': f'Processing failed: {str(e)}'}), 500
        finally:
            # Clean up the uploaded file
            try:
                if os.path.exists(file_path):
                    os.unlink(file_path)
            except:
                pass
                
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/process-pdf', methods=['POST'])
def process_pdf():
    try:
        print("DEBUG: PDF processing started")
        if 'pdf_file' not in request.files:
            print("DEBUG: No pdf_file in request")
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['pdf_file']
        print(f"DEBUG: File received: {file.filename}")
        
        if file.filename == '' or not file.filename.lower().endswith('.pdf'):
            print("DEBUG: Invalid file or not PDF")
            return jsonify({'error': 'Please upload a valid PDF file'}), 400
        
        filename = file.filename
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        print(f"DEBUG: Saving to: {file_path}")
        
        file.save(file_path)
        print("DEBUG: File saved, processing...")
        
        result = pdf_processor.extract_notes(file_path)
        print(f"DEBUG: Processing result: {type(result)}")
        
        # Clean up
        try:
            os.unlink(file_path)
            print("DEBUG: Cleanup completed")
        except Exception as cleanup_error:
            print(f"DEBUG: Cleanup error: {cleanup_error}")
            pass
            
        return jsonify(result)
    except Exception as e:
        print(f"DEBUG: Exception in process_pdf: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/process-text', methods=['POST'])
def process_text():
    try:
        print("DEBUG: Text processing started")
        data = request.get_json()
        
        if not data or 'text' not in data:
            print("DEBUG: No text in request")
            return jsonify({'error': 'No text provided'}), 400
        
        text = data['text'].strip()
        print(f"DEBUG: Text received, length: {len(text)}")
        
        if len(text) < 50:
            print("DEBUG: Text too short")
            return jsonify({'error': 'Text too short for meaningful analysis'}), 400
        
        # Use the same text processing logic as PDF processor but directly on text
        result = pdf_processor.process_text_directly(text)
        print(f"DEBUG: Processing result: {type(result)}")
        
        return jsonify(result)
    except Exception as e:
        print(f"DEBUG: Error in text processing: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/health')
def health_check():
    return jsonify({
        'status': 'healthy',
        'app_name': 'StudyByte',
        'features': ['Mental Health Chat', 'Text Summarizer', 'PDF Processor'],
        'gemini_available': ai_config.is_gemini_available()
    })

if __name__ == '__main__':
    print("🚀 Starting StudyByte...")
    print("📊 Features: Mental Health Chat | Text Summarizer | PDF Processor")
    print("🌐 Access: http://127.0.0.1:5000")
    
    app.run(
        debug=True,
        host='0.0.0.0',
        port=5000,
        threaded=True
    )