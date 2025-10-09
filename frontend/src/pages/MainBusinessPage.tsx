
export default function MainBusinessPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">主营业务</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              为医疗健康行业提供全方位的信息化解决方案和专业服务
            </p>
          </div>
        </div>
      </section>

      {/* Business Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">业务概览</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              我们专注于医疗信息化服务，提供从软件产品到完整解决方案的全方位服务，
              助力制药企业、生物技术公司和临床研究中心提升效率和质量
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">产品服务</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  EDC/DM电子数据采集与管理系统
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  离线录入系统与中央随机化系统
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  SAE严重不良事件监测系统
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  生物标本库管理系统
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  统计分析工具与科室随访系统
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">服务模式</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  SAAS模式：软件租赁，即开即用
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  定制EDC服务：个性化解决方案
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  临床试验服务：全流程外包
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  整体外包：一站式解决方案
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  7×24技术支持与培训服务
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">核心产品</h2>
            <p className="text-xl text-gray-600">专业的医疗信息化产品矩阵</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {/* EDC/DM System */}
            <div className="card bg-white shadow-xl hover:shadow-2xl transition-shadow">
              <figure className="px-6 pt-6">
                <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </figure>
              <div className="card-body">
                <h3 className="card-title">EDC/DM系统</h3>
                <p className="text-gray-600">
                  电子数据采集与数据管理系统，支持电子CRF设计、平台搭建、权限管理、
                  数据质量控制、逻辑验证和多终端数据导入。
                </p>
                <div className="card-actions justify-start mt-4">
                  <div className="badge badge-primary">云端部署</div>
                  <div className="badge badge-outline">实时同步</div>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">核心功能：</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 电子病例报告表（eCRF）设计</li>
                    <li>• 数据录入与验证</li>
                    <li>• 质量控制与质疑管理</li>
                    <li>• 用户权限与审计追踪</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Offline Entry System */}
            <div className="card bg-white shadow-xl hover:shadow-2xl transition-shadow">
              <figure className="px-6 pt-6">
                <div className="w-20 h-20 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
              </figure>
              <div className="card-body">
                <h3 className="card-title">离线录入系统</h3>
                <p className="text-gray-600">
                  支持离线数据录入和同步的移动端解决方案，适用于网络环境不稳定的
                  临床研究场景。
                </p>
                <div className="card-actions justify-start mt-4">
                  <div className="badge badge-secondary">离线支持</div>
                  <div className="badge badge-outline">移动端</div>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">核心功能：</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 离线数据录入与存储</li>
                    <li>• 自动数据同步</li>
                    <li>• 冲突检测与解决</li>
                    <li>• 移动设备管理</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Randomization System */}
            <div className="card bg-white shadow-xl hover:shadow-2xl transition-shadow">
              <figure className="px-6 pt-6">
                <div className="w-20 h-20 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
              </figure>
              <div className="card-body">
                <h3 className="card-title">中央随机化系统</h3>
                <p className="text-gray-600">
                  提供灵活的随机化方案设计和实施，支持多种随机化算法和分层因素配置。
                </p>
                <div className="card-actions justify-start mt-4">
                  <div className="badge badge-accent">算法优化</div>
                  <div className="badge badge-outline">多分层</div>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">核心功能：</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 随机化方案设计</li>
                    <li>• 分层随机化</li>
                    <li>• 紧急信封管理</li>
                    <li>• 随机化报告</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* SAE Monitoring */}
            <div className="card bg-white shadow-xl hover:shadow-2xl transition-shadow">
              <figure className="px-6 pt-6">
                <div className="w-20 h-20 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </figure>
              <div className="card-body">
                <h3 className="card-title">SAE监测系统</h3>
                <p className="text-gray-600">
                  严重不良事件监测与报告系统，确保试验安全性数据的及时收集和处理。
                </p>
                <div className="card-actions justify-start mt-4">
                  <div className="badge badge-warning">安全监测</div>
                  <div className="badge badge-outline">实时报告</div>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">核心功能：</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• SAE事件录入与跟踪</li>
                    <li>• 自动报告生成</li>
                    <li>• 安全信号检测</li>
                    <li>• 法规合规报告</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Biospecimen Bank */}
            <div className="card bg-white shadow-xl hover:shadow-2xl transition-shadow">
              <figure className="px-6 pt-6">
                <div className="w-20 h-20 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </figure>
              <div className="card-body">
                <h3 className="card-title">生物标本库</h3>
                <p className="text-gray-600">
                  生物样本管理系统，提供样本采集、存储、检索和分发的全流程管理功能。
                </p>
                <div className="card-actions justify-start mt-4">
                  <div className="badge badge-info">样本管理</div>
                  <div className="badge badge-outline">全流程</div>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">核心功能：</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 样本信息管理</li>
                    <li>• 库存追踪与预警</li>
                    <li>• 存储条件监控</li>
                    <li>• 样本分发管理</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Statistical Analysis */}
            <div className="card bg-white shadow-xl hover:shadow-2xl transition-shadow">
              <figure className="px-6 pt-6">
                <div className="w-20 h-20 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </figure>
              <div className="card-body">
                <h3 className="card-title">统计分析工具</h3>
                <p className="text-gray-600">
                  专业的临床试验统计分析工具，支持多种统计方法和数据可视化功能。
                </p>
                <div className="card-actions justify-start mt-4">
                  <div className="badge badge-success">数据分析</div>
                  <div className="badge badge-outline">可视化</div>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">核心功能：</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 描述性统计分析</li>
                    <li>• 推断性统计检验</li>
                    <li>• 图表可视化</li>
                    <li>• 报告自动生成</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">专业服务</h2>
            <p className="text-xl text-gray-600">全方位的临床试验服务解决方案</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Clinical Trial Services */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 ml-4">临床试验服务</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">服务内容：</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      受试者招募与筛选
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      标准操作程序（SOP）制定
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      研究者手册准备
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      试验进度协调与监察
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      数据处理与统计分析
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      质量控制与试验报告撰写
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Outsourcing Services */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 ml-4">整体外包服务</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">服务范围：</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      新药I-IV期临床试验
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      医疗器械试验
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      进口药注册试验
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      国际多中心试验
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      药物动力学研究
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      上市后再评价
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Comparison Table */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">服务对比</h2>
            <p className="text-xl text-gray-600">选择最适合您需求的服务模式</p>
          </div>

          <div className="overflow-x-auto">
            <table className="table table-zebra w-full bg-white shadow-lg rounded-lg">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <th className="text-left">服务类型</th>
                  <th className="text-center">关键功能</th>
                  <th className="text-center">适用场景</th>
                  <th className="text-center">交付周期</th>
                  <th className="text-center">优势特点</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-semibold">SAAS模式EDC</td>
                  <td>标准化EDC平台，快速部署</td>
                  <td>中小型试验，预算有限</td>
                  <td className="text-center">
                    <div className="badge badge-success">1-2周</div>
                  </td>
                  <td>成本低，上线快，维护简单</td>
                </tr>
                <tr>
                  <td className="font-semibold">定制EDC服务</td>
                  <td>个性化CRF设计，定制开发</td>
                  <td>复杂试验，特殊需求</td>
                  <td className="text-center">
                    <div className="badge badge-warning">4-8周</div>
                  </td>
                  <td>高度定制，功能完整，专业支持</td>
                </tr>
                <tr>
                  <td className="font-semibold">临床试验外包</td>
                  <td>全流程项目管理，专业团队</td>
                  <td>缺乏试验经验，人力不足</td>
                  <td className="text-center">
                    <div className="badge badge-info">按项目</div>
                  </td>
                  <td>专业团队，质量保证，风险控制</td>
                </tr>
                <tr>
                  <td className="font-semibold">整体外包</td>
                  <td>一站式解决方案，端到端服务</td>
                  <td>大型试验，国际多中心</td>
                  <td className="text-center">
                    <div className="badge badge-error">6个月+</div>
                  </td>
                  <td>全面服务，降低风险，提升效率</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Industry Applications */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">行业应用</h2>
            <p className="text-xl text-gray-600">服务医疗健康行业的各个领域</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">制药企业</h3>
              <p className="text-gray-600">
                为国内外制药企业提供从研发到上市的全周期临床试验信息化支持，
                帮助提升新药开发效率和质量。
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">生物技术公司</h3>
              <p className="text-gray-600">
                为生物技术公司提供专业的生物制品临床试验服务，
                支持创新生物药物的研发和注册申报。
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m11 0v-2a2 2 0 00-2-2h-2m-5 0v6m3 0V9l-3-3H9l-3 3v12m5-5h2m-2 0h2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">临床研究中心</h3>
              <p className="text-gray-600">
                为医院和独立的临床研究中心提供EDC系统和数据管理服务，
                提升临床研究的科学性和规范性。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">选择我们的专业服务</h2>
          <p className="text-xl mb-8 opacity-90">
            让我们的专业团队为您的临床试验项目提供全方位支持
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-primary btn-lg bg-white text-indigo-600 hover:bg-gray-100 border-white">
              获取产品演示
            </button>
            <button className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-indigo-600">
              咨询专业服务
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}