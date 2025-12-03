import  { useState, useMemo } from 'react';
import { useGetProductsQuery } from '../store/apiSlice';
import { ProductCard } from '../components/ProductCard';
import { ArrowUpDown, Loader2, Search } from 'lucide-react';

const Catalog = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error } = useGetProductsQuery(page);
  // Optimized filtering logic for performance
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [search, setSearch] = useState('');

  // 1. Extract Unique Categories Dynamically from loaded data
  const categories = useMemo(() => {
    if (!data?.results) return [];
    const uniqueCats = new Set(data.results.map(p => p.category).filter(Boolean));
    return Array.from(uniqueCats);
  }, [data]);

  // 2. Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    if (!data?.results) return [];
    
    let result = [...data.results];

    // Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }
    
    // Search by Name
    if (search) {
      result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }

    // Sort by Price
    if (sortOrder) {
      result.sort((a, b) => {
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);
        return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
      });
    }

    return result;
  }, [data, selectedCategory, sortOrder, search]);

  const handleLoadMore = () => {
    if (data?.next) setPage(prev => prev + 1);
  };

  if (isLoading && page === 1) return (
    <div className="h-screen w-full flex items-center justify-center bg-nexus-dark text-nexus-accent">
        <Loader2 className="animate-spin w-12 h-12" />
    </div>
  );

  if (error) return (
    <div className="h-screen flex items-center justify-center bg-nexus-dark text-red-500 font-mono">
        API CONNECTION LOST. RETRYING...
    </div>
  );

  return (
    <div className="min-h-screen bg-nexus-dark pb-20">
      {/* Hero / Header */}
      <header className="sticky top-0 z-40 bg-nexus-dark/80 backdrop-blur-md border-b border-nexus-border">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-nexus-accent rounded-full animate-pulse" />
                <h1 className="text-2xl font-display font-bold text-white tracking-tight">
                    NEXUS<span className="text-nexus-muted">CATALOG</span>
                </h1>
            </div>
            
            <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-nexus-muted" size={16} />
                <input 
                    type="text" 
                    placeholder="SEARCH PROTOCOLS..."
                    className="w-full bg-nexus-panel border border-nexus-border pl-10 pr-4 py-2 font-mono text-sm focus:outline-none focus:border-nexus-accent focus:ring-1 focus:ring-nexus-accent transition-all text-white"
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
            <div className="flex flex-wrap gap-2">
                <button 
                    onClick={() => setSelectedCategory('all')}
                    className={`px-4 py-1.5 text-xs font-mono border transition-all uppercase ${selectedCategory === 'all' ? 'bg-nexus-accent text-nexus-dark border-nexus-accent font-bold' : 'border-nexus-border text-nexus-muted hover:border-nexus-accent hover:text-white'}`}
                >
                    ALL
                </button>
                {categories.map(cat => (
                    <button 
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-1.5 text-xs font-mono border uppercase transition-all ${selectedCategory === cat ? 'bg-nexus-accent text-nexus-dark border-nexus-accent font-bold' : 'border-nexus-border text-nexus-muted hover:border-nexus-accent hover:text-white'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <button 
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="flex items-center gap-2 text-xs font-mono text-nexus-accent border border-nexus-border px-4 py-2 hover:bg-nexus-panel transition-colors"
            >
                <ArrowUpDown size={14} />
                PRICE: {sortOrder === 'asc' ? 'LOW_TO_HIGH' : sortOrder === 'desc' ? 'HIGH_TO_LOW' : 'DEFAULT'}
            </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, idx) => (
                <ProductCard key={`${product.id}-${idx}`} product={product} index={idx} />
            ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
            <div className="py-20 text-center text-nexus-muted font-mono">
                NO UNITS FOUND MATCHING CRITERIA.
            </div>
        )}

        {/* Infinite Scroll Trigger */}
        <div className="mt-16 flex justify-center">
            {data?.next ? (
                <button 
                    onClick={handleLoadMore}
                    disabled={isFetching}
                    className="group relative px-8 py-3 bg-transparent border border-nexus-accent text-nexus-accent font-mono text-xs uppercase tracking-widest hover:bg-nexus-accent hover:text-nexus-dark transition-all disabled:opacity-50"
                >
                    {isFetching ? 'LOADING DATA...' : 'LOAD MORE DATA'}
                </button>
            ) : (
                <div className="text-nexus-muted font-mono text-xs tracking-widest uppercase border-t border-nexus-border pt-4">
                    // END OF STREAM
                </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default Catalog;
