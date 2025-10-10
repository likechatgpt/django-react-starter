import { useState } from 'react';

export default function PricingPage(): JSX.Element {
  const [activeTab, setActiveTab] = useState('数据管理系统');

  const tabs = [
    '数据管理系统',
    '数据清理与准备',
    '统计分析',
    '数据可视化',
    '报告生成'
  ];

  const pricingData = {
    '数据管理系统': {
      免费版: {
        price: '¥0',
        period: '永久免费',
        features: [
          '小样本或单中心试点、课题预研',
          '1个项目数',
          '受限的EDC功能',
          '邮件支持，不保证响应时效',
          '项目期限最多2年',
          '按照操作手册自行设计e-CRF',
          '*免费名额以邀请码形式发放，60天未激活自动回收'
        ]
      },
      学术版: {
        price: '¥299',
        period: '每月',
        features: [
          'EDC系统',
          '自行设计e-CRF（可选）',
          'e-PRO患者报告',
          '电子知情同意',
          '随机系统（不包含药物）',
          '数据导出与分析集成',
          'API接口',
          '合规与安全',
          '按模块、按需计费方式'
        ]
      },
      企业版: {
        price: '¥999',
        period: '每月',
        features: [
          'EDC系统',
          'e-PRO患者报告',
          '电子知情同意',
          '随机系统',
          '药品管理系统',
          '医学监查系统',
          'API接口',
          'AI集成',
          '高级数据验证',
          'CDISC 标准、WHOdrug 标准支持',
          '数据导出与SAS分析集成',
          '按模块、按需计费方式',
          '行业专家支持',
          '7×24小时支持'
        ]
      }
    },
    '数据清理与准备': {
      免费版: {
        price: '¥0',
        period: '永久免费',
        features: [
          '网页版',
          'excel及csv格式文件',
          '单sheet支持',
          '基本清理操作',
          '文件大小受限',
          '有限处理次数/天',
          '社区支持'
        ]
      },
      学术版: {
        price: '¥199',
        period: '每月',
        features: [
          '面向高校、研究院、教学医院的非商业科研场景',
          '本地桌面版',
          '多格式多表导入导出',
          '高级清理算法',
          '自定义清理规则',
          'EDC 对接',
          'AI集成',
          '科研复现，论文与伦理复核',
          '安全合规',
          '计费方式灵活（支持按周/月/年）',
          '授权（个人/团队/项目）'
        ]
      },
      企业版: {
        price: '¥599',
        period: '每月',
        features: [
          '面向CRO公司、生物制药公司等等商业与受监管环境',
          '本地桌面版+私有云',
          '多格式多表导入导出',
          '高级清理算法',
          '自定义清理规则',
          '商业词典对接（客户自有许可）',
          'EDC 对接 + 医学监查+ PV 协同',
          'AI集成',
          '自动化、智能化设计',
          '自动化清理报告/医学监查报告生成',
          '安全与合规（企业级基线）',
          'SLA 与支持'
        ]
      }
    },
    '统计分析': {
      免费版: {
        price: '¥0',
        period: '永久免费',
        features: [
          '基础统计分析',
          '描述性统计',
          '简单假设检验',
          '基础图表',
          '社区支持'
        ]
      },
      学术版: {
        price: '¥399',
        period: '每月',
        features: [
          '面向高校、研究院、教学医院的非商业科研场景',
          '多格式多表导入导出',
          '常见统计方法',
          'R/Python支持',
          '自动化、智能化探索性数据分析（EDA)',
          'EDC 对接',
          'AI集成',
          '安全合规',
          '计费方式灵活（支持按周/月/年）',
          '授权（个人/团队）'
        ]
      },
      企业版: {
        price: '¥1299',
        period: '每月',
        features: [
          '面向CRO公司、生物制药公司等等商业与受监管环境',
          '本地桌面版+私有云',
          'SAS引擎支持',
          '多格式多表导入导出',
          'EDC 对接',
          '商业词典对接（客户自有许可）',
          '一键生成 SAR/TLF/CSR 附录，支持模板库',
          'SAS代码导出',
          '安全合规',
          '个性化功能定制',
          '计费方式（年）',
          '授权（席位/公司）',
          '服务与支持 SLA'
        ]
      }
    },
    '数据可视化': {
      学术版: {
        price: '¥199',
        period: '每月',
        features: [
          '面向高校、研究院、教学医院的非商业科研场景',
          '多格式多表导入',
          '多格式图表导出',
          '一键生成高级图表类型',
          'EDC 对接',
          'AI集成',
          '安全合规',
          '计费方式灵活（支持按周/月/年）',
          '授权（个人/团队）'
        ]
      },
      企业版: {
        price: '¥499',
        period: '每月',
        features: [
          '面向CRO公司、生物制药公司等等商业与受监管环境',
          '本地桌面版+私有云',
          'EDC 对接',
          '一键集成到SAR/CSR',
          '安全合规',
          '个性化功能定制',
          '计费方式（年）',
          '授权（席位/公司）',
          '服务与支持 SLA'
        ]
      }
    },
    '报告生成': {
      企业版: {
        features: [
          '面向CRO公司、生物制药公司等等商业与受监管环境',
          '本地桌面版+私有云',
          '企业级模板',
          '批量生成',
          '可配置审批流及电子签名',
          '团队与协作',
          '安全与身份',
          '计费方式（年）',
          '授权（席位/公司）',
          '服务与支持 SLA'
        ]
      }
    }
  };

  const currentPricing = pricingData[activeTab as keyof typeof pricingData];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">解决方案</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              选择适合您需求的解决方案
            </p>
          </div>
        </div>
      </section>

      {/* Product Tabs */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className={`grid grid-cols-1 gap-8 mx-auto ${activeTab === '报告生成' ? 'max-w-md' : (activeTab === '统计分析' || activeTab === '数据可视化') ? 'max-w-6xl md:grid-cols-2' : 'max-w-6xl md:grid-cols-3'}`}>

            {/* 免费版 - Hidden for 统计分析, 数据可视化, and 报告生成 */}
            {activeTab !== '统计分析' && activeTab !== '数据可视化' && activeTab !== '报告生成' && currentPricing.免费版 && (
              <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">免费版</h3>
                </div>

                <div className="space-y-4 mb-8">
                  {currentPricing.免费版.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                  开始使用
                </button>
              </div>
            )}

            {/* 学术版 - Hidden for 报告生成 */}
            {currentPricing.学术版 && (
              <div className="bg-white rounded-lg shadow-xl p-8 border-2 border-blue-500 relative">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">学术版</h3>
                </div>

                <div className="space-y-4 mb-8">
                  {currentPricing.学术版.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  选择学术版
                </button>
              </div>
            )}

            {/* 企业版 */}
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">企业版</h3>
              </div>

              <div className="space-y-4 mb-8">
                {currentPricing.企业版.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

              <button className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                选择企业版
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section - Only for 数据管理系统 */}
      {activeTab === '数据管理系统' && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">常见问题</h2>
              <p className="text-xl text-gray-600">关于我们定价方案的常见问题解答</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">如何获得免费版</h3>
                <p className="text-gray-600">免费版面向医院/研究中心中热衷临床研究、但资源有限的非高职称研究人员与团队；通过发放邀请券或提交合规材料申请，适用于教学、预研与小规模探索性研究 。</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">我选择学术版，研究经费有限，是否有降低经费的途径</h3>
                <p className="text-gray-600">您可以学习EDC构建手册，并自行构建e-CRF、研究中心、权限等，必要时我们提供有限的指导帮助您完成整个系统的构建，将能为您节省一定的费用。</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">企业版如何定价？</h3>
                <p className="text-gray-600">企业版根据您的具体需求定制，包括用户数量、数据量和功能要求。请联系我们的销售团队获取个性化报价。</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}