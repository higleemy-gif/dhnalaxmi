$ErrorActionPreference = 'Continue'
New-Item -ItemType Directory -Force -Path public\properties | Out-Null

$sources = @(
  @{ slug = '3bhk-house-in-ashok-nagar'; url = 'https://dhanalaxmiconstruction.in/wp-content/uploads/2026/09/Screenshot-2026-09-03-181051-2.png' },
  @{ slug = 'residential-plot-in-ashok-nagar-3'; url = 'https://dhanalaxmiconstruction.in/wp-content/uploads/2026/09/Screenshot-2026-09-05-081526.png' },
  @{ slug = 'vishal-mart-back-side'; url = 'https://dhanalaxmiconstruction.in/wp-content/uploads/2026/09/Screenshot-2026-09-05-081136.png' },
  @{ slug = 'residential-plot-in-ashok-nagar-3rd-lane-opp'; url = 'https://dhanalaxmiconstruction.in/wp-content/uploads/2026/09/Screenshot-2026-09-05-082113.png' },
  @{ slug = 'residential-plot-in-indira-nagar'; url = 'https://dhanalaxmiconstruction.in/wp-content/uploads/2026/09/Screenshot-2026-09-05-082827.png' },
  @{ slug = 'residential-house-in-ashok-nagar'; url = 'https://dhanalaxmiconstruction.in/wp-content/uploads/2026/09/Screenshot-2026-09-05-084704.png' },
  @{ slug = 'residential-plot-in-ashok-nagar'; url = 'https://dhanalaxmiconstruction.in/wp-content/uploads/2026/09/Screenshot-2026-09-05-084044.png' }
)

foreach ($s in $sources) {
  $out = "public\properties\$($s.slug).png"
  try {
    Invoke-WebRequest -Uri $s.url -OutFile $out -UseBasicParsing -TimeoutSec 60
    $size = (Get-Item $out).Length
    Write-Output "OK  $($s.slug): $size bytes"
  } catch {
    Write-Output "ERR $($s.slug): $($_.Exception.Message)"
  }
}
