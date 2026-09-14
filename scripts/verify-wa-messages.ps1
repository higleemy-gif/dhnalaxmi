$ErrorActionPreference = 'Continue'
$phone = '919776213573'

function Show-Messages($url, $label) {
  $r = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 60
  $c = $r.Content
  $matches = [regex]::Matches($c, "https://wa\.me/$phone\?text=([^`"']+)")
  Write-Output ""
  Write-Output ("=== " + $label + " - " + $matches.Count + " total, unique messages: ===")
  $seen = @{}
  foreach ($m in $matches) {
    $decoded = [Uri]::UnescapeDataString($m.Groups[1].Value)
    if (-not $seen.ContainsKey($decoded)) {
      $seen[$decoded] = $true
      Write-Output ("  * " + $decoded)
    }
  }
}

Show-Messages 'http://localhost:3000/properties' 'Properties list'
Show-Messages 'http://localhost:3000/properties/3bhk-house-in-ashok-nagar' 'Property detail - 3BHK'
Show-Messages 'http://localhost:3000/properties/vishal-mart-back-side' 'Property detail - Vishal Mart'
Show-Messages 'http://localhost:3000/sell' 'Sell page'
