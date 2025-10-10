interface JointDevelopmentDetailPageProps {
  onBack: () => void;
}

export default function JointDevelopmentDetailPage({ onBack }: JointDevelopmentDetailPageProps): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-700 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">联合开发</h1>
            <p className="text-xl max-w-4xl mx-auto opacity-90">
              联合开发AI模块、共享技术成果、建立技术标准
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

      {/* Content Sections */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-12">

          {/* Section 1: 与行业专家合作 */}
          <section className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">与行业专家合作（临床/统计方法学/医学方案设计/监管合规/PV等）</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              在临床科研及制药行业，行业专家凭借深厚的专业积累和实践经验，具备独特的优势：他们精通临床试验设计、统计方法学的严谨分析、医学方案的创新优化、监管合规的全球标准，以及药物警戒（PV）的风险管理，能够驱动药物研发从概念到上市的全链条高效运转。当您的这些优势与人工智能（AI）深度融合时，将为您的专业知识插上腾飞的翅膀——AI的算法模型可以自动化数据处理、预测潜在风险、加速方案迭代，让专家的洞见从个体经验转化为可规模化的智能解决方案。作为跨领域融合的领先者，凌智时代具备作为跨领域融合的优势，协助行业专家把专业知识和经验沉淀为行业通用的工具。因此，整个行业受益于您的智慧，推动集体进步；其次，通过灵活的合作机制，如项目合伙、远程咨询或股权激励模式，您的职业生涯将跃升到更高层次，开启从专家到行业领袖的转型之旅。
            </p>

            {/* Highlight Benefits */}
            <div className="mt-8 bg-purple-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-purple-800 mb-4">核心优势</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>将专业知识转化为可规模化的智能解决方案</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>推动整个行业的集体进步和智能化升级</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>灵活的合作机制：项目合伙、远程咨询、股权激励</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>从专家到行业领袖的职业转型机会</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 2: 与AI专家合作 */}
          <section className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">与AI专家合作</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              AI专家凭借在机器学习、深度学习和数据算法领域的核心专长，具备独特的优势。AI+垂直领域将是未来的趋势，尤其是AI+制药行业，将两个顶尖行业深度融合，形成强大的护城河——制药领域的庞大数据资源与临床洞见，将为AI算法提供独特的训练土壤，使您的AI专业发挥最大的优势，创造出难以复制的创新解决方案。凌智时代公司具备将制药行业中的具体痛点抽象为需要AI解决的技术任务的核心能力，帮助您轻松跨过AI与医学之间的鸿沟，让您的AI技术在创新的海洋遨游。我们愿意与AI专家合作共同开发AI模块，合作方式灵活多样，包括联合研发项目、模块化贡献、股权激励或远程咨询模式，让您的技术专长转化为行业变革的引擎，推动制药领域的智能化转型。
            </p>

            {/* Highlight Benefits */}
            <div className="mt-8 bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-800 mb-4">核心优势</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>AI+制药：顶尖行业深度融合，形成强大护城河</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>制药数据资源为AI算法提供独特训练土壤</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>跨越AI与医学鸿沟，痛点抽象化技术转换</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>多样化合作模式：联合研发、模块化贡献、股权激励</span>
                </li>
              </ul>
            </div>
          </section>


          {/* CTA Section */}
          <section className="bg-gradient-to-r from-purple-600 to-blue-700 text-white rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">开启联合开发合作</h2>
            <p className="text-xl mb-6 opacity-90">
              无论您是行业专家还是AI专家，我们都期待与您携手开创智能化未来
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary btn-lg bg-white text-purple-600 hover:bg-gray-100 border-white">
                专家合作咨询
              </button>
              <button className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-purple-600">
                AI专家咨询
              </button>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}