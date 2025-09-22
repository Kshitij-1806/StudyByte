"""
AI Configuration for Student Companion
Handles Gemini API integration and settings
"""
import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

class AIConfig:
    def __init__(self):
        # Gemini API Configuration
        self.gemini_api_key = os.getenv('GEMINI_API_KEY')
        self.model_name = "gemini-1.5-flash"  # Fast and free model
        
        # Configure Gemini
        if self.gemini_api_key:
            genai.configure(api_key=self.gemini_api_key)
            self.gemini_model = genai.GenerativeModel(self.model_name)
        else:
            self.gemini_model = None
            print("⚠️  GEMINI_API_KEY not found. Using fallback TextBlob.")
    
    def is_gemini_available(self):
        """Check if Gemini is properly configured"""
        return self.gemini_model is not None
    
    def get_generation_config(self):
        """Optimized settings for student use cases"""
        return {
            "temperature": 0.7,  # Balanced creativity
            "top_p": 0.8,
            "top_k": 40,
            "max_output_tokens": 1000,  # Reasonable response length
        }

# Global config instance
ai_config = AIConfig()