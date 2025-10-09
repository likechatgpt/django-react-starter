
export default function AboutUsPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">关于我们</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              北京凌智时代科技有限责任公司 - AI驱动的数据洞察智能化及自动化专家
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">公司概况</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  <strong>北京凌智时代科技有限责任公司</strong>成立于2010年。
                </p>
                <p>
                  公司成立初期，主要致力于为制药企业、生物技术公司及临床研究中心提供高质量的EDC系统、数据管理和临床试验外包服务。
                </p>
                <p>
                  随着AI技术的迅猛进步，公司积极拥抱前沿创新，专注于AI驱动的数据洞察智能化与自动化服务，利用AI技术全面重塑临床研究中的数据采集、处理、分析及报告流程，实现智能化与自动化转型，为临床科研和制药行业注入强劲新动能。
                </p>
                <p>
                  在AI技术高速发展的时代背景下，人与人之间的合作模式以及公司组织架构正面临深刻变革。公司以AI未来为视野，诚邀志同道合的伙伴共同探索，建立适应AI时代的全新合作关系与创新模式。
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-lg">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">2010</div>
                  <div className="text-gray-600">成立年份</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
                  <div className="text-gray-600">年行业经验</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
                  <div className="text-gray-600">合作项目</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                  <div className="text-gray-600">合作机构</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Mission, Vision, Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">使命</h3>
              <p className="text-gray-600 leading-relaxed">
                以AI赋能临床试验，全面提升质量、效率与合规水准。
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">愿景</h3>
              <p className="text-gray-600 leading-relaxed">
                成为国内领先的临床试验数字化智能平台。
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">价值观</h3>
              <p className="text-gray-600 leading-relaxed">
                专业 · 创新 · 诚信 · 协作
              </p>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}