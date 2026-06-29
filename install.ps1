# motion-ui - Windows installer for Claude Code
# One-liner:
#   irm https://raw.githubusercontent.com/IPedrax/motion-ui/main/install.ps1 | iex

$ErrorActionPreference = 'Stop'
$ProgressPreference   = 'SilentlyContinue'

$repo   = 'IPedrax/motion-ui'
$skills = Join-Path $env:USERPROFILE '.claude\skills'
$dest   = Join-Path $skills 'motion-ui'

Write-Host "Installing the motion-ui skill -> $dest" -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path $skills | Out-Null

$tmp = Join-Path $env:TEMP ("motion-ui-" + [guid]::NewGuid().ToString('N') + ".zip")
$url = "https://raw.githubusercontent.com/$repo/main/motion-ui.skill"

try {
    Invoke-WebRequest -Uri $url -OutFile $tmp
    if (Test-Path $dest) { Remove-Item $dest -Recurse -Force }
    Expand-Archive -Path $tmp -DestinationPath $skills -Force
}
finally {
    if (Test-Path $tmp) { Remove-Item $tmp -Force }
}

if (Test-Path (Join-Path $dest 'SKILL.md')) {
    Write-Host ""
    Write-Host "[OK] motion-ui installed to $dest" -ForegroundColor Green
    Write-Host "Restart Claude Code, then try:  add animations to this page"
    Write-Host "Optional - connect 21st.dev Magic MCP for live components:"
    Write-Host "  claude mcp add magic --scope user -- npx -y @21st-dev/magic@latest API_KEY=YOUR_KEY"
} else {
    Write-Host ""
    Write-Host "[!] Install failed - SKILL.md not found under $dest" -ForegroundColor Red
    exit 1
}
