document.addEventListener('DOMContentLoaded', function() {
  // Get all drive cards from both sections
  const hddGrid = document.getElementById('hdd-grid');
  const ssdGrid = document.getElementById('ssd-grid');
  
  if (!hddGrid || !ssdGrid) return;
  
  const hddCards = Array.from(hddGrid.querySelectorAll('.drive-card'));
  const ssdCards = Array.from(ssdGrid.querySelectorAll('.drive-card'));
  
  // Add sorting controls to each section
  addSortingControls('hdd-section', hddGrid, hddCards);
  addSortingControls('ssd-section', ssdGrid, ssdCards);
  
  function addSortingControls(sectionId, grid, cards) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'sort-controls';
    controlsDiv.innerHTML = `
      <span class="sort-label">Sort by:</span>
      <button class="sort-btn active" data-sort="default">Featured</button>
      <button class="sort-btn" data-sort="price">Price</button>
      <button class="sort-btn" data-sort="capacity">Capacity</button>
      <button class="sort-btn" data-sort="ppg">Price/GB</button>
    `;
    
    const sectionHeader = section.querySelector('.section-header');
    if (sectionHeader) {
      sectionHeader.appendChild(controlsDiv);
    }
    
    // Add event listeners
    controlsDiv.querySelectorAll('.sort-btn').forEach(btn => {
      btn.addEventListener('click', function() {
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
