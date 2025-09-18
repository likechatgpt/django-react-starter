// File: src/pages/DownloadsPage.tsx
import React, { useState } from 'react';
import { useDownloads, usePopularDownloads, useRecentDownloads } from '../hooks/useApi';
import DownloadCard from '../components/DownloadCard';
import type { Download, TabData } from '../types/api';

type TabId = 'all' | 'popular' | 'recent';

const DownloadsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('all');

  const { data: allDownloads, loading: allLoading, error: allError } = useDownloads();
  const { data: popularDownloads, loading: popularLoading, error: popularError } = usePopularDownloads();
  const { data: recentDownloads, loading: recentLoading, error: recentError } = useRecentDownloads();

  const tabs: TabData<Download>[] = [
    { id: 'all', label: 'All Downloads', data: allDownloads, loading: allLoading, error: allError },
    { id: 'popular', label: 'Most Popular', data: popularDownloads, loading: popularLoading, error: popularError },
    { id: 'recent', label: 'Most Recent', data: recentDownloads, loading: recentLoading, error: recentError }
  ];

  const currentTab = tabs.find(tab => tab.id === activeTab);

  const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center py-12">
      <svg className="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  );

  const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <div className="text-red-600 mb-2">
        <svg className="w-12 h-12 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Downloads</h3>
      <p className="text-red-600">{message}</p>
    </div>
  );

  const EmptyState: React.FC = () => (
    <div className="text-center py-12">
      <div className="text-gray-400 mb-4">
        <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"/>
          <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd"/>
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-600 mb-2">No Downloads Available</h3>
      <p className="text-gray-500">There are no downloads to display at the moment.</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Downloads</h1>
        <p className="text-gray-600">Browse and download available files and resources.</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabId)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
              {tab.data && (
                <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2 rounded-full text-xs">
                  {Array.isArray(tab.data) ? tab.data.length : 0}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {currentTab?.loading && <LoadingSpinner />}

        {currentTab?.error && <ErrorMessage message={currentTab.error} />}

        {!currentTab?.loading && !currentTab?.error && (
          <>
            {!currentTab?.data || currentTab.data.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentTab.data.map((download) => (
                  <DownloadCard key={download.id} download={download} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Stats Footer */}
      {currentTab?.data && currentTab.data.length > 0 && (
        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Download Statistics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{currentTab.data.length}</div>
              <div className="text-sm text-gray-500">Available Downloads</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {currentTab.data.reduce((total, download) => total + download.download_count, 0)}
              </div>
              <div className="text-sm text-gray-500">Total Downloads</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {currentTab.data.filter(d => d.file_size).reduce((total, download) => total + (download.file_size || 0), 0) > 0
                  ? `${Math.round(currentTab.data.filter(d => d.file_size).reduce((total, download) => total + (download.file_size || 0), 0) / 1024 / 1024)} MB`
                  : 'N/A'
                }
              </div>
              <div className="text-sm text-gray-500">Total File Size</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadsPage;