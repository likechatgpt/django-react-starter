// File: src/components/DownloadCard.tsx
import React, { useState } from 'react';
import { downloadFile } from '../hooks/useApi';
import type { Download } from '../types/api';

interface DownloadCardProps {
  download: Download;
}

const DownloadCard: React.FC<DownloadCardProps> = ({ download }) => {
  const [downloading, setDownloading] = useState<boolean>(false);
  const [downloadCount, setDownloadCount] = useState<number>(download.download_count);

  const handleDownload = async (): Promise<void> => {
    setDownloading(true);
    const success = await downloadFile(download.id);
    
    if (success) {
      // Update local download count
      setDownloadCount(prev => prev + 1);
    }
    
    setDownloading(false);
  };

  const formatFileSize = (bytes: number | null | undefined): string => {
    if (bytes === null || bytes === undefined) return 'Unknown size';
    
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800 truncate">
          {download.title}
        </h3>
        <div className="flex items-center text-sm text-gray-500 ml-4">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"/>
          </svg>
          {downloadCount}
        </div>
      </div>

      {download.description && (
        <p className="text-gray-600 mb-4 line-clamp-3">
          {download.description}
        </p>
      )}

      <div className="flex flex-wrap gap-2 mb-4 text-sm text-gray-500">
        {download.file_name && (
          <span className="bg-gray-100 px-2 py-1 rounded">
            📄 {download.file_name}
          </span>
        )}
        {download.file_size && (
          <span className="bg-gray-100 px-2 py-1 rounded">
            📊 {formatFileSize(download.file_size)}
          </span>
        )}
        <span className="bg-gray-100 px-2 py-1 rounded">
          📅 {formatDate(download.created_at)}
        </span>
      </div>

      <button
        onClick={handleDownload}
        disabled={downloading}
        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
          downloading
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {downloading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Downloading...
          </span>
        ) : (
          'Download File'
        )}
      </button>
    </div>
  );
};

export default DownloadCard;