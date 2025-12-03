import { motion } from 'framer-motion';
import type { Product } from '../store/apiSlice';
import { ShoppingCart, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  product: Product;
  index: number;
}

export const ProductCard = ({ product, index }: Props) => {
  // Parse price safely (API returns string)
  const price = parseFloat(product.price).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative flex flex-col h-full bg-nexus-panel border border-nexus-border hover:border-nexus-accent transition-colors duration-300"
    >
      <Link to={`/product/${product.id}`} className="block h-full">
        {/* Image Area */}
        <div className="relative h-64 w-full bg-[#0a0a0a] p-6 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <img 
              src={product.image} 
              alt={product.name} 
              className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out z-10" 
              loading="lazy"
          />
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3 z-20">
            <span className="text-[10px] font-mono text-nexus-dark bg-nexus-accent px-2 py-0.5 uppercase font-bold">
                {product.category || 'N/A'}
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-5 flex flex-col flex-grow border-t border-nexus-border">
          <h3 className="text-gray-100 font-display text-lg leading-tight line-clamp-2 mb-2 group-hover:text-nexus-accent transition-colors">
              {product.name}
          </h3>

          <p className="text-nexus-muted text-xs line-clamp-2 mb-4 font-mono leading-relaxed flex-grow">
              {product.description}
          </p>

          <div className="flex items-end justify-between mt-auto pt-4 border-t border-white/5">
              <div className="flex flex-col">
                  <span className="text-[10px] text-nexus-muted uppercase tracking-wider">Price</span>
                  <span className="font-mono text-xl text-white">
                      ${price}
                  </span>
              </div>
              
              {/* Seller Info */}
              {product.seller && (
                  <div className="flex items-center gap-2 text-xs text-nexus-muted font-mono bg-white/5 px-2 py-1 rounded">
                       <User size={12} />
                       {product.seller.username}
                  </div>
              )}
          </div>
        </div>
      </Link>
      
      {/* Quick Add Button (Visual Only for now) */}
      <button title='button' className="absolute bottom-[4.5rem] right-4 z-30 bg-nexus-accent text-nexus-dark p-3 rounded-full translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:bg-white">
        <ShoppingCart size={18} />
      </button>
    </motion.div>
  );
};
