# How to Update Deals on HomeLabDeals

## Where to Edit

All drive data is stored in ONE file:
**`_data/drives.yml`**

This file contains ALL drives (HDDs and SSDs) with their prices, links, and details.

## File Structure

```yaml
hdd:  # Hard Drives section
  - name: "Drive Name"
    capacity: "4TB"
    form_factor: "3.5"
    interface: "SATA III"
    rpm: "5400 RPM"
    price: 89.99                    # Amazon price
    price_per_gb: "0.022"           # Auto-calculated: price / capacity in GB
    note: "Description of the drive"
    link: "https://www.amazon.com/...?tag=homelabdeals-20"  # Amazon link
    featured: true                  # OPTIONAL: marks as "Best Value"
    hot: true                       # OPTIONAL: marks as "Hot Deal"
    ebay_link: "https://www.ebay.com/..."  # OPTIONAL: eBay link
    ebay_price: 72.99               # OPTIONAL: eBay price
    ebay_condition: "Renewed"       # OPTIONAL: Used/Renewed/Open Box

ssd:  # Solid State Drives section
  - name: "SSD Name"
    capacity: "1TB"
    form_factor: "2.5"              # or "M.2"
    interface: "SATA III"           # or "PCIe 3.0", "PCIe 4.0"
    type: "SATA SSD"                # or "NVMe"
    price: 69.99
    price_per_gb: "0.070"
    note: "Description"
    link: "https://www.amazon.com/...?tag=homelabdeals-20"
    # ... same optional fields as HDD
```

## How to Add a New Drive

1. Open `_data/drives.yml`
2. Decide if it's an HDD or SSD
3. Copy an existing entry as a template
4. Update ALL fields with new drive info
5. Calculate price_per_gb: `price / (capacity in GB)`
   - For TB: multiply by 1000 first
   - Example: $89.99 / 4000GB = 0.022
6. Add your Amazon affiliate tag: `?tag=homelabdeals-20`
7. For eBay: add your campaign ID: `?campid=5339143637&toolid=20001`

## How to Update Prices

1. Find the drive in `_data/drives.yml`
2. Change the `price:` value
3. Recalculate `price_per_gb:`
4. Update `ebay_price:` if applicable
5. Commit and push changes

## Example: Adding a New Drive

```yaml
  - name: "Seagate IronWolf 4TB"
    capacity: "4TB"
    form_factor: "3.5"
    interface: "SATA III"
    rpm: "5400 RPM"
    price: 89.99
    price_per_gb: "0.022"        # 89.99 / 4000 = 0.022
    note: "Great NAS drive for home servers"
    link: "https://www.amazon.com/dp/B07H289S7C?tag=homelabdeals-20"
    featured: true               # This will show "Best Value" badge
    ebay_link: "https://www.ebay.com/itm/123456789"
    ebay_price: 69.99
    ebay_condition: "Renewed"
```

## How to Get Affiliate Links

### Amazon Associates
1. Go to Amazon.com
2. Find the product
3. Use SiteStripe (toolbar at top) → Click "Text"
4. Copy the link
5. Make sure it includes: `?tag=homelabdeals-20`

### eBay Partner Network
1. Find product on eBay
2. Copy the item URL
3. Format: `https://www.ebay.com/itm/ITEM-ID?campid=5339143637&toolid=20001`
4. Replace ITEM-ID with the actual eBay item number

## Pushing Changes

After editing `_data/drives.yml`:

```bash
cd /root/.openclaw/workspace/homelabdeals-site
git add _data/drives.yml
git commit -m "Update drive prices - [date]"
git push origin main
```

Wait 1-2 minutes for GitHub Pages to rebuild.

## Important Tips

1. **Always use quotes around price_per_gb** to preserve leading zeros
2. **Keep Amazon tag consistent**: `?tag=homelabdeals-20`
3. **Keep eBay campaign ID consistent**: `?campid=5339143637&toolid=20001`
4. **Be accurate with price_per_gb** - it's shown to users
5. **Use proper capacity format**: "500GB", "1TB", "2TB", etc.
6. **Test links** after adding new drives

## Where Files Are Located

Your site has two repos:

### Public Site (What visitors see)
- Repo: `HLDeals/homelabdeals-site`
- URL: https://hldeals.github.io/homelabdeals-site
- Location: `/root/.openclaw/workspace/homelabdeals-site/`

### Private Source (Your working copy)
- Repo: `m18241/techdeals` (private)
- Location: `/root/.openclaw/workspace/techdeals/`

**Always edit in the public site folder** (`homelabdeals-site`), then sync to private if needed.

## Need Help?

If you mess up the YAML file:
- YAML is picky about indentation (use 2 spaces)
- Make sure every `:` is followed by a space
- Don't use tabs, only spaces
- Every line must start with proper spacing
