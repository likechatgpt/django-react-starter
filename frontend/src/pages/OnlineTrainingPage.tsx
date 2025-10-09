import { useEffect, useMemo, useState } from "react";
import type { Download } from "../types/api";

const ALL_CATEGORY_LABEL = "全部";

const formatDate = (dateString?: string): string => {
  if (!dateString) return "未知";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "未知";
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

const getFileType = (fileName?: string | null): string => {
  if (!fileName) return "FILE";
  const extension = fileName.split(".").pop()?.toUpperCase();
  return extension || "FILE";
};

const parseFilenameFromHeader = (header: string | null, fallback: string): string => {
  if (!header) return fallback;
  const match = header.match(/filename\*=UTF-8''([^;]+)|filename="?([^";]+)"?/i);
  if (!match) return fallback;

  const encodedName = match[1] ?? match[2];
  if (!encodedName) return fallback;

  try {
    return decodeURIComponent(encodedName);
  } catch (_error) {
    return encodedName;
  }
};

export default function OnlineTrainingPage(): JSX.Element {
  const [materials, setMaterials] = useState<Download[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORY_LABEL);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const loadDownloads = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/v1/downloads/", {
          signal: controller.signal,
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`请求失败：${response.status}`);
        }

        const data: Download[] = await response.json();
        if (isMounted) {
          setMaterials(data);
        }
      } catch (fetchError) {
        if (!isMounted || controller.signal.aborted) {
          return;
        }
        console.error("Failed to load downloads", fetchError);
        setError("培训资料加载失败，请稍后再试。");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadDownloads();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const categories = useMemo(() => {
    const unique = new Set<string>([ALL_CATEGORY_LABEL]);
    materials.forEach((material) => {
      if (material.category_display) {
        unique.add(material.category_display);
      }
    });
    return Array.from(unique);
  }, [materials]);

  const filteredMaterials = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return materials.filter((material) => {
      if (!material.is_active) {
        return false;
      }

      const displayCategory = material.category_display || material.category;
      const matchesCategory =
        selectedCategory === ALL_CATEGORY_LABEL || displayCategory === selectedCategory;

      if (!normalizedSearch) {
        return matchesCategory;
      }

      const haystack = [material.title, material.description ?? "", displayCategory]
        .join("||")
        .toLowerCase();

      return matchesCategory && haystack.includes(normalizedSearch);
    });
  }, [materials, searchTerm, selectedCategory]);

  const handleDownload = async (material: Download): Promise<void> => {
    try {
      const response = await fetch(`/api/v1/downloads/${material.id}/download_file/`);

      if (!response.ok) {
        throw new Error(`下载失败：${response.status}`);
      }

      const blob = await response.blob();
      const filename = parseFilenameFromHeader(
        response.headers.get("Content-Disposition"),
        material.file_name || `${material.title}.dat`,
      );

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      setMaterials((prev) =>
        prev.map((item) =>
          item.id === material.id
            ? { ...item, download_count: item.download_count + 1 }
            : item,
        ),
      );
    } catch (downloadError) {
      console.error("Download failed", downloadError);
      alert("下载失败，请稍后再试。");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">在线培训资料</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              获取全面的产品培训资料，提升您的专业技能和平台使用效率
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="搜索培训资料..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              培训资料 ({filteredMaterials.length})
            </h2>
            {searchTerm && (
              <p className="text-gray-600 mt-2">搜索 "{searchTerm}" 的结果</p>
            )}
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-500">正在加载培训资料...</div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">{error}</div>
          ) : filteredMaterials.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">未找到相关资料</h3>
              <p className="text-gray-600">请尝试调整搜索关键词或选择其他分类</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMaterials.map((material) => (
                <div key={material.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{material.title}</h3>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <span className="bg-gray-100 px-2 py-1 rounded text-xs mr-2">
                              {getFileType(material.file_name)}
                            </span>
                            <span>{material.file_size_display || "未知"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{material.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                        {material.category_display || material.category}
                      </span>
                      <div className="mt-1">更新：{formatDate(material.updated_at || material.created_at)}</div>
                      <div className="mt-1 text-xs">下载次数：{material.download_count}</div>
                    </div>
                    <button
                      onClick={() => handleDownload(material)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      下载
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
