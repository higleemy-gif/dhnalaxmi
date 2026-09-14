$ErrorActionPreference = 'Continue'

try {
  $r = Invoke-WebRequest -Uri 'http://localhost:3000/banner-bg.png' -UseBasicParsing -TimeoutSec 30
  Write-Output ("banner-bg.png            {0} {1} bytes {2}" -f $r.StatusCode, $r.RawContentLength, $r.Headers.'Content-Type')
} catch {
  Write-Output ("banner-bg.png            ERR {0}" -f $_.Exception.Message)
}

$r = Invoke-WebRequest -Uri 'http://localhost:3000/' -UseBasicParsing -TimeoutSec 60
$c = $r.Content
Write-Output ("HOME:  status={0}  bytes={1}" -f $r.StatusCode, $c.Length)
Write-Output ("  'banner-bg' hits:           {0}" -f ([regex]::Matches($c,'banner-bg').Count))
Write-Output ("  'Stat(' func removed:       {0}" -f (-not $c.Contains('function Stat')))
Write-Output ("  '_next/image' hits:         {0}" -f ([regex]::Matches($c,'_next/image').Count))
Write-Output ("  right-side plaque (Stat):   {0}" -f ([regex]::Matches($c,'font-serif text-lg font-bold text-gold').Count))
