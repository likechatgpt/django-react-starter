
type HomePageProps = {
  onNavigate: (path: string) => void;
};

export default function HomePage({ onNavigate }: HomePageProps): JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-6xl">
            {/* Company Logo and Title */}
            <div className="mb-8">
              <h1 className="text-6xl font-bold text-gray-900 mb-4">
                凌智时代
              </h1>
              <h2 className="text-2xl text-blue-600 font-semibold mb-6">
                AI驱动的数据洞察智能化及自动化专家
              </h2>
            </div>

            {/* Value Proposition */}
            <div className="mb-12">
              <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                为企业及行业专家提供AI驱动的<span className="text-blue-600 font-bold text-2xl">数据采集-清理-统计分析-可视化-报告生成</span>的智能化及自动化服务，
                致力于通过AI技术赋能业务增长，推动数字化转型创新。
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="stat bg-white bg-opacity-80 rounded-lg shadow-md">
                <div className="stat-figure text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div className="stat-title">成立时间</div>
                <div className="stat-value text-blue-600 text-3xl">15年</div>
                <div className="stat-desc">2010年成立至今</div>
              </div>

              <div className="stat bg-white bg-opacity-80 rounded-lg shadow-md">
                <div className="stat-figure text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div className="stat-title">优势</div>
                <div className="stat-value text-green-600 text-3xl">免编程</div>
                <div className="stat-desc">效率提高10倍以上</div>
              </div>

              <div className="stat bg-white bg-opacity-80 rounded-lg shadow-md">
                <div className="stat-figure text-purple-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <div className="stat-title">技术创新</div>
                <div className="stat-value text-purple-600 text-3xl">AI+</div>
                <div className="stat-desc">AI驱动的数据洞察与自动化</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary btn-lg" onClick={() => onNavigate('/products')}>
                了解我们的服务
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button className="btn btn-outline btn-lg" onClick={() => onNavigate('/partnership')}>
                携手合作
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

{/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            携手推动AI创新，共创智能化数据洞察未来
          </h2>
          <p className="text-xl mb-8 opacity-90">
            欢迎与我们合作，共同探索AI驱动的数据智能化转型之路
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-primary btn-lg bg-white text-blue-600 hover:bg-gray-100 border-white">
              立即咨询
            </button>
            <button className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-blue-600">
              查看案例
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
