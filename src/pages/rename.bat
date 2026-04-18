@echo off
cd /d "%~dp0"

ren "Homepage.js"          "_HomePage.js"
ren "_HomePage.js"         "HomePage.js"

ren "Browsepage.js"        "_BrowsePage.js"
ren "_BrowsePage.js"       "BrowsePage.js"

ren "Projectdetailpage.js" "_ProjectDetailPage.js"
ren "_ProjectDetailPage.js" "ProjectDetailPage.js"

ren "Checkoutpage.js"      "_CheckoutPage.js"
ren "_CheckoutPage.js"     "CheckoutPage.js"

ren "Downloadpage.js"      "_DownloadPage.js"
ren "_DownloadPage.js"     "DownloadPage.js"

ren "Sellerdashboard.js"   "_SellerDashboard.js"
ren "_SellerDashboard.js"  "SellerDashboard.js"

ren "Userdashboard.js"     "_UserDashboard.js"
ren "_UserDashboard.js"    "UserDashboard.js"

ren "Adminpanel.js"        "_AdminPanel.js"
ren "_AdminPanel.js"       "AdminPanel.js"

ren "Aboutpage.js"         "_AboutPage.js"
ren "_AboutPage.js"        "AboutPage.js"

ren "Contactpage.js"       "_ContactPage.js"
ren "_ContactPage.js"      "ContactPage.js"

ren "Legalpage.js"         "_LegalPage.js"
ren "_LegalPage.js"        "LegalPage.js"

echo All files renamed successfully!
pause