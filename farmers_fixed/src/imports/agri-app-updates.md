Update the existing AgriConnect Philippines web app with the following changes:
1. Branding & Logo

Replace all instances of "FarmConnect" and "AgriConnect Philippines" with "Philagri"
Remove the green Sprout icon used as the logo and replace it with an uploaded image logo (philagri-logo.jpg)
Update the tagline everywhere to: "Smart Farming. Digital Future."
The logo image should appear in the navbar header (50x50px), the hero section of the RoleSelection page (120x120px), and the footer (30x30px)

2. Color Palette — Eye-Friendly
Replace all existing colors with this soft, easy-on-the-eyes palette:

Background: #f4f7f4 (soft sage-white)
Card background: #ffffff
Muted background: #edf2ed
Primary green (buttons, headings): #2d6a4f
Medium green (hover): #3d8b65
Soft green (borders, icons): #74b996
Pale green (chips, icon backgrounds): #c8e6d5
Amber deep (marketplace): #8a6320
Amber mid (hover): #b07d2a
Amber pale (marketplace backgrounds): #f0e0b0
Primary text: #1e3a2f
Secondary text: #4a6558
Muted text: #7a9488
Border color: #d4e4d8

3. Dark Mode Toggle

Add a dark mode toggle button in the top-right of the header navbar, placed after the notification/message/profile icon buttons, separated by a vertical divider
The toggle should show a 🌙 icon and "Dark" label in light mode, and ☀️ icon and "Light" label in dark mode
Use a sliding pill/knob style toggle track (44x24px)
Dark mode color palette:

Background: #141a16
Card: #1e2822
Muted: #242e27
Primary green: #5aad82
Pale green: #1e3528
Amber deep: #c9973a
Amber pale: #2e2010
Primary text: #dff0e8
Secondary text: #a3c4b0
Muted text: #6b8f7c
Border: #2e4035


All color transitions should animate smoothly with transition: 0.3s ease
Save the user's preference to localStorage under the key philagri-theme
Apply the saved preference on page load

4. Footer

Update footer copyright text to: © 2026 Philagri · Smart Farming. Digital Future.
Show the Philagri logo image (30x30px) next to the footer text