import { useState } from 'react';

interface PartnershipPageProps {
  onNavigate?: (path: string) => void;
}

export default function PartnershipPage({ onNavigate }: PartnershipPageProps): JSX.Element {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    cooperationType: '',
    projectDescription: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    alert('感谢您的咨询！我们将在24小时内与您联系。');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">合作伙伴</h1>
            <p className="text-xl max-w-4xl mx-auto opacity-90">
              携手推动行业创新，共创智能化未来 - 欢迎与我们合作
            </p>
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">合作类型</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              我们提供多种合作模式，满足不同的需求
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Technical Cooperation */}
            <div
              className="card bg-white shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 cursor-pointer"
              onClick={() => onNavigate?.('/partnership/aicro')}
            >
              <figure className="px-6 pt-6">
                <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </figure>
              <div className="card-body text-center">
                <h3 className="card-title justify-center">AI+CRO合作计划</h3>
                <p className="text-gray-600">
                  颠覆传统，融合创新
                </p>
                <div className="card-actions justify-center mt-4">
                  <div className="badge badge-primary">AI联合研发</div>
                  <div className="badge badge-outline">技术共享</div>
                </div>
                <div className="mt-4">
                  <div className="text-sm text-blue-600 font-medium">点击了解详情 →</div>
                </div>
              </div>
            </div>

            {/* Strategic Partnership */}
            <div
              className="card bg-white shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 cursor-pointer"
              onClick={() => onNavigate?.('/partnership/joint-development')}
            >
              <figure className="px-6 pt-6">
                <div className="w-20 h-20 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </figure>
              <div className="card-body text-center">
                <h3 className="card-title justify-center">联合开发</h3>
                <p className="text-gray-600">
                  联合开发AI模块、共享技术成果、建立技术标准
                </p>
                <div className="card-actions justify-center mt-4">
                  <div className="badge badge-accent">长期合作</div>
                  <div className="badge badge-outline">互利共赢</div>
                </div>
                <div className="mt-4">
                  <div className="text-sm text-purple-600 font-medium">点击了解详情 →</div>
                </div>
              </div>
            </div>

            {/* Investment Opportunity */}
            <div
              className="card bg-white shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 cursor-pointer"
              onClick={() => onNavigate?.('/partnership/investment')}
            >
              <figure className="px-6 pt-6">
                <div className="w-20 h-20 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </figure>
              <div className="card-body text-center">
                <h3 className="card-title justify-center">投资机会</h3>
                <p className="text-gray-600">
                  独占许可投资、股权投资
                </p>
                <div className="card-actions justify-center mt-4">
                  <div className="badge badge-warning">股权投资</div>
                  <div className="badge badge-outline">高成长性</div>
                </div>
                <div className="mt-4">
                  <div className="text-sm text-orange-600 font-medium">点击了解详情 →</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


{/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">立即联系我们</h2>
              <p className="text-xl text-gray-600">
                填写以下表单，我们将在1-2周内与您联系，探讨合作机会
              </p>
            </div>

            <div className="flex justify-center">
              {/* Contact Form */}
              <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">工作单位/公司</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="请输入您的公司名称"
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">联系人 *</span>
                    </label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      placeholder="请输入联系人姓名"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">邮箱 *</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="请输入邮箱地址"
                        className="input input-bordered w-full"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">电话 *</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="请输入联系电话"
                        className="input input-bordered w-full"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">合作类型 *</span>
                    </label>
                    <select
                      name="cooperationType"
                      value={formData.cooperationType}
                      onChange={handleInputChange}
                      className="select select-bordered w-full"
                      required
                    >
                      <option value="">请选择合作类型</option>
                      <option value="AI+CRO合作计划">AI+CRO合作计划</option>
                      <option value="联合开发">联合开发</option>
                      <option value="投资机会">投资机会</option>
                      <option value="其他">其他</option>
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">项目描述</span>
                    </label>
                    <textarea
                      name="projectDescription"
                      value={formData.projectDescription}
                      onChange={handleInputChange}
                      placeholder="请简要描述您的项目需求或合作意向"
                      className="textarea textarea-bordered h-24"
                    ></textarea>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">补充信息</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="其他需要说明的信息"
                      className="textarea textarea-bordered h-24"
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary w-full">
                    提交表单
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            让我们携手推动医疗创新，共创智能化未来
          </h2>
          <p className="text-xl mb-8 opacity-90">
            无论您是制药企业、生物技术公司、临床研究机构还是投资机构，我们都期待与您的合作
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-primary btn-lg bg-white text-blue-600 hover:bg-gray-100 border-white">
              立即咨询合作
            </button>
            <button className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-blue-600">
              下载合作手册
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
