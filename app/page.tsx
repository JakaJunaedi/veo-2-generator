"use client"
import React, { useState } from 'react';
import { Copy, Download, RotateCcw, Wand2 } from 'lucide-react';

interface FormData {
  subject: string;
  action: string;
  setting: string;
  timeOfDay: string;
  weather: string;
  mood: string;
  style: string;
  cameraAngle: string;
  cameraMovement: string;
  lighting: string;
  colorGrading: string;
  additionalDetails: string;
}

interface GeneratedPrompts {
  indonesian: string;
  english: string;
}

const Home: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    subject: '',
    action: '',
    setting: '',
    timeOfDay: 'pagi',
    weather: 'cerah',
    mood: 'netral',
    style: 'realistis',
    cameraAngle: 'medium-shot',
    cameraMovement: 'statis',
    lighting: 'natural',
    colorGrading: 'natural',
    additionalDetails: ''
  });

  const [generatedPrompts, setGeneratedPrompts] = useState<GeneratedPrompts>({
    indonesian: '',
    english: ''
  });

  const [copied, setCopied] = useState<string>('');

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateEnglishPrompt = (): string => {
    const { 
      subject, action, setting, timeOfDay, weather, mood, style, cameraAngle, cameraMovement, lighting, colorGrading, additionalDetails 
    } = formData;

    // Translation mappings
    const timeTranslations: Record<string, string> = {
      'pagi': 'morning',
      'sore': 'afternoon',
      'malam': 'night',
    };

    const weatherTranslations: Record<string, string> = {
      'cerah': 'sunny',
      'berawan': 'cloudy',
      'hujan': 'rainy',
      'berkabut': 'foggy',
      'bersalju': 'snowy',
      'berangin': 'windy'
    };

    const moodTranslations: Record<string, string> = {
      'bahagia': 'happy',
      'sedih': 'sad',
      'dramatis': 'dramatic',
      'romantis': 'romantic',
      'misterius': 'mysterious',
      'energik': 'energetic',
      'tenang': 'calm',
      'netral': 'neutral'
    };

    const styleTranslations: Record<string, string> = {
      'realistis': 'realistic',
      'sinematik': 'cinematic',
      'kartun': 'cartoon',
      'anime': 'anime',
      'vintage': 'vintage',
      'futuristik': 'futuristic',
      'minimalis': 'minimalist'
    };

    const durationTranslations: Record<string, string> = {
      'pendek': 'short duration',
      'sedang': 'medium duration',
      'panjang': 'long duration'
    };

    const cameraAngleTranslations: Record<string, string> = {
      'close-up': 'close-up shot',
      'medium-shot': 'medium shot',
      'wide-shot': 'wide shot',
      'extreme-close-up': 'extreme close-up',
      'bird-eye-view': 'bird\'s eye view',
      'low-angle': 'low angle shot',
      'high-angle': 'high angle shot'
    };

    const cameraMovementTranslations: Record<string, string> = {
      'statis': 'static camera',
      'pan': 'camera pan',
      'tilt': 'camera tilt',
      'zoom-in': 'zoom in',
      'zoom-out': 'zoom out',
      'dolly': 'dolly movement',
      'handheld': 'handheld camera',
      'steadicam': 'steadicam movement'
    };

    const lightingTranslations: Record<string, string> = {
      'natural': 'natural lighting',
      'dramatis': 'dramatic lighting',
      'lembut': 'soft lighting',
      'keras': 'hard lighting',
      'backlight': 'backlighting',
      'golden-hour': 'golden hour lighting',
      'blue-hour': 'blue hour lighting'
    };

    const colorGradingTranslations: Record<string, string> = {
      'natural': 'natural color grading',
      'hangat': 'warm color grading',
      'dingin': 'cool color grading',
      'vintage': 'vintage color grading',
      'high-contrast': 'high contrast',
      'desaturated': 'desaturated colors',
      'vibrant': 'vibrant colors'
    };

    // Build English prompt
    let englishPrompt = subject;
    
    if (action) {
      englishPrompt += ` ${action}`;
    }
    
    if (setting) {
      englishPrompt += ` in ${setting}`;
    }
    
    englishPrompt += ` during ${timeTranslations[timeOfDay] || timeOfDay}`;
    
    if (weather !== 'cerah') {
      englishPrompt += ` with ${weatherTranslations[weather] || weather} weather`;
    }
    
    englishPrompt += `. ${moodTranslations[mood] || mood} atmosphere with ${styleTranslations[style] || style} style.`;
    
    // Technical specifications
    englishPrompt += ` ${cameraAngleTranslations[cameraAngle] || cameraAngle} with ${cameraMovementTranslations[cameraMovement] || cameraMovement}.`;
    englishPrompt += ` ${lightingTranslations[lighting] || lighting} and ${colorGradingTranslations[colorGrading] || colorGrading}.`;
    
    if (additionalDetails) {
      englishPrompt += ` ${additionalDetails}`;
    }

    return englishPrompt;
  };

  const generatePrompt = () => {
    const { 
      subject, action, setting, timeOfDay, weather, mood, style,  cameraAngle, cameraMovement, lighting, colorGrading, additionalDetails 
    } = formData;

    if (!subject.trim()) {
      alert('Mohon isi subjek terlebih dahulu');
      return;
    }

    // Generate Indonesian prompt
    let indonesianPrompt = `${subject}`;
    
    if (action) {
      indonesianPrompt += ` sedang ${action}`;
    }
    
    if (setting) {
      indonesianPrompt += ` di ${setting}`;
    }
    
    indonesianPrompt += ` pada waktu ${timeOfDay}`;
    
    if (weather !== 'cerah') {
      indonesianPrompt += ` dengan cuaca ${weather}`;
    }
    
    indonesianPrompt += `. Suasana ${mood} dengan gaya ${style}.`;
    
    // Technical specifications
    indonesianPrompt += ` Sudut kamera ${cameraAngle} dengan gerakan kamera ${cameraMovement}.`;
    indonesianPrompt += ` Pencahayaan ${lighting} dan pewarnaan ${colorGrading}.`;
    
    if (additionalDetails) {
      indonesianPrompt += ` ${additionalDetails}`;
    }

    // Generate English prompt directly
    const englishPrompt = generateEnglishPrompt();

    setGeneratedPrompts({
      indonesian: indonesianPrompt,
      english: englishPrompt
    });
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(''), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const downloadPrompt = (text: string, filename: string) => {
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const resetForm = () => {
    setFormData({
      subject: '',
      action: '',
      setting: '',
      timeOfDay: 'pagi',
      weather: 'cerah',
      mood: 'netral',
      style: 'realistis',
      cameraAngle: 'medium-shot',
      cameraMovement: 'statis',
      lighting: 'natural',
      colorGrading: 'natural',
      additionalDetails: ''
    });
    setGeneratedPrompts({ indonesian: '', english: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
       <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              Generator Video Gemini Veo 2
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Buat prompt video AI yang detail dengan mudah
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Form Section */}
            <div className="space-y-5">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-3 rounded-lg">
                <h2 className="text-lg sm:text-xl font-semibold">Parameter Video</h2>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject / Karakter *
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  placeholder="Contoh: Seorang perempuan muda menggunakan pakaian tradisional"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800"
                />
              </div>

              {/* Action */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Action / Aktivitas
                </label>
                <input
                  type="text"
                  value={formData.action}
                  onChange={(e) => handleInputChange('action', e.target.value)}
                  placeholder="Contoh: berjalan ke depan dan tersenyum"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800"
                />
              </div>

              {/* Setting */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Environment / Latar Belakang
                </label>
                <input
                  type="text"
                  value={formData.setting}
                  onChange={(e) => handleInputChange('setting', e.target.value)}
                  placeholder="Contoh: di pegunungan berkabut"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800"
                />
              </div>

              {/* Time and Weather */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Waktu
                  </label>
                  <select
                    value={formData.timeOfDay}
                    onChange={(e) => handleInputChange('timeOfDay', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-800"
                  >
                    <option value="pagi">Pagi</option>
                    <option value="sore">Sore</option>
                    <option value="malam">Malam</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cuaca
                  </label>
                  <select
                    value={formData.weather}
                    onChange={(e) => handleInputChange('weather', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-800"
                  >
                    <option value="cerah">Cerah</option>
                    <option value="berawan">Berawan</option>
                    <option value="hujan">Hujan</option>
                    <option value="berkabut">Berkabut</option>
                    <option value="bersalju">Bersalju</option>
                    <option value="berangin">Berangin</option>
                  </select>
                </div>
              </div>

              {/* Mood and Style */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Suasana
                  </label>
                  <select
                    value={formData.mood}
                    onChange={(e) => handleInputChange('mood', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-800"
                  >
                    <option value="netral">Netral</option>
                    <option value="bahagia">Bahagia</option>
                    <option value="sedih">Sedih</option>
                    <option value="dramatis">Dramatis</option>
                    <option value="romantis">Romantis</option>
                    <option value="misterius">Misterius</option>
                    <option value="energik">Energik</option>
                    <option value="tenang">Tenang</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gaya Visual
                  </label>
                  <select
                    value={formData.style}
                    onChange={(e) => handleInputChange('style', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-800"
                  >
                    <option value="realistis">Realistis</option>
                    <option value="sinematik">Sinematik</option>
                    <option value="kartun">Kartun</option>
                    <option value="anime">Anime</option>
                    <option value="vintage">Vintage</option>
                    <option value="futuristik">Futuristik</option>
                    <option value="minimalis">Minimalis</option>
                  </select>
                </div>
              </div>

              {/* Camera Settings */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-4">Pengaturan Kamera</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sudut Kamera
                    </label>
                    <select
                      value={formData.cameraAngle}
                      onChange={(e) => handleInputChange('cameraAngle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-800"
                    >
                      <option value="close-up">Close-up</option>
                      <option value="medium-shot">Medium Shot</option>
                      <option value="wide-shot">Wide Shot</option>
                      <option value="extreme-close-up">Extreme Close-up</option>
                      <option value="bird-eye-view">Bird's Eye View</option>
                      <option value="low-angle">Low Angle</option>
                      <option value="high-angle">High Angle</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Camera work / Gerakan Kamera
                    </label>
                    <select
                      value={formData.cameraMovement}
                      onChange={(e) => handleInputChange('cameraMovement', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-800"
                    >
                      <option value="statis">Statis</option>
                      <option value="pan">Pan</option>
                      <option value="tilt">Tilt</option>
                      <option value="zoom-in">Zoom In</option>
                      <option value="zoom-out">Zoom Out</option>
                      <option value="dolly">Dolly</option>
                      <option value="handheld">Handheld</option>
                      <option value="steadicam">Steadicam</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lighting Pencahayaan
                    </label>
                    <select
                      value={formData.lighting}
                      onChange={(e) => handleInputChange('lighting', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-800"
                    >
                      <option value="natural">Natural</option>
                      <option value="dramatis">Dramatis</option>
                      <option value="lembut">Lembut</option>
                      <option value="keras">Keras</option>
                      <option value="backlight">Backlight</option>
                      <option value="golden-hour">Golden Hour</option>
                      <option value="blue-hour">Blue Hour</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Style / Gaya visual / Estetika
                    </label>
                    <select
                      value={formData.colorGrading}
                      onChange={(e) => handleInputChange('colorGrading', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-800"
                    >
                      <option value="natural">Natural</option>
                      <option value="hangat">Hangat</option>
                      <option value="dingin">Dingin</option>
                      <option value="vintage">Vintage</option>
                      <option value="high-contrast">High Contrast</option>
                      <option value="desaturated">Desaturated</option>
                      <option value="vibrant">Vibrant</option>
                    </select>
                  </div>
                </div>
              </div>


              {/* Additional Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Detail Tambahan
                </label>
                <textarea
                  value={formData.additionalDetails}
                  onChange={(e) => handleInputChange('additionalDetails', e.target.value)}
                  placeholder="Tambahkan detail khusus seperti efek, musik, transisi, dll."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Action Buttons */}
               <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={generatePrompt}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Wand2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Generate Prompt</span>
                </button>
                <button
                  onClick={resetForm}
                  className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-5">
                <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-3 rounded-lg">
                  <h2 className="text-lg sm:text-xl font-semibold">Hasil Prompt</h2>
                </div>

              {/* Indonesian Prompt */}
              {generatedPrompts.indonesian && (
                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-blue-800">
                      Prompt Bahasa Indonesia
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => copyToClipboard(generatedPrompts.indonesian, 'id')}
                        className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors duration-200"
                        title="Copy ke clipboard"
                      >
                        <Copy className="w-4 h-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => downloadPrompt(generatedPrompts.indonesian, 'prompt-indonesia.txt')}
                        className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors duration-200"
                        title="Download prompt"
                      >
                        <Download className="w-4 h-4 text-blue-600" />
                      </button>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <p className="text-gray-800 leading-relaxed">
                      {generatedPrompts.indonesian}
                    </p>
                  </div>
                  {copied === 'id' && (
                    <p className="text-green-600 text-sm mt-2">✓ Copied to clipboard!</p>
                  )}
                </div>
              )}

              {/* English Prompt */}
              {generatedPrompts.english && (
                <div className="bg-green-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-green-800">
                      English Prompt
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => copyToClipboard(generatedPrompts.english, 'en')}
                        className="p-2 bg-green-100 hover:bg-green-200 rounded-lg transition-colors duration-200"
                        title="Copy to clipboard"
                      >
                        <Copy className="w-4 h-4 text-green-600" />
                      </button>
                      <button
                        onClick={() => downloadPrompt(generatedPrompts.english, 'prompt-english.txt')}
                        className="p-2 bg-green-100 hover:bg-green-200 rounded-lg transition-colors duration-200"
                        title="Download prompt"
                      >
                        <Download className="w-4 h-4 text-green-600" />
                      </button>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <p className="text-gray-800 leading-relaxed">
                      {generatedPrompts.english}
                    </p>
                  </div>
                  {copied === 'en' && (
                    <p className="text-green-600 text-sm mt-2">✓ Copied to clipboard!</p>
                  )}
                </div>
              )}

              {/* Usage Tips */}
              <div className="bg-yellow-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">
                  Tips Penggunaan
                </h3>
                <ul className="text-yellow-700 space-y-2 text-sm">
                  <li>• Isi subjek dengan deskripsi yang jelas dan spesifik</li>
                  <li>• Kombinasikan berbagai parameter untuk hasil yang unik</li>
                  <li>• Gunakan detail tambahan untuk kontrol yang lebih presisi</li>
                  <li>• Eksperimen dengan sudut dan gerakan kamera untuk efek dramatis</li>
                  <li>• Sesuaikan pencahayaan dengan mood yang diinginkan</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;