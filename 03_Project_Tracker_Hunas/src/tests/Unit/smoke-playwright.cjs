const { chromium } = require('playwright');

/**
 * PROJECT TRACKER - INTEGRITY SMOKE TEST
 * Targets: Section 5 (MUI Frontend) & Section 6 (Data Hierarchy)
 */
(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage();
  const baseUrl = process.env.BASE_URL || 'http://localhost:8000';

  // State tracking for rubric verification
  let rubricChecks = {
    loginForm: false,
    projectCards: false,
    taskStatusToggle: false
  };

  try {
    console.log('--- STARTING PROJECT TRACKER SMOKE TEST ---');

    // 1. AUTHENTICATION FLOW (Section 4: Authorization)
    await page.goto(`${baseUrl}/login`);
    await page.waitForSelector('input[name="email"]');
    
    // Fill MUI TextField components
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password');
    
    console.log('Submitting credentials...');
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      page.click('button[type="submit"]')
    ]);

    // 2. PROJECT LIST VIEW (Section 5: Card Components)
    console.log('Verifying Project Workspace...');
    await page.goto(`${baseUrl}/projects`); // Standard Laravel resource route
    
    // Check for MUI Cards which should be seeded (Section 2)
    const projectCardCount = await page.locator('.MuiCard-root').count();
    if (projectCardCount > 0) {
      console.log(`Success: Found ${projectCardCount} Project Cards.`);
      rubricChecks.projectCards = true;
    } else {
      throw new Error('No Project Cards found. Did you run the ProjectSeeder?');
    }

    // 3. TASK HIERARCHY & STATUS (Section 6: Functionality)
    console.log('Navigating to Task Management...');
    await page.goto(`${baseUrl}/tasks`);
    
    // Look for the MUI Select or Toggle Button mentioned in Section 5
    const toggleButton = page.locator('button:has-text("Toggle"), button:has-text("Status")').first();
    if (await toggleButton.isVisible()) {
      console.log('Success: Task Status Toggle component is visible.');
      rubricChecks.taskStatusToggle = true;
    }

    // 4. CAPTURE FINAL STATE
    const appTitle = await page.title();
    console.log(`Workspace Title: ${appTitle}`);
    
    await page.screenshot({ path: 'tracker-final-audit.png', fullPage: true });
    
    console.log('--- SMOKE TEST: OK ---');
    await browser.close();
    process.exit(0);

  } catch (err) {
    console.error('--- SMOKE TEST FAILED ---');
    console.error(`Reason: ${err.message}`);
    await page.screenshot({ path: 'error-audit.png' });
    await browser.close();
    process.exit(1);
  }
})();