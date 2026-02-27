document.addEventListener('DOMContentLoaded', function() {
  // Get all drive cards from both sections
  const hddGrid = document.getElementById('hdd-grid');
  const ssdGrid = document.getElementById('ssd-grid');
  
  if (!hddGrid || !ssdGrid) return;
  
  const hddCards = Array.from(hddGrid.querySelectorAll('.drive-card'));
  const ssdCards = Array.from(ssdGrid.querySelectorAll('.drive-card'));
  
  // Track sort direction for each section
  const sortState = {
    hdd: { sort: 'default', direction: 'asc' },
    ssd: { sort: 'default', direction: 'asc' }
  };
  
  // Add sorting controls to each section
  addSortingControls('hdd-section', hddGrid, hddCards, 'hdd');
  addSortingControls('ssd-section', ssdGrid, ssdCards, 'ssd');
  
  function addSortingControls(sectionId, grid, cards, sectionKey) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'sort-controls';
    controlsDiv.innerHTML = `
      <span class="sort-label">Sort by:</span>
      <button class="sort-btn active" data-sort="default" data-section="${sectionKey}">Featured</button>
      <button class="sort-btn" data-sort="price" data-section="${sectionKey}">Price: Low to High</button>
      <button class="sort-btn" data-sort="price-desc" data-section="${sectionKey}">Price: High to Low</button>
      <button class="sort-btn" data-sort="capacity" data-section="${sectionKey}">Capacity</button>
      <button class="sort-btn" data-sort="ppg" data-section="${sectionKey}">Best Value</button>
    `;
    
    const sectionHeader = section.querySelector('.section-header');
    if (sectionHeader) {
      sectionHeader.appendChild(controlsDiv);
    }
    
    // Add event listeners
    controlsDiv.querySelectorAll('.sort-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const sortType = this.dataset.sort;
        const section = this.dataset.section;
        
        // Update active state
        controlsDiv.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Update button text based on current sort
        updateButtonText(controlsDiv, sortType);
        
        sortCards(grid, cards, sortType);
      });
    });
  }
  
  function updateButtonText(controlsDiv, currentSort) {
    const priceBtn = controlsDiv.querySelector('[data-sort="price"]');
    const priceDescBtn = controlsDiv.querySelector('[data-sort="price-desc"]');
    
    if (currentSort === 'price') {
      priceBtn.textContent = 'Price: Low to High ↓';
      priceDescBtn.textContent = 'Price: High to Low';
    } else if (currentSort === 'price-desc') {
      priceBtn.textContent = 'Price: Low to High';
      priceDescBtn.textContent = 'Price: High to Low ↑';
    } else {
      priceBtn.textContent = 'Price: Low to High';
      priceDescBtn.textContent = 'Price: High to Low';
    }
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
          return capB - capA; // Largest first
        });
        break;
        
      case 'ppg':
        sortedCards.sort((a, b) => {
          const ppgA = parseFloat(a.dataset.ppg) || 999;
          const ppgB = parseFloat(b.dataset.ppg) || 999;
          return ppgA - ppgB; // Best value first
        });
        break;
        
      default: // featured
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
      void card.offsetWidth; // Trigger reflow
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
