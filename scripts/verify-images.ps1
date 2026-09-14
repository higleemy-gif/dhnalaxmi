$ErrorActionPreference = 'Continue'

$slugs = @(
  '3bhk-house-in-ashok-nagar',
  'residential-plot-in-ashok-nagar-3',
  'vishal-mart-back-side',
  'residential-plot-in-ashok-nagar-3rd-lane-opp',
  'residential-plot-in-indira-nagar',
  'residential-house-in-ashok-nagar',
  'residential-plot-in-ashok-nagar'
)

Write-Output "--- Property image endpoints ---"
foreach ($s in $slugs) {
  $url = "http://localhost:3000/property-photos/$s.png"
  try {
    $r = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 30
    Write-Output ("{0,-46} {1} {2} bytes" -f "$s.png", $r.StatusCode, $r.RawContentLength)
  } catch {
    Write-Output ("{0,-46} ERR {1}" -f "$s.png", $_.Exception.Message)
  }
}

Write-Output ""
Write-Output "--- Homepage / detail pages reference the local paths ---"
$r = Invoke-WebRequest -Uri 'http://localhost:3000/' -UseBasicParsing -TimeoutSec 60
$c = $r.Content
Write-Output ("HOME:  status={0}  bytes={1}" -f $r.StatusCode, $c.Length)
Write-Output ("  '/property-photos/' img hits: {0}" -f ([regex]::Matches($c,'/property-photos/[a-z0-9\-]+\.png').Count))
Write-Output ("  hotlinked WP host hits:       {0}" -f ([regex]::Matches($c,'dhanalaxmiconstruction\.in/wp-content').Count))

$r = Invoke-WebRequest -Uri 'http://localhost:3000/properties' -UseBasicParsing -TimeoutSec 60
$c = $r.Content
Write-Output ("LIST:  status={0}  bytes={1}" -f $r.StatusCode, $c.Length)
Write-Output ("  '/property-photos/' img hits: {0}" -f ([regex]::Matches($c,'/property-photos/[a-z0-9\-]+\.png').Count))
Write-Output ("  hotlinked WP host hits:       {0}" -f ([regex]::Matches($c,'dhanalaxmiconstruction\.in/wp-content').Count))

$r = Invoke-WebRequest -Uri 'http://localhost:3000/properties/vishal-mart-back-side' -UseBasicParsing -TimeoutSec 60
$c = $r.Content
Write-Output ("DETAIL(vishal-mart):  status={0}  bytes={1}" -f $r.StatusCode, $c.Length)
Write-Output ("  '/property-photos/' img hits: {0}" -f ([regex]::Matches($c,'/property-photos/[a-z0-9\-]+\.png').Count))
Write-Output ("  hotlinked WP host hits:       {0}" -f ([regex]::Matches($c,'dhanalaxmiconstruction\.in/wp-content').Count))
