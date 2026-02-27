document.addEventListener('DOMContentLoaded', function() {
  // Initialize sorting for all three sections
  initSection('hdd-grid', 'hdd-section');
  initSection('ssd-grid', 'ssd-section');
  initSection('sbc-grid', 'sbc-section');
  
  function initSection(gridId, sectionId) {
    const grid = document.getElementById(gridId);
    const section = document.getElementById(sectionId);
    
    if (!grid || !section) return;
    
    const cards = Array.from(grid.querySelectorAll('.drive-card'));
    
    // Create sort controls
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'sort-controls';
    controlsDiv.innerHTML = `
      <span class="sort-label">Sort by:</span>
      <button class="sort-btn active" data-sort="default">Featured</button>
      <button class="sort-btn" data-sort="price">Price: Low to High</button>
      <button class="sort-btn" data-sort="price-desc">Price: High to Low</button>
      <button class="sort-btn" data-sort="capacity">Capacity</button>
      <button class="sort-btn" data-sort="ppg">Best Value</button>
    `;
    
    const sectionHeader = section.querySelector('.section-header');
    if (sectionHeader) {
      sectionHeader.appendChild(controlsDiv);
    }
    
    // Add event listeners
    controlsDiv.querySelectorAll('.sort-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        // Update active state
        controlsDiv.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const sortType = this.dataset.sort;
        sortCards(grid, cards, sortType);
      });
    });
  }
  
  function sortCards(grid, cards, sortType) {
    const sortedCards = [...cards];
    
    switch(sortType) {
      case 'price':
        sortedCards.sort((a, b) => {
          const priceA = parseFloat(a.dataset.price) || 0;
          const priceB = parseFloat(b.dataset.price) || 0;
          return priceA - priceB;
        });
        break;
        
      case 'price-desc':
        sortedCards.sort((a, b) => {
          const priceA = parseFloat(a.dataset.price) || 0;
          const priceB = parseFloat(b.dataset.price) || 0;
          return priceB - priceA;
        });
        break;
        
      case 'capacity':
        sortedCards.sort((a, b) => {
          const capA = parseCapacity(a.dataset.capacity);
          const capB = parseCapacity(b.dataset.capacity);
          return capB - capA;
        });
        break;
        
      case 'ppg':
        sortedCards.sort((a, b) => {
          const ppgA = parseFloat(a.dataset.ppg) || 999;
          const ppgB = parseFloat(b.dataset.ppg) || 999;
          return ppgA - ppgB;
        });
        break;
        
      default:
        sortedCards.sort((a, b) => {
          const featA = a.dataset.featured === 'true' ? 1 : 0;
          const featB = b.dataset.featured === 'true' ? 1 : 0;
          return featB - featA;
        });
        break;
    }
    
    // Re-append in sorted order
    sortedCards.forEach(card => grid.appendChild(card));
    
    // Animate
    sortedCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.05}s`;
      card.classList.remove('fade-in');
      void card.offsetWidth;
      card.classList.add('fade-in');
    });
  }
  
  function parseCapacity(capStr) {
    if (!capStr) return 0;
    const match = capStr.match(/(\d+)/);
    if (!match) return 0;
    let val = parseInt(match[1]);
    if (capStr.includes('TB')) val *= 1000;
    return val;
  }
});
