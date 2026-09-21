$ErrorActionPreference = 'Stop'
$portfolioWebsite = Join-Path $PSScriptRoot 'website'
$portfolioNodeBin = Join-Path $PSScriptRoot '.tools\node_modules\node\bin'
if (-not (Test-Path -LiteralPath (Join-Path $portfolioNodeBin 'node.exe'))) {
    throw 'The project-local Node runtime is missing. Install Node.js 22.13 or later before starting this project.'
}
$env:PATH = $portfolioNodeBin + ';' + $env:PATH
Push-Location -LiteralPath $portfolioWebsite
try {
    Write-Host 'Portfolio preview: http://127.0.0.1:3000/'
    npm.cmd run dev -- --host 127.0.0.1 --port 3000
} finally {
    Pop-Location
}
