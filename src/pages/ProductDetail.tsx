import { useParams, useNavigate } from 'react-router-dom';
import { useGetProductByIdQuery } from '../store/apiSlice';
import { ArrowLeft, ShoppingBag, ShieldCheck, Zap, User } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Fetch specific product using the ID from the URL
  const { data: product, isLoading, error } = useGetProductByIdQuery(id || '');

  if (isLoading) return (
    <div className="h-screen bg-nexus-dark text-nexus-accent flex items-center justify-center font-mono animate-pulse">
        ACCESSING DATABASE...
    </div>
  );
  
  if (error || !product) return (
    <div className="h-screen bg-nexus-dark text-red-500 flex flex-col items-center justify-center font-mono gap-4">
        <div>DATA CORRUPTION DETECTED.</div>
        <button onClick={() => navigate('/')} className="underline">RETURN TO GRID</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-nexus-dark text-gray-100 font-sans selection:bg-nexus-accent selection:text-nexus-dark">
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

      {/* Nav Back */}
      <nav className="p-6 md:p-8 sticky top-0 z-50 bg-nexus-dark/80 backdrop-blur">
        <button 
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-nexus-muted hover:text-nexus-accent transition-colors font-mono text-xs uppercase tracking-widest"
        >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Inventory
        </button>
      </nav>

      <main className="max-w-7xl mx-auto p-6 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start relative z-10">
        
        {/* Left: Image Section */}
        <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-nexus-panel border border-nexus-border p-8 md:p-16 relative flex items-center justify-center overflow-hidden group"
        >
            {/* Decorative ID Tag */}
            <div className="absolute top-4 left-4 font-mono text-[10px] text-nexus-accent border border-nexus-accent px-2 py-1 opacity-50">
                UUID: {product.id.slice(0, 8)}...
            </div>
            
            <img 
                src={product.image} 
                alt={product.name} 
                className="w-full max-h-[500px] object-contain drop-shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700"
            />
        </motion.div>

        {/* Right: Details Section */}
        <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
        >
            <div>
                <div className="flex items-center gap-4 mb-4">
                    <span className="text-xs font-mono bg-nexus-accent/10 text-nexus-accent border border-nexus-accent/20 px-3 py-1 uppercase tracking-wider">
                        {product.category || 'Standard Issue'}
                    </span>
                    {product.seller && (
                         <span className="flex items-center gap-2 text-xs font-mono text-nexus-muted uppercase">
                            <User size={12} /> {product.seller.username}
                        </span>
                    )}
                </div>
                
                <h1 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight text-white">
                    {product.name}
                </h1>
                
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-mono text-nexus-accent font-light">
                        ${parseFloat(product.price).toLocaleString()}
                    </span>
                    <span className="text-sm text-nexus-muted font-mono">USD</span>
                </div>
            </div>

            <div className="border-t border-b border-nexus-border py-8 space-y-6">
                <p className="text-gray-400 leading-relaxed font-mono text-sm">
                    {product.description}
                </p>
                
                {/* Value Props */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 text-xs text-gray-300 font-mono bg-nexus-panel p-3 border border-nexus-border">
                        <ShieldCheck size={16} className="text-nexus-accent" /> 
                        SECURE TRANSACTION
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-300 font-mono bg-nexus-panel p-3 border border-nexus-border">
                        <Zap size={16} className="text-nexus-accent" /> 
                        INSTANT DISPATCH
                    </div>
                </div>
            </div>

            {/* CTA Button */}
            <button className="w-full py-5 bg-nexus-accent text-nexus-dark font-bold font-mono text-lg uppercase tracking-[0.2em] hover:bg-white transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:shadow-[0_0_30px_rgba(204,255,0,0.5)]">
                <ShoppingBag size={20} /> 
                Acquire Unit
            </button>
            
            <p className="text-center text-[10px] text-nexus-muted font-mono uppercase">
                Stock Level: High Availability
            </p>
        </motion.div>
      </main>
    </div>
  );
};
