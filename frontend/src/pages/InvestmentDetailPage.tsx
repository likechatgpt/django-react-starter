interface InvestmentDetailPageProps {
  onBack: () => void;
}

export default function InvestmentDetailPage({ onBack }: InvestmentDetailPageProps): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-700 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">投资机会</h1>
            <p className="text-xl max-w-4xl mx-auto opacity-90">
              独占许可投资、股权投资 - 抓住AI+制药领域的历史性机遇
            </p>
          </div>
        </div>
      </section>

      {/* Back Button */}
      <div className="container mx-auto px-6 py-4">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          返回合作伙伴
        </button>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-12">

          {/* Main Investment Content */}
          <section className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">AI+制药：颠覆性投资机遇</h2>
            </div>
            <div className="text-gray-700 leading-relaxed text-lg space-y-6">
              <p>
                人工智能（AI）正加速向垂直领域渗透，重塑生产力和生产关系的核心格局，这种变革将催生巨大的财富创造与分配机会——从自动化决策到智能优化，AI将颠覆传统模式，推动资源高效流动与创新爆发。数据的自动化与智能化将成为数据驱动工作流的基础与起点，通过实时分析和预测洞见，为各行业注入颠覆性发展动力，尤其在AI+制药领域，将迎来革命性突破：加速药物发现、优化临床试验、提升监管效率，并显著降低成本与风险。
              </p>
              <p>
                投资凌智时代公司，通过独占许可投资或股权投资的形式，您将早期捕获这一浪潮的丰厚回报，实现资产的指数级增值；同时，您的支持将为凌智时代注入宝贵资源，推动公司实现飞速发展，共同铸就制药AI领域的领导者地位。
              </p>
            </div>
          </section>

          {/* Investment Highlights */}
          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">投资亮点</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Market Opportunity */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">巨大市场机遇</h3>
                <p className="text-gray-600">
                  AI+制药领域正经历指数级增长，预计未来5年市场规模将达数千亿级别，早期投资者将获得巨大回报空间。
                </p>
              </div>

              {/* Technology Leadership */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">技术领先优势</h3>
                <p className="text-gray-600">
                  凌智时代在AI+制药领域具备核心技术壁垒，拥有完整的产品体系和成熟的商业化路径。
                </p>
              </div>

              {/* Strategic Position */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">战略地位独特</h3>
                <p className="text-gray-600">
                  处于AI与制药两大高价值行业的交汇点，具备构建强大护城河的独特优势和稀缺价值。
                </p>
              </div>

              {/* Growth Potential */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">指数级增长潜力</h3>
                <p className="text-gray-600">
                  AI技术的规模化应用将带来收入和利润的指数级增长，为投资者创造超额回报。
                </p>
              </div>

            </div>
          </section>

          {/* Investment Options */}
          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">投资方式</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Exclusive License Investment */}
              <div className="border-2 border-orange-200 rounded-lg p-6 hover:border-orange-400 transition-colors">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">独占许可投资</h3>
                  <p className="text-gray-600 mb-4">
                    获得特定技术或产品的独占使用许可，享受技术变现收益
                  </p>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>独享特定技术领域收益权</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>低风险，稳定回报模式</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>技术商业化直接受益</span>
                  </li>
                </ul>
              </div>

              {/* Equity Investment */}
              <div className="border-2 border-blue-200 rounded-lg p-6 hover:border-blue-400 transition-colors">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">股权投资</h3>
                  <p className="text-gray-600 mb-4">
                    直接持有公司股权，分享公司整体成长红利
                  </p>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>参与公司治理和决策</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>享受公司估值增长收益</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>高增长，高回报潜力</span>
                  </li>
                </ul>
              </div>

            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-orange-600 to-amber-700 text-white rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">把握历史性投资机遇</h2>
            <p className="text-xl mb-6 opacity-90">
              与凌智时代携手，共同开启AI+制药领域的财富新时代
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary btn-lg bg-white text-orange-600 hover:bg-gray-100 border-white">
                投资咨询
              </button>
              <button className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-orange-600">
                索取投资资料
              </button>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}