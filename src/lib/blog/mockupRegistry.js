import registryData from '../../content/blog/mockups/registry.json';

const getPriorityWeight = (priority) => {
  if (priority === 'high' || priority === 1) return 1;
  if (priority === 'medium' || priority === 2) return 2;
  if (priority === 'low' || priority === 3) return 3;
  return 99; // fallback
};

export const getApprovedMockups = (filters = {}) => {
  const assets = registryData.assets || [];
  
  return assets
    .filter(asset => asset.status === 'approved')
    .filter(asset => !filters.language || asset.language === filters.language)
    .filter(asset => {
      if (!filters.cluster) return true;
      if (Array.isArray(asset.cluster)) return asset.cluster.includes(filters.cluster);
      return asset.cluster === filters.cluster;
    })
    .filter(asset => {
      if (!filters.articleType) return true;
      if (Array.isArray(asset.articleTypes)) return asset.articleTypes.includes(filters.articleType);
      return asset.articleTypes === filters.articleType;
    })
    .filter(asset => {
      if (!filters.suitableFor) return true;
      const filterSuitable = Array.isArray(filters.suitableFor) ? filters.suitableFor : [filters.suitableFor];
      const assetSuitable = Array.isArray(asset.suitableFor) ? asset.suitableFor : [asset.suitableFor];
      return filterSuitable.some(s => assetSuitable.includes(s));
    })
    .sort((a, b) => getPriorityWeight(a.priority) - getPriorityWeight(b.priority));
};

export const getMockupsForArticle = (article, options = {}) => {
  const baseFilters = {
    language: article.language,
    suitableFor: options.suitableFor,
  };
  
  let mockups = getApprovedMockups({
    ...baseFilters,
    cluster: article.cluster,
    articleType: article.articleType,
  });
  
  if (mockups.length === 0) {
    mockups = getApprovedMockups({
      ...baseFilters,
      cluster: article.cluster,
    });
  }
  
  if (mockups.length === 0) {
    mockups = getApprovedMockups(baseFilters);
  }
  
  if (options.limit && mockups.length > 0) {
    return mockups.slice(0, options.limit);
  }
  
  return mockups;
};
