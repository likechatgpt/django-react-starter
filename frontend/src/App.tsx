// File: src/App.tsx
import { Link, Route, Switch, useLocation } from 'wouter';
import { Suspense, lazy } from 'react';
import type { NavigationItem } from './types/api';
import './App.css';

// Lazy load all page components for code splitting
const AboutUsPage = lazy(() => import('./pages/AboutUsPage'));
const AICRODetailPage = lazy(() => import('./pages/AICRODetailPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const InvestmentDetailPage = lazy(() => import('./pages/InvestmentDetailPage'));
const JointDevelopmentDetailPage = lazy(() => import('./pages/JointDevelopmentDetailPage'));
const MainBusinessPage = lazy(() => import('./pages/MainBusinessPage'));
const OnlineTrainingPage = lazy(() => import('./pages/OnlineTrainingPage'));
const PartnershipPage = lazy(() => import('./pages/PartnershipPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const ProductsServicesPage = lazy(() => import('./pages/ProductsServicesPage'));

// Loading fallback component for lazy-loaded pages
function PageLoadingFallback(): JSX.Element {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="text-gray-500 text-sm">页面加载中...</p>
      </div>
    </div>
  );
}

function App(): JSX.Element {
  const [location, setLocation] = useLocation();

  const navigation: NavigationItem[] = [
    { id: 'home', name: '首页', icon: '🏠', path: '/' },
    { id: 'products', name: '产品及服务', icon: '📦', path: '/products' },
    { id: 'solutions', name: '解决方案', icon: '💰', path: '/solutions' },
    { id: 'training', name: '在线培训资料', icon: '📚', path: '/training' },
    { id: 'partnership', name: '合作伙伴', icon: '🤝', path: '/partnership' },
    { id: 'about', name: '关于我们', icon: '🏢', path: '/about' }
  ];

  const handleNavigation = (path: string): void => {
    setLocation(path);
  };

  const isActivePath = (path: string): boolean => {
    if (path === '/') {
      return location === '/';
    }

    return location === path || location.startsWith(`${path}/`);
  };

  return (
    <div className="bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 space-x-8">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                AI驱动的数据洞察专家
              </h1>
            </div>

            {/* Navigation Links */}
            <div className="flex space-x-8">
              {navigation.map((item) => {
                const isActive = isActivePath(item.path);
                return (
                  <Link
                    key={item.id}
                    href={item.path}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-2" aria-hidden="true">{item.icon}</span>
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Suspense fallback={<PageLoadingFallback />}>
          <Switch>
            <Route path="/">
              <HomePage onNavigate={handleNavigation} />
            </Route>
            <Route path="/products">
              <ProductsServicesPage />
            </Route>
            <Route path="/solutions">
              <PricingPage />
            </Route>
            <Route path="/training">
              <OnlineTrainingPage />
            </Route>
            <Route path="/partnership/aicro">
              <AICRODetailPage onBack={() => handleNavigation('/partnership')} />
            </Route>
            <Route path="/partnership/joint-development">
              <JointDevelopmentDetailPage onBack={() => handleNavigation('/partnership')} />
            </Route>
            <Route path="/partnership/investment">
              <InvestmentDetailPage onBack={() => handleNavigation('/partnership')} />
            </Route>
            <Route path="/partnership">
              <PartnershipPage onNavigate={handleNavigation} />
            </Route>
            <Route path="/about">
              <AboutUsPage />
            </Route>
            <Route path="/business">
              <MainBusinessPage />
            </Route>
            <Route>
              <div className="py-24 text-center">
                <h2 className="text-3xl font-semibold text-gray-800">页面未找到</h2>
                <p className="mt-4 text-gray-500">请检查链接或返回首页继续浏览。</p>
                <Link
                  href="/"
                  className="inline-flex items-center mt-8 px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  返回首页
                </Link>
              </div>
            </Route>
          </Switch>
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <p className="text-gray-300 mb-4">
                为企业及行业专家提供AI驱动的<span className="text-blue-400 font-bold text-lg">数据采集-清理-统计分析-可视化-报告生成</span>的智能化及自动化服务， 致力于通过AI技术赋能业务增长，推动数字化转型创新。
              </p>
              <div className="flex items-center text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                系统正常运行
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">快速链接</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    首页
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="hover:text-white transition-colors">
                    产品及服务
                  </Link>
                </li>
                <li>
                  <Link href="/solutions" className="hover:text-white transition-colors">
                    解决方案
                  </Link>
                </li>
                <li>
                  <Link href="/training" className="hover:text-white transition-colors">
                    在线培训资料
                  </Link>
                </li>
                <li>
                  <Link href="/partnership" className="hover:text-white transition-colors">
                    合作伙伴
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    关于我们
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">联系方式</h4>
              <div className="space-y-2 text-gray-300 text-sm">
                <p>📧 info@lingzhishidai.com</p>
                <p>📞 +86-10-XXXX-XXXX</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2025 北京凌智时代科技有限责任公司. 版权所有.
            </div>
            <div className="flex items-center mt-4 md:mt-0 space-x-6 text-sm text-gray-400">
              <a
                href="http://127.0.0.1:8000/api/v1/docs/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                📚 API 文档
              </a>
              <a
                href="http://127.0.0.1:8000/admin/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                ⚙️ 管理后台
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
