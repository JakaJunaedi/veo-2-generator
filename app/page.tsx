"use client"
import React, { useState } from 'react';
import { Copy, Download, RotateCcw, Wand2, Edit3 } from 'lucide-react';

interface FormData {
  subject: string;
  action: string;
  expression: string;
  location: string;
  timeOfDay: string;
  cameraMovement: string;
  lighting: string;
  videoStyle: string;
  videoMood: string;
  soundMusic: string;
  spokenWords: string;
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
    expression: '',
    location: '',
    timeOfDay: 'morning',
    cameraMovement: 'static',
    lighting: 'natural',
    videoStyle: 'realistic',
    videoMood: 'neutral',
    soundMusic: '',
    spokenWords: '',
    additionalDetails: ''
  });

  const [generatedPrompts, setGeneratedPrompts] = useState<GeneratedPrompts>({
    indonesian: '',
    english: ''
  });

  const [editableIndonesian, setEditableIndonesian] = useState<string>('');
  const [copied, setCopied] = useState<string>('');

  // Options with translations
  const timeOptions = [
    { value: 'dawn', label: 'Dawn (Fajar)' },
    { value: 'morning', label: 'Morning (Pagi)' },
    { value: 'midday', label: 'Midday (Siang)' },
    { value: 'afternoon', label: 'Afternoon (Sore)' },
    { value: 'evening', label: 'Evening (Petang)' },
    { value: 'night', label: 'Night (Malam)' },
    { value: 'midnight', label: 'Midnight (Tengah Malam)' }
  ];

  const cameraMovementOptions = [
    { value: 'static', label: 'Static (Statis)' },
    { value: 'pan-left', label: 'Pan Left (Pan Kiri)' },
    { value: 'pan-right', label: 'Pan Right (Pan Kanan)' },
    { value: 'tilt-up', label: 'Tilt Up (Tilt Atas)' },
    { value: 'tilt-down', label: 'Tilt Down (Tilt Bawah)' },
    { value: 'zoom-in', label: 'Zoom In (Zoom Masuk)' },
    { value: 'zoom-out', label: 'Zoom Out (Zoom Keluar)' },
    { value: 'dolly-in', label: 'Dolly In (Dolly Masuk)' },
    { value: 'dolly-out', label: 'Dolly Out (Dolly Keluar)' },
    { value: 'crane-up', label: 'Crane Up (Crane Naik)' },
    { value: 'crane-down', label: 'Crane Down (Crane Turun)' },
    { value: 'handheld', label: 'Handheld (Genggam)' },
    { value: 'steadicam', label: 'Steadicam (Steadicam)' },
    { value: '3d-rotation', label: '3D Rotation (Rotasi 3D)' },
    { value: 'orbital', label: 'Orbital (Orbital)' },
    { value: 'push-in', label: 'Push In (Dorong Masuk)' },
    { value: 'pull-out', label: 'Pull Out (Tarik Keluar)' },
    { value: 'track-left', label: 'Track Left (Track Kiri)' },
    { value: 'track-right', label: 'Track Right (Track Kanan)' },
    { value: 'arc-shot', label: 'Arc Shot (Bidikan Busur)' },
    { value: 'whip-pan', label: 'Whip Pan (Whip Pan)' },
    { value: 'vertigo-effect', label: 'Vertigo Effect (Efek Vertigo)' },
    { value: 'parallax', label: 'Parallax (Paralaks)' },
    { value: 'dutch-angle', label: 'Dutch Angle (Sudut Belanda)' },
    { value: 'bird-eye-view', label: 'Bird Eye View (Pandangan Mata Burung)' }
  ];

  const lightingOptions = [
    { value: 'natural', label: 'Natural (Alami)' },
    { value: 'golden-hour', label: 'Golden Hour (Jam Emas)' },
    { value: 'blue-hour', label: 'Blue Hour (Jam Biru)' },
    { value: 'dramatic', label: 'Dramatic (Dramatis)' },
    { value: 'soft', label: 'Soft (Lembut)' },
    { value: 'hard', label: 'Hard (Keras)' },
    { value: 'backlit', label: 'Backlit (Cahaya Belakang)' },
    { value: 'rim-lighting', label: 'Rim Lighting (Pencahayaan Tepi)' },
    { value: 'low-key', label: 'Low Key (Kunci Rendah)' },
    { value: 'high-key', label: 'High Key (Kunci Tinggi)' },
    { value: 'neon', label: 'Neon (Neon)' },
    { value: 'candlelight', label: 'Candlelight (Cahaya Lilin)' },
    { value: 'moonlight', label: 'Moonlight (Cahaya Bulan)' },
    { value: 'studio', label: 'Studio (Studio)' }
  ];

  const videoStyleOptions = [
    { value: 'realistic', label: 'Realistic (Realistis)' },
    { value: 'cinematic', label: 'Cinematic (Sinematik)' },
    { value: 'documentary', label: 'Documentary (Dokumenter)' },
    { value: 'vintage', label: 'Vintage (Vintage)' },
    { value: 'retro', label: 'Retro (Retro)' },
    { value: 'futuristic', label: 'Futuristic (Futuristik)' },
    { value: 'minimalist', label: 'Minimalist (Minimalis)' },
    { value: 'artistic', label: 'Artistic (Artistik)' },
    { value: 'commercial', label: 'Commercial (Komersial)' },
    { value: 'music-video', label: 'Music Video (Video Musik)' },
    { value: 'noir', label: 'Noir (Noir)' },
    { value: 'surreal', label: 'Surreal (Surealis)' }
  ];

  const videoMoodOptions = [
    { value: 'neutral', label: 'Neutral (Netral)' },
    { value: 'happy', label: 'Happy (Bahagia)' },
    { value: 'sad', label: 'Sad (Sedih)' },
    { value: 'dramatic', label: 'Dramatic (Dramatis)' },
    { value: 'romantic', label: 'Romantic (Romantis)' },
    { value: 'mysterious', label: 'Mysterious (Misterius)' },
    { value: 'energetic', label: 'Energetic (Energik)' },
    { value: 'calm', label: 'Calm (Tenang)' },
    { value: 'tense', label: 'Tense (Tegang)' },
    { value: 'inspiring', label: 'Inspiring (Menginspirasi)' },
    { value: 'melancholic', label: 'Melancholic (Melankolis)' },
    { value: 'euphoric', label: 'Euphoric (Euforis)' }
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateDetailedPrompt = (isIndonesian: boolean = true): string => {
    const { 
      subject, action, expression, location, timeOfDay, cameraMovement, 
      lighting, videoStyle, videoMood, soundMusic, spokenWords, additionalDetails 
    } = formData;

    if (isIndonesian) {
      let prompt = `Sebuah video ${videoStyle === 'realistic' ? 'realistis' : 
        videoStyle === 'cinematic' ? 'sinematik' : 
        videoStyle === 'documentary' ? 'dokumenter' :
        videoStyle === 'vintage' ? 'vintage' :
        videoStyle === 'retro' ? 'retro' :
        videoStyle === 'futuristic' ? 'futuristik' :
        videoStyle === 'minimalist' ? 'minimalis' :
        videoStyle === 'artistic' ? 'artistik' :
        videoStyle === 'commercial' ? 'komersial' :
        videoStyle === 'music-video' ? 'video musik' :
        videoStyle === 'noir' ? 'noir' :
        videoStyle === 'surreal' ? 'surealis' : videoStyle} yang menampilkan ${subject}`;

      if (expression) {
        prompt += ` dengan ekspresi ${expression}`;
      }

      if (action) {
        prompt += ` sedang ${action}`;
      }

      if (location) {
        prompt += ` di ${location}`;
      }

      prompt += ` pada waktu ${timeOfDay === 'dawn' ? 'fajar' :
        timeOfDay === 'morning' ? 'pagi' :
        timeOfDay === 'midday' ? 'siang' :
        timeOfDay === 'afternoon' ? 'sore' :
        timeOfDay === 'evening' ? 'petang' :
        timeOfDay === 'night' ? 'malam' :
        timeOfDay === 'midnight' ? 'tengah malam' : timeOfDay}.`;

      prompt += ` Video ini memiliki suasana ${videoMood === 'neutral' ? 'netral' :
        videoMood === 'happy' ? 'bahagia' :
        videoMood === 'sad' ? 'sedih' :
        videoMood === 'dramatic' ? 'dramatis' :
        videoMood === 'romantic' ? 'romantis' :
        videoMood === 'mysterious' ? 'misterius' :
        videoMood === 'energetic' ? 'energik' :
        videoMood === 'calm' ? 'tenang' :
        videoMood === 'tense' ? 'tegang' :
        videoMood === 'inspiring' ? 'menginspirasi' :
        videoMood === 'melancholic' ? 'melankolis' :
        videoMood === 'euphoric' ? 'euforis' : videoMood}`;

      prompt += ` dengan pencahayaan ${lighting === 'natural' ? 'alami' :
        lighting === 'golden-hour' ? 'jam emas' :
        lighting === 'blue-hour' ? 'jam biru' :
        lighting === 'dramatic' ? 'dramatis' :
        lighting === 'soft' ? 'lembut' :
        lighting === 'hard' ? 'keras' :
        lighting === 'backlit' ? 'cahaya belakang' :
        lighting === 'rim-lighting' ? 'pencahayaan tepi' :
        lighting === 'low-key' ? 'kunci rendah' :
        lighting === 'high-key' ? 'kunci tinggi' :
        lighting === 'neon' ? 'neon' :
        lighting === 'candlelight' ? 'cahaya lilin' :
        lighting === 'moonlight' ? 'cahaya bulan' :
        lighting === 'studio' ? 'studio' : lighting}.`;

      const cameraMovementTranslation = cameraMovementOptions.find(opt => opt.value === cameraMovement)?.label.split('(')[1]?.replace(')', '') || cameraMovement;
      prompt += ` Gerakan kamera menggunakan teknik ${cameraMovementTranslation.toLowerCase()}.`;

      if (soundMusic) {
        prompt += ` Dengan latar musik atau suara: ${soundMusic}.`;
      }

      if (spokenWords) {
        prompt += ` Kalimat yang diucapkan: "${spokenWords}".`;
      }

      if (additionalDetails) {
        prompt += ` Detail tambahan: ${additionalDetails}`;
      }

      return prompt;
    } else {
      // English version
      let prompt = `A ${videoStyle} video featuring ${subject}`;

      if (expression) {
        prompt += ` with ${expression} expression`;
      }

      if (action) {
        prompt += ` ${action}`;
      }

      if (location) {
        prompt += ` in ${location}`;
      }

      prompt += ` during ${timeOfDay}.`;

      prompt += ` The video has a ${videoMood} atmosphere with ${lighting} lighting.`;

      prompt += ` Camera movement: ${cameraMovement.replace('-', ' ')}.`;

      if (soundMusic) {
        prompt += ` Background music or sound: ${soundMusic}.`;
      }

      if (spokenWords) {
        prompt += ` Spoken words: "${spokenWords}".`;
      }

      if (additionalDetails) {
        prompt += ` Additional details: ${additionalDetails}`;
      }

      return prompt;
    }
  };

  const generatePrompt = () => {
    if (!formData.subject.trim()) {
      alert('Mohon isi subjek terlebih dahulu');
      return;
    }

    const indonesianPrompt = generateDetailedPrompt(true);
    const englishPrompt = generateDetailedPrompt(false);

    setGeneratedPrompts({
      indonesian: indonesianPrompt,
      english: englishPrompt
    });

    setEditableIndonesian(indonesianPrompt);
  };

  const updateEnglishFromIndonesian = () => {
    // This would ideally use a translation service, but for now we'll regenerate
    const englishPrompt = generateDetailedPrompt(false);
    setGeneratedPrompts(prev => ({
      ...prev,
      english: englishPrompt
    }));
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
      expression: '',
      location: '',
      timeOfDay: 'morning',
      cameraMovement: 'static',
      lighting: 'natural',
      videoStyle: 'realistic',
      videoMood: 'neutral',
      soundMusic: '',
      spokenWords: '',
      additionalDetails: ''
    });
    setGeneratedPrompts({ indonesian: '', english: '' });
    setEditableIndonesian('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              Generator Video Gemini Veo 2
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Buat prompt video AI yang detail dan profesional
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Form Section */}
            <div className="space-y-5">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-3 rounded-lg">
                <h2 className="text-lg sm:text-xl font-semibold">Parameter Video</h2>
              </div>

              {/* 1. Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  1. Subjek *
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  placeholder="Contoh: Seorang perempuan muda berusia 25 tahun"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800"
                />
              </div>

              {/* 2. Action */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  2. Aksi
                </label>
                <input
                  type="text"
                  value={formData.action}
                  onChange={(e) => handleInputChange('action', e.target.value)}
                  placeholder="Contoh: berjalan dengan percaya diri"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800"
                />
              </div>

              {/* 3. Expression */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  3. Ekspresi
                </label>
                <input
                  type="text"
                  value={formData.expression}
                  onChange={(e) => handleInputChange('expression', e.target.value)}
                  placeholder="Contoh: tersenyum hangat dan percaya diri"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800"
                />
              </div>

              {/* 4. Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  4. Tempat
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Contoh: taman kota yang hijau dengan bunga-bunga bermekaran"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800"
                />
              </div>

              {/* 5. Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  5. Waktu
                </label>
                <select
                  value={formData.timeOfDay}
                  onChange={(e) => handleInputChange('timeOfDay', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-800"
                >
                  {timeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 6. Camera Movement */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  6. Gerakan Kamera
                </label>
                <select
                  value={formData.cameraMovement}
                  onChange={(e) => handleInputChange('cameraMovement', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-800"
                >
                  {cameraMovementOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 7. Lighting */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  7. Pencahayaan
                </label>
                <select
                  value={formData.lighting}
                  onChange={(e) => handleInputChange('lighting', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-800"
                >
                  {lightingOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 8. Video Style */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  8. Gaya Video
                </label>
                <select
                  value={formData.videoStyle}
                  onChange={(e) => handleInputChange('videoStyle', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-800"
                >
                  {videoStyleOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 9. Video Mood */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  9. Suasana Video
                </label>
                <select
                  value={formData.videoMood}
                  onChange={(e) => handleInputChange('videoMood', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-800"
                >
                  {videoMoodOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 10. Sound/Music */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  10. Suara atau Musik
                </label>
                <input
                  type="text"
                  value={formData.soundMusic}
                  onChange={(e) => handleInputChange('soundMusic', e.target.value)}
                  placeholder="Contoh: musik jazz lembut dengan suara alam"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800"
                />
              </div>

              {/* 11. Spoken Words */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  11. Kalimat yang Diucapkan
                </label>
                <input
                  type="text"
                  value={formData.spokenWords}
                  onChange={(e) => handleInputChange('spokenWords', e.target.value)}
                  placeholder="Contoh: Selamat pagi, hari ini akan menjadi hari yang indah"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800"
                />
              </div>

              {/* 12. Additional Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  12. Detail Tambahan
                </label>
                <textarea
                  value={formData.additionalDetails}
                  onChange={(e) => handleInputChange('additionalDetails', e.target.value)}
                  placeholder="Tambahkan detail khusus seperti kostum, efek visual, transisi, dll."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800"
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
            {(generatedPrompts.indonesian || generatedPrompts.english) && (
              <div className="space-y-5">
                <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-3 rounded-lg">
                  <h2 className="text-lg sm:text-xl font-semibold">Hasil Prompt</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Indonesian Prompt - Editable */}
                  <div className="bg-blue-50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-blue-800">
                        Prompt Bahasa Indonesia (Editable)
                      </h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => copyToClipboard(editableIndonesian, 'id')}
                          className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors duration-200"
                          title="Copy ke clipboard"
                        >
                          <Copy className="w-4 h-4 text-blue-600" />
                        </button>
                        <button
                          onClick={() => downloadPrompt(editableIndonesian, 'prompt-indonesia.txt')}
                          className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors duration-200"
                          title="Download prompt"
                        >
                          <Download className="w-4 h-4 text-blue-600" />
                        </button>
                      </div>
                    </div>
                    <textarea
                      value={editableIndonesian}
                      onChange={(e) => setEditableIndonesian(e.target.value)}
                      className="w-full h-40 bg-white rounded-lg p-4 border border-blue-200 text-gray-800 leading-relaxed resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={updateEnglishFromIndonesian}
                      className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2"
                    >
                      <Edit3 className="w-4 h-4" />
                      Update English Version
                    </button>
                    {copied === 'id' && (
                      <p className="text-green-600 text-sm mt-2">✓ Copied to clipboard!</p>
                    )}
                  </div>

                  {/* English Prompt - Read Only */}
                  <div className="bg-green-50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-green-800">
                        English Prompt (Final)
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
                    <div className="bg-white rounded-lg p-4 border border-green-200 h-40 overflow-y-auto">
                      <p className="text-gray-800 leading-relaxed">
                        {generatedPrompts.english}
                      </p>
                    </div>
                    {copied === 'en' && (
                      <p className="text-green-600 text-sm mt-2">✓ Copied to clipboard!</p>
                    )}
                  </div>
                </div>

                {/* Usage Tips */}
                <div className="bg-yellow-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-3">
                    Tips Penggunaan
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-yellow-700 text-sm">
                    <div>
                      <h4 className="font-medium mb-2">Subjek & Aksi:</h4>
                      <ul className="space-y-1">
                        <li>• Deskripsikan subjek dengan detail spesifik</li>
                        <li>• Gunakan aksi yang jelas dan mudah dipahami</li>
                        <li>• Tambahkan ekspresi untuk hasil lebih hidup</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Teknis:</h4>
                      <ul className="space-y-1">
                        <li>• Pilih gerakan kamera yang sesuai dengan mood</li>
                        <li>• Sesuaikan pencahayaan dengan waktu dan tempat</li>
                        <li>• Kombinasikan gaya dan suasana untuk efek maksimal</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Audio:</h4>
                      <ul className="space-y-1">
                        <li>• Deskripsikan musik/suara yang mendukung mood</li>
                        <li>• Kalimat yang diucapkan akan tetap dalam bahasa asli</li>
                        <li>• Gunakan detail tambahan untuk kontrol presisi</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Editing:</h4>
                      <ul className="space-y-1">
                        <li>• Edit prompt Indonesia sesuai kebutuhan</li>
                        <li>• Klik "Update English Version" untuk sinkronisasi</li>
                        <li>• Simpan kedua versi untuk referensi</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Camera Movement Guide */}
                <div className="bg-purple-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">
                    Panduan Gerakan Kamera
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-purple-700 text-sm">
                    <div>
                      <h4 className="font-medium mb-2">Gerakan Dasar:</h4>
                      <ul className="space-y-1">
                        <li>• <strong>Static:</strong> Kamera diam, fokus subjek</li>
                        <li>• <strong>Pan:</strong> Kamera bergerak horizontal</li>
                        <li>• <strong>Tilt:</strong> Kamera bergerak vertikal</li>
                        <li>• <strong>Zoom:</strong> Perubahan focal length</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Gerakan Lanjutan:</h4>
                      <ul className="space-y-1">
                        <li>• <strong>Dolly:</strong> Kamera bergerak maju/mundur</li>
                        <li>• <strong>Crane:</strong> Kamera naik/turun</li>
                        <li>• <strong>Orbital:</strong> Kamera mengelilingi subjek</li>
                        <li>• <strong>3D Rotation:</strong> Rotasi kompleks</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Efek Khusus:</h4>
                      <ul className="space-y-1">
                        <li>• <strong>Vertigo:</strong> Zoom + dolly berlawanan</li>
                        <li>• <strong>Whip Pan:</strong> Pan sangat cepat</li>
                        <li>• <strong>Dutch Angle:</strong> Kamera miring</li>
                        <li>• <strong>Parallax:</strong> Efek kedalaman</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Lighting Guide */}
                <div className="bg-orange-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-orange-800 mb-3">
                    Panduan Pencahayaan
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-orange-700 text-sm">
                    <div>
                      <h4 className="font-medium mb-2">Pencahayaan Alami:</h4>
                      <ul className="space-y-1">
                        <li>• <strong>Golden Hour:</strong> 1 jam setelah sunrise/sebelum sunset</li>
                        <li>• <strong>Blue Hour:</strong> Saat transisi siang-malam</li>
                        <li>• <strong>Natural:</strong> Cahaya matahari langsung</li>
                        <li>• <strong>Moonlight:</strong> Cahaya bulan, atmosfer misterius</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Pencahayaan Buatan:</h4>
                      <ul className="space-y-1">
                        <li>• <strong>Studio:</strong> Pencahayaan terkontrol, profesional</li>
                        <li>• <strong>Neon:</strong> Cahaya neon, efek urban</li>
                        <li>• <strong>Candlelight:</strong> Cahaya lilin, romantis/dramatis</li>
                        <li>• <strong>Rim Lighting:</strong> Cahaya tepi, siluet</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Teknik Pencahayaan:</h4>
                      <ul className="space-y-1">
                        <li>• <strong>Soft Light:</strong> Cahaya lembut, bayangan halus</li>
                        <li>• <strong>Hard Light:</strong> Cahaya keras, kontras tinggi</li>
                        <li>• <strong>Backlit:</strong> Cahaya dari belakang subjek</li>
                        <li>• <strong>Low/High Key:</strong> Dominasi bayangan/cahaya</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Mood Pencahayaan:</h4>
                      <ul className="space-y-1">
                        <li>• <strong>Dramatic:</strong> Kontras tinggi, bayangan kuat</li>
                        <li>• <strong>Romantic:</strong> Cahaya hangat, lembut</li>
                        <li>• <strong>Mystery:</strong> Pencahayaan tidak merata</li>
                        <li>• <strong>Commercial:</strong> Pencahayaan merata, bersih</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;