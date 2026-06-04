import registryData from '../../content/blog/mockups/registry.json';

const getPriorityWeight = (priority) => {
  if (priority === 'high' || priority === 1) return 1;
  if (priority === 'medium' || priority === 2) return 2;
  if (priority === 'low' || priority === 3) return 3;
  return 99; // fallback
};

const matchesValue = (assetValue, filterValue) => {
  if (!filterValue) return true;
  if (Array.isArray(assetValue)) return assetValue.includes(filterValue);
  return assetValue === filterValue;
};

const getSelectionSteps = (article, options = {}) => {
  const baseFilters = {
    language: article.language,
    suitableFor: options.suitableFor,
  };

  return [
    {
      matchLevel: 'exact',
      filters: {
        ...baseFilters,
        cluster: article.cluster,
        articleType: article.articleType,
      },
    },
    {
      matchLevel: 'clusterFallback',
      filters: {
        ...baseFilters,
        cluster: article.cluster,
      },
    },
    {
      matchLevel: 'articleTypeFallback',
      filters: {
        ...baseFilters,
        articleType: article.articleType,
      },
    },
    {
      matchLevel: 'languageSlotFallback',
      filters: baseFilters,
    },
  ];
};

export const getApprovedMockups = (filters = {}) => {
  const assets = registryData.assets || [];
  
  return assets
    .filter(asset => asset.status === 'approved')
    .filter(asset => !filters.language || asset.language === filters.language)
    .filter(asset => matchesValue(asset.cluster, filters.cluster))
    .filter(asset => matchesValue(asset.articleTypes, filters.articleType))
    .filter(asset => {
      if (!filters.suitableFor) return true;
      const filterSuitable = Array.isArray(filters.suitableFor) ? filters.suitableFor : [filters.suitableFor];
      const assetSuitable = Array.isArray(asset.suitableFor) ? asset.suitableFor : [asset.suitableFor];
      return filterSuitable.some(s => assetSuitable.includes(s));
    })
    .sort((a, b) => getPriorityWeight(a.priority) - getPriorityWeight(b.priority));
};

export const getMockupSelectionForArticle = (article, options = {}) => {
  for (const step of getSelectionSteps(article, options)) {
    const mockups = getApprovedMockups(step.filters);
    if (mockups.length > 0) {
      return {
        mockups: options.limit ? mockups.slice(0, options.limit) : mockups,
        matchLevel: step.matchLevel,
        filters: step.filters,
      };
    }
  }

  return {
    mockups: [],
    matchLevel: 'none',
    filters: {
      language: article.language,
      suitableFor: options.suitableFor,
    },
  };
};

export const getMockupsForArticle = (article, options = {}) => {
  return getMockupSelectionForArticle(article, options).mockups;
};
