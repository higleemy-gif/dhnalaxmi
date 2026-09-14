$ErrorActionPreference = 'Continue'

$r = Invoke-WebRequest -Uri "http://localhost:3000/?nocache=$(Get-Random)" -UseBasicParsing -TimeoutSec 60
$c = $r.Content

$headingIdx = $c.IndexOf('Available Properties')
$searchIdx  = $c.IndexOf('Search by property name')
$gridIdx    = $c.IndexOf('pdps-card') # not present anymore - use PropertyCard marker
if ($gridIdx -lt 0) { $gridIdx = $c.IndexOf('View Details') }

Write-Output ("status: {0}  bytes: {1}" -f $r.StatusCode, $c.Length)
Write-Output ("heading 'Available Properties' index: {0}" -f $headingIdx)
Write-Output ("search input index:                   {0}" -f $searchIdx)
Write-Output ("first property card ('View Details'): {0}" -f $gridIdx)

if ($headingIdx -lt $searchIdx -and $searchIdx -lt $gridIdx) {
  Write-Output "ORDER OK: heading -> search -> grid"
} else {
  Write-Output "ORDER WRONG"
}
