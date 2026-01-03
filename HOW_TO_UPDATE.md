# How to Update Your Portfolio

## 1. Updating Your Resume
Your resume file is located at:
`scratch/portfolio/public/resume.pdf`

To update it:
1. **Rename** your actual resume PDF to `resume.pdf`.
2. **Copy and Paste** it into the `public` folder, overwriting the existing file.
3. The link on your website will automatically serve the new file.

## 2. Changing Images
- Profile Picture: Look for the `.avatar` class in `style.css` (line ~135) and change the `background-image` URL.
- Map Background: Look for `.map-bg` in `style.css`.

## 3. Deploying
When you are ready to share your site, you can deploy the `dist` folder (created by running `npm run build`) to services like Netlify, Vercel, or GitHub Pages.
