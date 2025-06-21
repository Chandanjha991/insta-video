import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaInstagram, FaDownload } from 'react-icons/fa'
import { toast } from 'react-toastify'
import axios from 'axios'

const App: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string>('')
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleDownload = async () => {
    if (!videoUrl) {
      toast.error('Please enter a valid Instagram video URL')
      return
    }

    setLoading(true)
    try {
      // Placeholder for actual Instagram video download API
      const response = await axios.get(`https://api.example.com/instagram-download?url=${encodeURIComponent(videoUrl)}`)
      
      if (response.data.videoUrl) {
        setVideoPreview(response.data.videoUrl)
        toast.success('Video preview loaded successfully!')
      } else {
        toast.error('Unable to fetch video. Please check the URL.')
      }
    } catch (error) {
      toast.error('Error downloading video. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-instagram-bg flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
      >
        <div className="flex items-center justify-center mb-6">
          <FaInstagram className="text-4xl text-instagram-pink mr-3" />
          <h1 className="text-2xl font-bold text-gray-800">Video Downloader</h1>
        </div>

        <div className="mb-4">
          <input 
            type="text" 
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Paste Instagram Video URL" 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-instagram-blue"
          />
        </div>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownload}
          disabled={loading}
          className={`w-full flex items-center justify-center px-4 py-3 bg-instagram-pink text-white rounded-lg transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Fetching...' : (
            <>
              <FaDownload className="mr-2" /> Download Video
            </>
          )}
        </motion.button>

        {videoPreview && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-center"
          >
            <video 
              src={videoPreview} 
              controls 
              className="w-full rounded-lg shadow-md"
            />
            <a 
              href={videoPreview} 
              download 
              className="mt-4 inline-block px-6 py-2 bg-instagram-blue text-white rounded-lg hover:bg-opacity-90 transition-all"
            >
              Save Video
            </a>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default App