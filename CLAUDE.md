# Git নিয়ম

- commit শুধু `msisaif <61042251+msisaif@users.noreply.github.com>` নাম ও ইমেইলে হবে।
- commit মেসেজে কোনো attribution লাইন থাকবে না। যেমন `Co-Authored-By`, `Claude-Session`, "Generated with Claude" ইত্যাদি।
- মালিক না বললে `git push` করা যাবে না।

# Stack

- The site is built with Alo (`@msilabs/alo`). Read `AGENTS.md` before editing any `.alo` file.
- CSS is in `global/style.css` and the app JS is in `global/app.js`. Alo only renders the page shell; everything else is plain browser JS.
- highlight.js is loaded from cdnjs in `pages/page.alo`, before `app.js`. Keep that order.
- `node alo build` must finish without errors. Never edit `dist/` or `.alo/`.
