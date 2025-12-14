"use client";

import React, { useState } from 'react';
import { Heart, User, ShoppingBag, Menu, Search, ChevronLeft, ChevronRight } from "lucide-react";

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const products = [
    { image: "/m2.jpg", colors: ["/api/placeholder/40/40", "/api/placeholder/40/40", "/api/placeholder/40/40"], moreColors: 1 },
    { image: "/v2.jpg", colors: ["/api/placeholder/40/40", "/api/placeholder/40/40", "/api/placeholder/40/40"], moreColors: 5 },
    { image: "/c1.jpg", colors: ["/api/placeholder/40/40", "/api/placeholder/40/40", "/api/placeholder/40/40"], moreColors: 1 },
    { image: "/v3.jpg", colors: ["/api/placeholder/40/40", "/api/placeholder/40/40", "/api/placeholder/40/40"], moreColors: 5 },
    { image: "/l2.jpg", colors: ["/api/placeholder/40/40", "/api/placeholder/40/40", "/api/placeholder/40/40"], moreColors: 2 },
    { image: "/s2.jpg", colors: ["/api/placeholder/40/40", "/api/placeholder/40/40", "/api/placeholder/40/40"], moreColors: 3 }
  ];

  const getVisibleProducts = () => {
    if (typeof window === 'undefined') return 4;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 4;
  };

  const [visibleCount, setVisibleCount] = useState(getVisibleProducts());

  React.useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleProducts());
      setCurrentIndex(0);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, products.length - visibleCount);

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
    setIsAutoPlaying(false);
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
    setIsAutoPlaying(false);
  };

  // Défilement automatique
  React.useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        // Si on arrive à la fin, retourner au début
        if (prev >= maxIndex) {
          return 0;
        }
        return prev + 1;
      });
    }, 3000); // Change toutes les 3 secondes

    return () => clearInterval(interval);
  }, [maxIndex, isAutoPlaying]);

  return (
        <div className="min-h-screen bg-white">
      {/* Barre d'annonce */}
      <div className="bg-black text-white text-center py-2 px-4 text-xs sm:text-sm">
        VENTE DE VETEMENTS, SOULIERS ET AUTRES ACCESSOIRES HOMME EN GROS ET DETAIL
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Menu burger & Search */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <div className="hidden md:flex items-center border-b border-gray-300 pb-1">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="SEARCH"
                  className="ml-2 outline-none text-sm bg-transparent w-32 lg:w-auto"
                />
              </div>
            </div>

            {/* Logo */}
            <div className="text-center">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-serif tracking-wider">BS FASHION</h1>
              <p className="text-[10px] sm:text-xs tracking-widest">le meilleur de la ville</p>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-1 sm:gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <User className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          {/* Search mobile */}
          <div className="md:hidden pb-4">
            <div className="flex items-center border-b border-gray-300 pb-1">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="SEARCH"
                className="ml-2 w-full outline-none text-sm bg-transparent"
              />
            </div>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section
        className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[85vh] overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: "url('/homebs.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 drop-shadow-lg">
            Notre Collection
          </h2>
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 drop-shadow-md max-w-2xl px-4">
            Découvrez nos vêtements pour homme et autres accessoires pour vous rendre beau et élégant.
          </p>
          <button className="bg-white text-black px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base">
            DÉCOUVRIR
          </button>
        </div>
      </section>

      {/* Section By Category */}
      <section className="bg-gray-50 py-12 sm:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif mb-8 sm:mb-12 text-left">Par catégorie</h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { title: "Vestes", image: "/v1.jpg" },
              { title: "Sandales", image: "/l1.jpg" },
              { title: "Chaussures", image: "/s1.jpg" },
              { title: "Super-Wax", image: "/b1.jpg" }
            ].map((category, i) => (
              <div 
                key={i} 
                className="relative h-64 sm:h-80 md:h-96 lg:h-[450px] overflow-hidden group cursor-pointer rounded-lg"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('${category.image}')`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                </div>
                
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-10">
                  <h3 className="text-white text-base sm:text-xl lg:text-2xl font-semibold border-b-2 border-white pb-1 inline-block">
                    {category.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section New in - Carrousel */}
      <section className="bg-white py-12 sm:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif">Nouveau dans la boutique</h2>
            <button className="bg-black text-white px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold hover:bg-gray-800 transition-colors whitespace-nowrap">
              VOIR TOUT
            </button>
          </div>

          <div className="relative">
            {/* Bouton précédent - caché sur mobile */}
            <button 
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 lg:-translate-x-4 z-10 bg-white shadow-lg rounded-full p-2 sm:p-3 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Produit précédent"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Bouton suivant - caché sur mobile */}
            <button 
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 lg:translate-x-4 z-10 bg-white shadow-lg rounded-full p-2 sm:p-3 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Produit suivant"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Bouton Play/Pause */}
            <button 
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="absolute top-0 right-0 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition-all"
              aria-label={isAutoPlaying ? "Pause" : "Play"}
              title={isAutoPlaying ? "Mettre en pause" : "Lecture automatique"}
            >
              {isAutoPlaying ? (
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
              ) : (
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>

            {/* Carrousel de produits */}
            <div 
              className="overflow-hidden"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <div 
                className="flex transition-transform duration-500 ease-in-out gap-4 sm:gap-6"
                style={{ 
                  transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` 
                }}
              >
                {products.map((product, i) => (
                  <div 
                    key={i} 
                    className="group cursor-pointer flex-shrink-0"
                    style={{ width: `calc(${100 / visibleCount}% - ${(visibleCount - 1) * (visibleCount === 1 ? 16 : 24) / visibleCount}px)` }}
                  >
                    <div className="relative aspect-square overflow-hidden mb-3 sm:mb-4 bg-gray-100 rounded-lg">
                      <img 
                        src={product.image}
                        alt={`Produit ${i + 1}`}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-white px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold shadow-sm">
                        NOUVEAU
                      </div>
                      
                      <button className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-white p-1.5 sm:p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                        <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                      {product.colors.map((color, j) => (
                        <div 
                          key={j}
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded border-2 border-gray-200 hover:border-black cursor-pointer transition-colors overflow-hidden flex-shrink-0"
                        >
                          <img 
                            src={color}
                            alt={`Couleur ${j + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      {product.moreColors > 0 && (
                        <span className="text-xs sm:text-sm text-gray-600">+{product.moreColors}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Indicateurs de pagination */}
            <div className="flex justify-center gap-2 mt-6 sm:mt-8">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentIndex(i);
                    setIsAutoPlaying(false);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    i === currentIndex ? 'bg-black w-6 sm:w-8' : 'bg-gray-300 w-2'
                  }`}
                  aria-label={`Aller à la page ${i + 1}`}
                />
              ))}
            </div>

            {/* Boutons mobile - en bas */}
            <div className="flex sm:hidden justify-center gap-4 mt-6">
              <button 
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Produit précédent"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                className="bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Produit suivant"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white">
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
              
              {/* Colonne 1 */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 tracking-wider">VENIR AU MAGASIN</h3>
                <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                  <p className="font-medium">BS FASHION localisation</p>
                  <p className="flex items-center gap-2">
                    Goma, DRC
                    <span className="inline-block">→</span>
                  </p>
                  <p>Du lundi au samedi de 8h à 18h</p>
                  <p>Rond point birere, Galerie Kase, Boutique BS FASHION</p>
                </div>
                
                <div className="mt-6 sm:mt-8 space-y-3">
                 <a
  href="https://wa.me/+243 978 246 913"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2 text-xs sm:text-sm hover:text-gray-300 transition-colors"
>
  Contactez-nous
  <span className="inline-block">→</span>
</a>

                </div>
              </div>

              {/* Colonne 2 */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 tracking-wider">ACCÈS DIRECT</h3>
                <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm mb-6 sm:mb-8">
                  <li><a href="#" className="hover:text-gray-300 transition-colors">Nouveautés</a></li>
                  <li><a href="#" className="hover:text-gray-300 transition-colors">Vêtements</a></li>
                  <li><a href="#" className="hover:text-gray-300 transition-colors">Chaussures</a></li>
                  <li><a href="#" className="hover:text-gray-300 transition-colors">Accessoires</a></li>  
                  <li><a href="#" className="hover:text-gray-300 transition-colors">La Carte BSFASHION</a></li>
                 
                </ul>

                <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 tracking-wider">À PROPOS</h3>
                <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                  <li><a href="#" className="hover:text-gray-300 transition-colors">Nos engagements</a></li>
                  <li><a href="#" className="hover:text-gray-300 transition-colors">Nos événements</a></li>
                  <li><a href="#" className="hover:text-gray-300 transition-colors">Accessibilité en magasin</a></li>
                </ul>
              </div>

              {/* Colonne 3 */}
              <div className="sm:col-span-2 lg:col-span-1">
                <div className="mb-6 sm:mb-8">
                  <input
                    type="email"
                    placeholder="M'inscrire à la newsletter"
                    className="w-full bg-transparent border-b border-white pb-2 outline-none text-xs sm:text-sm placeholder-gray-400 focus:border-gray-300 transition-colors"
                  />
                  <button className="mt-4 text-xs sm:text-sm hover:text-gray-300 transition-colors">OK</button>
                </div>

                <div className="flex gap-4 mb-6 sm:mb-8">
                  <a href="#" className="hover:text-gray-300 transition-colors">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                  </a>
                  <a href="#" className="hover:text-gray-300 transition-colors">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
                  </a>
                  <a href="#" className="hover:text-gray-300 transition-colors">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  <a href="#" className="hover:text-gray-300 transition-colors">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bas du footer */}
          <div className="border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-gray-400">
                <a href="#" className="hover:text-white transition-colors">BSFASHION</a>
                <span className="hidden sm:inline">•</span>
                <a href="#" className="hover:text-white transition-colors">Listes d'exception</a>
                <span className="hidden sm:inline">•</span>
                <a href="#" className="hover:text-white transition-colors">Règlement du magasin</a>
                <span className="hidden sm:inline">•</span>
                
                <span className="hidden sm:inline">•</span>
                <a href="#" className="hover:text-white transition-colors">Charte de protection</a>
                <span className="hidden sm:inline">•</span>
                <a href="#" className="hover:text-white transition-colors">Accessibilité</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bouton scroll to top */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 bg-white text-black p-2 sm:p-3 shadow-lg hover:bg-gray-100 transition-colors border border-black rounded-lg"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </footer>
    </div>
  );
}