$ErrorActionPreference = 'Continue'

$phone = '919776213573'
$expectedTel = 'tel:+91'

function Check-Page($url, $label) {
  try {
    $r = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 60
    $c = $r.Content
    $waHits = ([regex]::Matches($c, "wa\.me/$phone")).Count
    $telHits = ([regex]::Matches($c, [regex]::Escape($expectedTel))).Count
    # Grab first WhatsApp link so we can see the pre-filled message
    $m = [regex]::Match($c, "https://wa\.me/$phone\?text=([^`"]+)")
    $sample = if ($m.Success) { [Uri]::UnescapeDataString($m.Groups[1].Value) } else { '(none)' }
    if ($sample.Length -gt 120) { $sample = $sample.Substring(0,120) + '...' }
    Write-Output ""
    Write-Output ("--- {0} ({1}) ---" -f $label, $url)
    Write-Output ("status:              {0}" -f $r.StatusCode)
    Write-Output ("wa.me/{0} hits:      {1}" -f $phone, $waHits)
    Write-Output ("tel:+91 hits:        {0}" -f $telHits)
    Write-Output ("sample WA message:   {0}" -f $sample)
  } catch {
    Write-Output ""
    Write-Output ("--- {0} ({1}) ---" -f $label, $url)
    Write-Output ("ERR: {0}" -f $_.Exception.Message)
  }
}

Check-Page 'http://localhost:3000/' 'Home'
Check-Page 'http://localhost:3000/properties' 'Properties list'
Check-Page 'http://localhost:3000/properties/3bhk-house-in-ashok-nagar' 'Property detail - 3BHK'
Check-Page 'http://localhost:3000/properties/vishal-mart-back-side' 'Property detail - Vishal Mart'
Check-Page 'http://localhost:3000/sell' 'Sell Your Property'
Check-Page 'http://localhost:3000/contact' 'Contact'
Check-Page 'http://localhost:3000/about' 'About'
