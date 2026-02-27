# HomeLabDeals

Curated storage deals for homelabs and data hoarders.

## Setup

1. Install dependencies:
   ```bash
   bundle install
   ```

2. Run locally:
   ```bash
   bundle exec jekyll serve
   ```

3. Visit `http://localhost:4000`

## Deploy to GitHub Pages

1. Push this repo to GitHub
2. Go to Settings → Pages → Source → Deploy from branch
3. Select `main` branch and `/ (root)` or `/docs` folder
4. Update `_config.yml` with your actual URL and baseurl

## Adding Drives

Edit `_data/drives.yml` — new entries automatically appear on the site.

### Drive fields:
- `name`: Product name
- `capacity`: Human-readable (e.g., "4TB")
- `form_factor`: "3.5" or "2.5" or "M.2"
- `interface`: "SATA III", "PCIe 3.0", "PCIe 4.0", etc.
- `rpm`: For HDDs (e.g., "5400 RPM", "7200 RPM")
- `type`: For SSDs (e.g., "SATA SSD", "NVMe")
- `price`: Number (no $ sign)
- `price_per_gb`: String for display (e.g., "0.022")
- `note`: Brief recommendation/explanation
- `link`: Your affiliate link

## TODO

- [ ] Update affiliate tag in drive links
- [ ] Set proper URL in `_config.yml`
- [ ] Add real current prices
- [ ] Consider auto-price-fetching script
