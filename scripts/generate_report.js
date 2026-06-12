// scripts/generate_report.js
const fs = require('fs');
const path = require('path');

// Playwright generates a JSON report in "playwright-report" folder when using the "json" reporter.
// We'll parse all *.json files and create a markdown summary.

const REPORT_DIR = path.resolve(__dirname, '..', 'playwright-report');
const OUTPUT_MD = path.resolve(__dirname, '..', 'reports', 'full_report.md');

function loadJsonFiles(dir) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  const results = [];
  for (const file of files) {
    const content = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
    results.push(content);
  }
  return results;
}

function summarize(results) {
  let total = 0, passed = 0, failed = 0, skipped = 0;
  const failures = [];
  for (const suite of results) {
    if (!suite.suites) continue;
    for (const test of suite.suites) {
      total++;
      if (test.status === 'passed') passed++;
      else if (test.status === 'failed') {
        failed++;
        failures.push({
          title: test.title,
          file: test.file,
          line: test.location?.line || 0,
          screenshots: test.attachments?.filter(a => a.name && a.name.toLowerCase().includes('screenshot')).map(a => a.path) || [],
          error: test.error?.message || ''
        });
      } else if (test.status === 'skipped') skipped++;
    }
  }
  return { total, passed, failed, skipped, failures };
}

function generateMarkdown(summary) {
  const { total, passed, failed, skipped, failures } = summary;
  let md = `# Full End‑to‑End Test Report\n\n`;
  md += `**Date:** ${new Date().toLocaleString()}\n\n`;
  md += `| Metric | Count |\n|---|---|\n`;
  md += `| Total Tests | ${total} |\n`;
  md += `| Passed | ${passed} |\n`;
  md += `| Failed | ${failed} |\n`;
  md += `| Skipped | ${skipped} |\n\n`;

  if (failures.length) {
    md += `## Failed Tests (${failed})\n\n`;
    md += `| Test | File | Line | Error | Screenshot |\n`;
    md += `|---|---|---|---|---|\n`;
    for (const f of failures) {
      const screenshotLink = f.screenshots.length ? `[screenshot](${f.screenshots[0]})` : '';
      md += `| ${f.title} | ${path.basename(f.file)} | ${f.line} | ${f.error.replace(/\|/g, '\\|')} | ${screenshotLink} |\n`;
    }
    md += '\n';
  }

  md += `## Recommendations\n`;
  md += `- Review any failed tests and adjust UI or backend logic accordingly.\n`;
  md += `- Ensure all pages contain a `<title>` and `<meta name="description">` tag (checked in the "Public pages sanity" suite).\n`;
  md += `- Verify accessibility attributes (`alt`, `aria-label`) on images and interactive elements.\n`;
  md += `- Confirm Razorpay test keys are not present in production code.\n`;
  return md;
}

function main() {
  if (!fs.existsSync(REPORT_DIR)) {
    console.error('Playwright report folder not found at', REPORT_DIR);
    process.exit(1);
  }
  const results = loadJsonFiles(REPORT_DIR);
  const summary = summarize(results);
  const markdown = generateMarkdown(summary);
  // Ensure output directory exists
  const outDir = path.dirname(OUTPUT_MD);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(OUTPUT_MD, markdown, 'utf8');
  console.log('Report written to', OUTPUT_MD);
}

main();
