import { useState } from 'react';

export default function ProductsServicesPage(): JSX.Element {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">产品及服务</h1>
            <p className="text-xl max-w-4xl mx-auto opacity-90">
              AI赋能的数据采集、处理、分析及报告生成平台，为临床试验提供全方位技术支持
            </p>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Data Management Systems */}
            <div>
              <div className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                <div className="card-body">
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="card-title text-lg">数据管理系统</h3>
                  </div>

                  <div className="card-actions justify-center flex-wrap mt-auto">
                    <div className="badge badge-primary badge-sm">云端部署</div>
                    <div className="badge badge-outline badge-sm">SAAS模式</div>
                    <div className="badge badge-secondary badge-sm">全模块覆盖</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Clean & Prepare */}
            <div>
              <div className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                <div className="card-body">
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </div>
                    <h3 className="card-title text-lg">数据清理与准备</h3>
                  </div>

                  <div className="card-actions justify-center flex-wrap mt-auto">
                    <div className="badge badge-primary badge-sm">智能清理</div>
                    <div className="badge badge-outline badge-sm">可追溯</div>
                    <div className="badge badge-secondary badge-sm">合规导出</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistical Analysis */}
            <div>
              <div className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                <div className="card-body">
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="card-title text-lg">统计分析</h3>
                  </div>

                  <div className="card-actions justify-center flex-wrap mt-auto">
                    <div className="badge badge-primary badge-sm">零代码分析</div>
                    <div className="badge badge-outline badge-sm">多引擎支持</div>
                    <div className="badge badge-secondary badge-sm">智能推荐</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Visualization */}
            <div>
              <div className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                <div className="card-body">
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="card-title text-lg">数据可视化</h3>
                  </div>

                  <div className="card-actions justify-center flex-wrap mt-auto">
                    <div className="badge badge-primary badge-sm">一键式出图</div>
                    <div className="badge badge-outline badge-sm">发表级质量</div>
                    <div className="badge badge-secondary badge-sm">交互式分析</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Report Generation */}
            <div>
              <div className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                <div className="card-body">
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="card-title text-lg">报告生成</h3>
                  </div>

                  <div className="card-actions justify-center flex-wrap mt-auto">
                    <div className="badge badge-primary badge-sm">模板化生成</div>
                    <div className="badge badge-outline badge-sm">多格式导出</div>
                    <div className="badge badge-secondary badge-sm">智能联动</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* Advantages Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">优势</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Low Barrier */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">低门槛</h3>
              <p className="text-gray-600 text-sm">面向医研与数据团队的直观操作与向导化流程</p>
            </div>

            {/* 10x Efficiency */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">十倍效</h3>
              <p className="text-gray-600 text-sm">端到端流程并行与批量化，典型场景可达 × 10提速</p>
            </div>

            {/* Smart Automation */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">智自动</h3>
              <p className="text-gray-600 text-sm">规则引擎 + AI 辅助</p>
            </div>

            {/* Drag & One-Click */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">拖一键</h3>
              <p className="text-gray-600 text-sm">拖拽式配置与一键生成</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            选择适合您的产品和服务
          </h2>
          <p className="text-xl mb-8 opacity-90">
            专业的医疗信息化解决方案，助力您的临床试验成功
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-primary btn-lg bg-white text-blue-600 hover:bg-gray-100 border-white">
              免费试用
            </button>
            <button className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-blue-600">
              产品演示
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}