# msilabs poster maker

কোড পেস্ট করলে বাংলা শিরোনাম ও ব্যাখ্যাসহ Facebook ও LinkedIn-এর মাপে পোস্টার তৈরি হয়।

- মাপ: বর্গ ১:১, পোর্ট্রেট ৪:৫, চওড়া ১.৯:১
- থিম, বাংলা ফন্ট, কোডের ফন্ট ও রং বদলানো যায়
- PNG সেভ বা ছবি কপি করা যায়
- সব কাজ ব্রাউজারে হয়, কোনো সার্ভার লাগে না

সাইট বানানো হয় [আলো (Alo)](https://github.com/msilabs/alo) দিয়ে। Node.js ২২ বা নতুন ভার্সন লাগবে।

## চালানো

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # dist/ ফোল্ডারে সাইট
```

GitHub Pages-এর মতো সাব-পাথের জন্য: `node alo build --base /msilabs-poster-maker/`

## ফাইল কোথায়

```
pages/page.alo     পেজের HTML
global/style.css   সব CSS
global/app.js      পোস্টার বানানোর JS
```
