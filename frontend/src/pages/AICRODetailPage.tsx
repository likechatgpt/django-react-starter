interface AICRODetailPageProps {
  onBack: () => void;
}

export default function AICRODetailPage({ onBack }: AICRODetailPageProps): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">AI+CRO合作计划</h1>
            <p className="text-xl max-w-4xl mx-auto opacity-90">
              颠覆传统，融合创新 - 引领临床研究数字化转型
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

          {/* Section 1: 从 ChatGPT 开始的指数级跃迁 */}
          <section className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">从 ChatGPT 开始的指数级跃迁</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              自 2022 年 ChatGPT 面世，通用对话式界面把"模型能力"转化为"可消费的生产力"，并在随后两年里沿着"多模态、长上下文、工具调用、结构化输出、低成本推理"的五条曲线持续加速：文本-图像-语音一体化使知识表达与任务编排更贴近业务流程；检索增强与函数调用把模型嵌入系统，促成"模型-数据-工具"闭环；上下文扩展与记忆机制降低了复杂任务的分段与移交成本；而模型治理、评测与安全对齐的成熟，让"可演示"迈向"可生产、可审计、可迭代"的工程化阶段。由此，AI 从单点智能走向平台化能力，单位算力的有效产出与单位任务的总体拥有成本同步改善，呈现出近似指数级的可用性提升与落地范围扩张。
            </p>
          </section>

          {/* Section 2: AI+CRO 对行业的颠覆式影响 */}
          <section className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">AI+CRO 对行业的颠覆式影响</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              在临床研究全链条中，AI 正把"人海+流程驱动"重构为"数据+模型驱动"。方案设计与可行性评估阶段，知识图谱与真实世界证据帮助进行证据拼接与风险预估；入组与中心选择阶段，智能匹配与预测提升受试者筛选效率与命中率；数据管理阶段，智能 e-CRF 与规则引擎协同，完成跨表一致性检查、医学词典对齐与查询自动化，缩短清洗与锁库周期；统计分析与报告阶段，SDTM/ADaM 标准化流水线与自动化 TFL/CSR/SAP 草拟/复核，使"可追溯、可复核"的产物成为默认结果；运营与合规层面，将 21 CFR Part 11、ICH-GCP、GDPR/PIPL 等要求内生于流程与系统，通过版本控制、审计追踪与变更管理形成闭环治理。与传统模式相比，AI+CRO 在效率（从建库到锁库的端到端时效）、质量（差错率与再加工率）、风险（RBQM 的前瞻性与分级响应）上实现阶跃式提升，并把"经验"沉淀为"可复用的模型与模板"，从而对行业范式产生结构性颠覆。
            </p>
          </section>

          {/* Section 3: 凌智时代的优势 */}
          <section className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">凌智时代的优势</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              凌智时代以"数据中台 + 规则引擎 + 可插拔 AI 组件"为底座，面向 EDC/e-CRF 智能生成、跨表校验与医学编码、自动化统计与报表输出构建了产品化与工程化并重的能力体系，支持 Python/SAS/R 多引擎协同与本地化/私有化/分区部署；在工程治理上，强调版本路线图与 SLA、计算机化系统验证（CSV）证据留存、API/微服务架构与源码托管安排，确保可审计、可集成、可持续。
            </p>
          </section>

          {/* Section 4: 为您的CRO公司带来的变化 */}
          <section className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">为您的CRO公司带来的变化</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              面向经营结果，AI+CRO 的引入将带来可观且可衡量的跃迁：首先，端到端交付效率显著提升 3–5 倍，体现在建库—清洗—锁库—统计—报告的整体节拍压缩与并行化执行，项目排期更可预期、产能更可规模化；其次，自动化、智能化、可交互的流程设计，员工使用门槛降低，新人上手更快、培训周期与对关键稀缺人力的依赖度下降，从而降低人力资源成本；第三，服务质量提升成为系统性结果：合规规则内生、审计追踪全链路留痕、版本与变更可控，推动差错率与返工率下降、SLA（Service Level Agreement，服务级别协议）达成与复核一致性提升，持续改进可被数据化度量；最后，凭借"合规可审计 + 规模化交付"的可信能力底座，贵司的目标客户层级提升（有能力服务更高等级申办方与多中心/国际项目），由此带来更强的议价权与盈利溢价空间，延伸商业边界，实现效率—质量—利润的同向增强与可持续增长。
            </p>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">开启AI+CRO合作之旅</h2>
            <p className="text-xl mb-6 opacity-90">
              联系我们，了解如何通过AI技术转型升级您的CRO业务
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary btn-lg bg-white text-blue-600 hover:bg-gray-100 border-white">
                立即咨询
              </button>
              <button className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-blue-600">
                下载详细方案
              </button>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}