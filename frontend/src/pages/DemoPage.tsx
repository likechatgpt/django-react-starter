import { useState } from "react";

export default function DemoPage(): JSX.Element {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setAnalyzing(true);

    // TODO: Send to backend for AI analysis
    setTimeout(() => setAnalyzing(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            免费体验 AI 数据分析
          </h1>
          <p className="text-xl text-gray-600">
            上传您的数据文件，立即获得智能洞察
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {!file ? (
              <div className="border-4 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-500 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-xl font-semibold text-gray-700 mb-2">
                    点击上传或拖拽文件
                  </p>
                  <p className="text-gray-500">
                    支持 CSV, Excel (.xlsx, .xls) 格式
                  </p>
                </label>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setFile(null)}
                    className="text-red-600 hover:text-red-800"
                  >
                    删除
                  </button>
                </div>

                {analyzing ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-lg font-semibold text-gray-700">AI 正在分析您的数据...</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                        <p className="text-sm opacity-90 mb-2">数据记录数</p>
                        <p className="text-3xl font-bold">1,234</p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                        <p className="text-sm opacity-90 mb-2">数据字段</p>
                        <p className="text-3xl font-bold">12</p>
                      </div>
                      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                        <p className="text-sm opacity-90 mb-2">数据质量</p>
                        <p className="text-3xl font-bold">98%</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">AI 洞察</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2">✓</span>
                          <span>数据完整性良好，缺失值仅占 2%</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2">✓</span>
                          <span>发现 3 个关键相关性模式</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-yellow-600 mr-2">⚠</span>
                          <span>建议对异常值进行进一步检查</span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex gap-4">
                      <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        查看完整报告
                      </button>
                      <button className="flex-1 border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                        导出分析结果
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10秒</div>
              <p className="text-gray-600">快速分析</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">99%</div>
              <p className="text-gray-600">准确率</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <p className="text-gray-600">全天候服务</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}